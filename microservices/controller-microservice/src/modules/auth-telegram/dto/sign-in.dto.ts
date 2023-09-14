import { IsEmpty, IsString } from "class-validator";

export class SignInDTO {
  @IsString()
  phone_number: string;

  @IsString()
  phone_code_hash: string;

  @IsString()
  phone_code: string;

  @IsEmpty()
  uid: string
}
