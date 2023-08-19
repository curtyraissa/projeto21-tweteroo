import { Controller, Get, Post, Body,  HttpException, HttpStatus, HttpCode  } from '@nestjs/common';
import { AppService } from './app.service';
import { SignupDTO } from './dto/signup.dto';
import { TweetDTO } from './dto/tweet.dto';

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

  @Post('/tweets')
  @HttpCode(HttpStatus.CREATED)
  createTweet(@Body() tweetDto: TweetDTO) {
    try {
      this.appService.createTweet(tweetDto.username, tweetDto.tweet);
      return { message: 'OK' };
    } catch (error) {
      if (error.message === 'UNAUTHORIZED') {
        throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

}
