import { IsEmpty, IsString } from "class-validator";

export class SendMessageDTO {
    @IsString()
    message: string

    @IsString()
    username: string

    @IsEmpty()
    uid: string
}