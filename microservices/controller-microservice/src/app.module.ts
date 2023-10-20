import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthAppModule } from './modules/auth-app/auth-app.module';
import { AuthTelegramModule } from './modules/auth-telegram/auth-telegram.module';
import { ClientsModule } from '@nestjs/microservices';
import { RedisServiceOptions } from './redis.options';
import { UserModule } from './modules/user/user.module';
import { GetUser } from './middlewares/get-token.middleware';
import { UserTelegramModule } from './modules/user-telegram/user-telegram.module';
import { MessageTelegramModule } from './modules/message-telegram/message-telegram.module';
import { FileModule } from './modules/file/file.module';
import { TaskModule } from './modules/task/task.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './exceptions/exceptionsLogger.filter';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'CONTROLLER_SERVICE',
        useFactory: () => new RedisServiceOptions(),
      },
    ]),
    AuthAppModule,
    AuthTelegramModule,
    UserModule,
    UserTelegramModule,
    MessageTelegramModule,
    FileModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetUser).forRoutes('*');
  }
}
