import { Module } from "@nestjs/common";
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { TelegramClientModule } from '../telegram-client/telegram-client.module'

@Module({
    imports: [TelegramClientModule],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}