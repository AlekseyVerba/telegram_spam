import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { RedisServiceOptions } from 'src/redis.options';
import { UserModule } from '../user/user.module';
import { UserTelgramController } from './user-telegram.controller';
import { UserTelegramService } from './user-telegram.service';

@Module({
  controllers: [UserTelgramController],
  providers: [UserTelegramService],
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'CONTROLLER_SERVICE',
        useFactory: () => new RedisServiceOptions(),
      },
    ]),
    UserModule,
  ],
})
export class UserTelegramModule {}
