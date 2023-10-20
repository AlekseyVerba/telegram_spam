import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MessageModule } from './modules/message/message.module';
import { TaskModule } from './modules/task/task.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './exceptions/exceptionsLogger.filter';

@Module({
  imports: [AuthModule, UserModule, MessageModule, TaskModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
  ],
})
export class AppModule {}
