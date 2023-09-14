import { Injectable } from '@nestjs/common';
import { TelegramClientService } from '../telegram-client/telegram-client.service';
import { ISendMessageTelegram } from '../../../../../interfaces/microservices/telegram-microservice/modules/message.interface';
import { join, resolve } from 'path';

@Injectable()
export class MessageService {
  PATH_FILE_STATIC = join(resolve(), 'upload');

  constructor(private readonly telegramClientService: TelegramClientService) {}

  async sendMessage({ uid, username, message, file }: ISendMessageTelegram) {
    const client = await this.telegramClientService.getClient(uid);

    return await client.sendMessage(username, {
      message,
      parseMode: 'html',
      file: file ? join(this.PATH_FILE_STATIC, file) : undefined,
    });
  }
}
