import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [ScheduleModule.forRoot(), UserModule, DbModule],
})
export class AppModule {}
