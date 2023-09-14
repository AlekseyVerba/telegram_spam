import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthAppService } from './auth-app.service';
import { RegistrationDTO } from './dto/registration.dto';
import { ConfirmRegistrationTokenDTO } from './dto/confirm-registration-token.dto';
import {
  IRegistrationResponse,
  IConfirmRegistrationTokenResponse,
  ILoginResponse
} from '../../../../../interfaces/microservices/database-microservice/modules/auth-app.interface';
import { LoginDTO } from './dto/login.dto'
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth-app')
export class AuthAppController {
  constructor(private readonly authAppService: AuthAppService) {}

  @Post('registration')
  async registration(
    @Body() dto: RegistrationDTO,
  ): Promise<IRegistrationResponse> {
    return await this.authAppService.registration(dto);
  }

  @Post('confirm/registration-token')
  async confirmRegistrationToken(
    @Body() dto: ConfirmRegistrationTokenDTO,
  ): Promise<IConfirmRegistrationTokenResponse> {
    return await this.authAppService.confirmRegistrationToken(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDTO): Promise<ILoginResponse> {
    return await this.authAppService.login(dto);
  }

  @Get('test')
  @UseGuards(AuthGuard)
  async test() {

  }

  // @Get('check')
  // @UseGuards(AuthGuard)
  // async check() {
  //   const userWithToken = await this.authAppService.check(userID);
  // }
}
