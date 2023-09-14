import { Module } from '@nestjs/common';
import { AuthAppController } from './auth-app.controller';
import { AuthAppService } from './auth-app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { UserToken } from 'src/models/user_token.model'
import { ClientsModule } from '@nestjs/microservices';
import { RedisServiceOptions } from 'src/redis.options';

@Module({
  imports: [
    SequelizeModule.forFeature([User, UserToken]),
    ClientsModule.registerAsync([
      {
        name: 'DATABASE_SERVICE',
        useFactory: () => new RedisServiceOptions(),
      },
    ]),
  ],
  controllers: [AuthAppController],
  providers: [AuthAppService],
})
export class AuthAppModule {}
