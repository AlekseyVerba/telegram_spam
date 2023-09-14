import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module'
import { MessageModule } from './modules/message/message.module'
import { TaskModule } from './modules/task/task.module'

@Module({
  imports: [
    AuthModule,
    UserModule,
    MessageModule,
    TaskModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
