import { Module } from '@nestjs/common';
import { TaskModule } from './modules/task/task.module'
import { ClientsModule } from '@nestjs/microservices';
import { RedisServiceOptions } from './redis.options';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './exceptions/exceptionsLogger.filter';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'CRON_SERVICE',
        useFactory: () => new RedisServiceOptions(),
      },
    ]),
    TaskModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
  ],
})
export class AppModule {}
