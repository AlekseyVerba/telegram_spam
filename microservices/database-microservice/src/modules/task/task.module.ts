import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from '../../models/task.model';
import { ClientsModule } from '@nestjs/microservices';
import { RedisServiceOptions } from 'src/redis.options';

@Module({
  imports: [
    SequelizeModule.forFeature([Task]),
    ClientsModule.registerAsync([
      {
        name: 'DATABASE_SERVICE',
        useFactory: () => new RedisServiceOptions(),
      },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
