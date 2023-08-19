import { Controller, Get, Post, Body,  HttpException, HttpStatus, HttpCode, Query, Param  } from '@nestjs/common';
import { AppService } from './app.service';
import { SignupDTO } from './dto/signup.dto';
import { TweetDTO } from './dto/tweet.dto';
import { Tweet } from './entities/tweet.entity';

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

  @Get('/tweets')
  getTweets(@Query('page') page?: number): Tweet[] {
    if (page && (isNaN(page) || page < 1)) {
      throw new HttpException('Informe uma página válida!', HttpStatus.BAD_REQUEST);
    }

    const tweetsPerPage = 15;
    const startIndex = page ? (page - 1) * tweetsPerPage : 0;
    const endIndex = page ? startIndex + tweetsPerPage : undefined;

    return this.appService.getTweets(startIndex, endIndex);
  }

  @Get('/tweets/:username')
  getUserTweets(@Param('username') username: string): Tweet[] {
    const tweets = this.appService.getUserTweets(username);
    if (!tweets) {
      throw new HttpException('User not found or has no tweets.', HttpStatus.NOT_FOUND);
    }
    return tweets;
  }

}
