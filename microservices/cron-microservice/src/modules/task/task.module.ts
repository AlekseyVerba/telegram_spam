import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { ClientsModule } from '@nestjs/microservices';
import { RedisServiceOptions } from 'src/redis.options';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'CRON_SERVICE',
        useFactory: () => new RedisServiceOptions(),
      },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
