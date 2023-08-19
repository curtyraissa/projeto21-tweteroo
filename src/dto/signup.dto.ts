import { IsString, IsNotEmpty } from 'class-validator';

export class SignupDTO {
  @IsString()
  @IsNotEmpty({ message: "All fields are required!" })
  username: string;

  @IsString()
  @IsNotEmpty({ message: "All fields are required!" })
  avatar: string;
}