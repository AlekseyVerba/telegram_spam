import { Module } from '@nestjs/common';
import { MessageTelegramController } from './message-telegram.controller';
import { MessageTelegramService } from './message-telegram.service';
import { ClientsModule } from '@nestjs/microservices';
import { RedisServiceOptions } from 'src/redis.options';
import { UserModule } from '../user/user.module';
import { FileModule } from '../file/file.module'

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'CONTROLLER_SERVICE',
        useFactory: () => new RedisServiceOptions(),
      },
    ]),
    UserModule,
    FileModule
  ],
  controllers: [MessageTelegramController],
  providers: [MessageTelegramService],
})
export class MessageTelegramModule {}
