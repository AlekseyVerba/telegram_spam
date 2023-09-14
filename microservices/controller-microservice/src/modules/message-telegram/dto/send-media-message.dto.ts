import { IsEmpty } from 'class-validator';
import { SendMessageDTO } from './send-message.dto';

export class SendMediaMessageDTO extends SendMessageDTO {
  file: Express.Multer.File

  @IsEmpty()
  filePath: string
}
