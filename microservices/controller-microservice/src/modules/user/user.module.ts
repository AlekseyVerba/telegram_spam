import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { IsUserNotExistByEmailConstraint } from '../../validators/is-user-not-exist-by-email.validator';
import { IsUserExistByEmailConstraint } from '../../validators/is-user-exist-by-email.validator';
import { ClientsModule } from '@nestjs/microservices';
import { RedisServiceOptions } from 'src/redis.options';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'CONTROLLER_SERVICE',
        useFactory: () => new RedisServiceOptions(),
      },
    ]),
  ],
  providers: [
    UserService,
    IsUserNotExistByEmailConstraint,
    IsUserExistByEmailConstraint,
  ],
  exports: [UserService]
})
export class UserModule {}
