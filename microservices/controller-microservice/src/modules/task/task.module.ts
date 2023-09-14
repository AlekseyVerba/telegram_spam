import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { ClientsModule } from '@nestjs/microservices';
import { RedisServiceOptions } from 'src/redis.options';
import { FileModule } from '../file/file.module'
import { UserModule } from '../user/user.module'
import { IsTaskExistConstraint } from '../../validators/is-task-exist.validator'

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'CONTROLLER_SERVICE',
        useFactory: () => new RedisServiceOptions(),
      },
    ]),
    FileModule,
    UserModule
  ],
  controllers: [TaskController],
  providers: [TaskService, IsTaskExistConstraint],
})
export class TaskModule {}
