import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { SequelizeModule } from '@nestjs/sequelize';
import { RedisServiceOptions } from './redis.options';
import { AuthAppModule } from './modules/auth-app/auth-app.modules';
import { User } from './models/user.model';
import { UserToken } from './models/user_token.model';
import { UserModule } from './modules/user/user.module';
import { Task } from './models/task.model'
import { TaskModule } from './modules/task/task.module'
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './exceptions/exceptionsLogger.filter';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, UserToken, Task],
      autoLoadModels: true,
      synchronize: true,
      sync: {
        alter: true,
      },
    }),
    ClientsModule.registerAsync([
      {
        name: 'DATABASE_SERVICE',
        useFactory: () => new RedisServiceOptions(),
      },
    ]),
    AuthAppModule,
    UserModule,
    TaskModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
  ],
})
export class AppModule {}
