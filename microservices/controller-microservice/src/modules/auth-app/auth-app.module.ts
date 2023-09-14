import { Module } from '@nestjs/common';
import { AuthAppService } from './auth-app.service';
import { AuthAppController } from './auth-app.controller';
import { ClientsModule } from '@nestjs/microservices';
import { RedisServiceOptions } from 'src/redis.options';
import { UserModule } from '../user/user.module'

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
  controllers: [AuthAppController],
  providers: [AuthAppService],
})
export class AuthAppModule {}
