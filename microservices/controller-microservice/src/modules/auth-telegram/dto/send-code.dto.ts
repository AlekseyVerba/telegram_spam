import { IsEmpty, IsString } from 'class-validator';

export class SendCodeDTO {
  @IsString()
  phone_number: string;

  @IsEmpty()
  uid: string
}
