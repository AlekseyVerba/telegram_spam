import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserTelegramService } from './user-telegram.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserProperty } from 'src/decorators/user-property.decorator';

@Controller('telegram-user')
@UseGuards(AuthGuard)
export class UserTelgramController {
  constructor(private readonly userTelegramService: UserTelegramService) {}

  @Get('my-profile')
  async getMyProfile(@UserProperty('uid') uid: string) {
    return await this.userTelegramService.getMyProfile(uid);
  }
}
