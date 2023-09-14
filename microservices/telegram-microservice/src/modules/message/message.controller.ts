import { Controller } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessagePattern } from '@nestjs/microservices';
import { ISendMessageTelegram } from '../../../../../interfaces/microservices/telegram-microservice/modules/message.interface';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @MessagePattern({ cmd: 'telegram-message.send-message' })
  async sendMessage(dto: ISendMessageTelegram) {
    return await this.messageService.sendMessage(dto);
  }
}
