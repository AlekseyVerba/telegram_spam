import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module'
import { ClientsModule } from '@nestjs/microservices';
import { RedisServiceOptions } from './redis.options';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './exceptions/exceptionsLogger.filter';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'MAILER_SERVICE',
        useFactory: () => new RedisServiceOptions(),
      },
    ]),
    MailerModule.forRoot({
      transport: {
        host: process.env.HOST_MAILER,
        secure: false,
        auth: {
          user: process.env.USER_MAILER,
          pass: process.env.PASSWORD_MAILER,
        },
      },
      defaults: {
        from: `<${process.env.USER_MAILER}>`,
      },
    }),
    AuthModule
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
