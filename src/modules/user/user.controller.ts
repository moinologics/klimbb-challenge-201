import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { GameSessionDTO, RedemptionDTO } from '../../dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users/:id/balance')
  getBalance(@Param('id') id: number) {
    return this.userService.getBalance(id);
  }

  @Get('/users/:id/redemptions')
  getAllUserRedumptions(@Param('id') id: number) {
    return this.userService.getAllUserRedumptions(id);
  }

  @Post('/game-sessions')
  createGameSession(@Body() body: GameSessionDTO) {
    return this.userService.createGameSession(body);
  }

  @Post('/redemptions')
  createRedemption(@Body() body: RedemptionDTO) {
    return this.userService.createRedemption(body);
  }
}
