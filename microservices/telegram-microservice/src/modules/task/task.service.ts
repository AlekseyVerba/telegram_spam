import { Injectable } from '@nestjs/common';
import { MessageService } from '../message/message.service';
import { ITask } from '../../../../../interfaces/microservices/database-microservice/models/task.interface';

@Injectable()
export class TaskService {
  constructor(private readonly messageService: MessageService) {}

  async doTask({ chats, file, message, user_uid }: ITask) {
    for (let chatIdx = 0; chats.length > chatIdx; chatIdx++) {
      if (chatIdx !== 0) {
        await this.delay(300000);
      }

      this.messageService.sendMessage({
        uid: user_uid,
        username: chats[chatIdx],
        message,
        file
      });
    }
  }

  delay(ms: number) {
    return new Promise((res) => setTimeout(() => res(true), ms));
  }
}
