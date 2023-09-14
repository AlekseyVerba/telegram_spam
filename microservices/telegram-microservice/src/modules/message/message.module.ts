import { Module } from '@nestjs/common';
import { MessageController } from './message.controller'
import { MessageService } from './message.service'
import { TelegramClientModule } from '../telegram-client/telegram-client.module'

@Module({
    imports: [TelegramClientModule],
    controllers: [MessageController],
    providers: [MessageService],
    exports: [MessageService]
})
export class MessageModule {}
