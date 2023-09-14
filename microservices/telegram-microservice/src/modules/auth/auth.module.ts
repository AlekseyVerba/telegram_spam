import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TelegramClientModule } from '../telegram-client/telegram-client.module'

@Module({
imports: [TelegramClientModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
