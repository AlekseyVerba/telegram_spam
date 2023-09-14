import { Module } from '@nestjs/common';
import { TaskModule } from './modules/task/task.module'
import { ClientsModule } from '@nestjs/microservices';
import { RedisServiceOptions } from './redis.options';
import { ScheduleModule } from '@nestjs/schedule';

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
  providers: [],
})
export class AppModule {}
