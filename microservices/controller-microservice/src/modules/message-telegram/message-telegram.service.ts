import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { SendMessageDTO } from './dto/send-message.dto';
import { ISendMessageTelegram } from '../../../../../interfaces/microservices/telegram-microservice/modules/message.interface';
import { SendMediaMessageDTO } from './dto/send-media-message.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class MessageTelegramService {
  constructor(
    @Inject('CONTROLLER_SERVICE') private microservice: ClientProxy,
    private readonly fileService: FileService,
  ) {}

  async sendMessage(dto: SendMessageDTO) {
    return await lastValueFrom(
      this.microservice.send<any, ISendMessageTelegram>(
        { cmd: 'telegram-message.send-message' },
        dto,
      ),
    );
  }

  async sendMediaMessage(dto: SendMediaMessageDTO) {
    dto.filePath = this.fileService.createFile(dto.file).fullPath;

    return await lastValueFrom(
      this.microservice.send<any, ISendMessageTelegram>(
        { cmd: 'telegram-message.send-media-message' },
        { ...dto, file: dto.filePath },
      ),
    );
  }
}
