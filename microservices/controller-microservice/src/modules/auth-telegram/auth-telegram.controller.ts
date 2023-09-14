import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthTelegramService } from './auth-telegram.service';
import { SendCodeDTO } from './dto/send-code.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { UserProperty } from '../../decorators/user-property.decorator';

@Controller('auth-telegram')
@UseGuards(AuthGuard)
export class AuthTelegramController {
  constructor(private readonly authTelgramService: AuthTelegramService) {}

  @Post('send-code')
  async sendCode(@Body() dto: SendCodeDTO, @UserProperty('uid') uid: string) {
    dto.uid = uid;

    return await this.authTelgramService.sendCode(dto);
  }

  @Post('sign-in')
  async signIn(@Body() dto: SignInDTO, @UserProperty('uid') uid: string) {
    dto.uid = uid

    return await this.authTelgramService.signIn(dto);
  }

  // @Get('user')
  // async getMyUser() {
  //   return await this.authTelgramService.getMyUser();
  // }
}
