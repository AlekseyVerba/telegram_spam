import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MessageTelegramService } from './message-telegram.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { SendMessageDTO } from './dto/send-message.dto';
import { SendMediaMessageDTO } from './dto/send-media-message.dto';
import { UserProperty } from 'src/decorators/user-property.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from '../file/file.filter';

@Controller('message-telegram')
@UseGuards(AuthGuard)
export class MessageTelegramController {
  constructor(
    private readonly messageTelegramService: MessageTelegramService,
  ) {}

  @Post('send/message')
  async sendMessage(
    @Body() dto: SendMessageDTO,
    @UserProperty('uid') uid: string,
  ) {
    dto.uid = uid;

    return await this.messageTelegramService.sendMessage(dto);
  }

  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter(/\/(jpg|jpeg|png)$/),
    }),
  )
  @Post('send/meadia-message')
  async sendMediaMessage(
    @Body() dto: SendMediaMessageDTO,
    @UserProperty('uid') uid: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    dto.uid = uid;
    dto.file = file;

    return await this.messageTelegramService.sendMediaMessage(dto);
  }
}
