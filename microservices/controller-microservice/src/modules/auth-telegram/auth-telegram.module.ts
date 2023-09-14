import { Module } from '@nestjs/common';
import { AuthTelegramController } from './auth-telegram.controller';
import { AuthTelegramService } from './auth-telegram.service';
import { UserModule } from '../user/user.module'
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
    UserModule
  ],
  controllers: [AuthTelegramController],
  providers: [AuthTelegramService],
})
export class AuthTelegramModule {}
