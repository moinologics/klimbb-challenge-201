import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { GameSession, Redemption, User } from '../../entities';
import { GameSessionDTO, RedemptionDTO } from '../../dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(GameSession)
    private gameSessionRepository: Repository<GameSession>,
    @InjectRepository(Redemption)
    private redemptionRepository: Repository<Redemption>,
  ) {}

  getBalance(id: number) {
    return this.userRepository.findOne({ select: ['balance'], where: { id } });
  }

  async createGameSession(gameSessionBody: GameSessionDTO) {
    const userBalance = await this.getBalance(gameSessionBody.userId);

    const newBalance = userBalance.balance - gameSessionBody.amountPlayed;

    if (newBalance < 0) {
      throw new HttpException('you do not have enough balance', 400);
    }

    await this.userRepository.update(
      { id: gameSessionBody.userId },
      { balance: newBalance },
    );

    await this.gameSessionRepository.insert(gameSessionBody);

    return {
      message: 'Game session recorded successfully.',
      newBalance: newBalance,
    };
  }

  async createRedemption(redemptionBody: RedemptionDTO) {
    await this.redemptionRepository.insert({
      ...redemptionBody,
      status: 'requested',
    });
    return { message: 'Redemption requested.' };
  }

  getAllUserRedumptions(userId: number) {
    return this.redemptionRepository.find({ where: { userId } });
  }

  @Cron('45 * * * * *')
  async processAllRedemptions() {
    const allRedemptionsRequests = await this.redemptionRepository.find({
      where: { status: 'requested' },
    });

    for (const req of allRedemptionsRequests) {
      const userBalance = await this.getBalance(req.userId);

      const newBalance = userBalance.balance - req.amount;

      await this.userRepository.update(
        { id: req.userId },
        { balance: newBalance },
      );

      await this.redemptionRepository.update(
        { id: req.id },
        { status: 'processed' },
      );
    }
  }
}
