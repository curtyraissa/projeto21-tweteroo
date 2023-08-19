import { IsString } from 'class-validator';

export class SignupDTO {
  @IsString()
  username: string;

  @IsString()
  avatar: string;
}