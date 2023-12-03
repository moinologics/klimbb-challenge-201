import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameSession, Redemption, User } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, GameSession, Redemption])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
