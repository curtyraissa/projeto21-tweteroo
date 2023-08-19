import { Controller, Get, Post, Body,  HttpException, HttpStatus, HttpCode  } from '@nestjs/common';
import { AppService } from './app.service';
import { SignupDTO } from './dto/signup.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post('/sign-up')
  @HttpCode(200)
  signUp(@Body() signupDto: SignupDTO) {
    try {
      this.appService.signUp(signupDto.username, signupDto.avatar);
      return { message: 'OK' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
