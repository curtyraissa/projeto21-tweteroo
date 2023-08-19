import { Controller, Get, Post, Body,  HttpException, HttpStatus, HttpCode, Query, Param  } from '@nestjs/common';
import { AppService } from './app.service';
import { SignupDTO } from './dto/signup.dto';
import { TweetDTO } from './dto/tweet.dto';
import { Tweet } from './entities/tweet.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //endpoint para verificar a saúde do aplicativo
  @Get()
  getHealth(): string {
    return this.appService.getHealth();
  }

  //endpoint para cadastro de usuário
  @Post('/sign-up')
  @HttpCode(200)
  signUp(@Body() signupDto: SignupDTO) {
    try {
      //chama o service para cadastrar o usuário
      this.appService.signUp(signupDto.username, signupDto.avatar);
      return { message: 'OK' };
    } catch (error) {
      //erros durante o cadastro, retorna um erro HTTP
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  //endpoint para criar um novo tweet
  @Post('/tweets')
  @HttpCode(HttpStatus.CREATED) // Status code de resposta 201
  createTweet(@Body() tweetDto: TweetDTO) {
    try {
      //chama o service para criar um novo tweet
      this.appService.createTweet(tweetDto.username, tweetDto.tweet);
      return { message: 'OK' };
    } catch (error) {
      //verifica se o erro é de autenticação (usuário não existe)
      if (error.message === 'UNAUTHORIZED') {
        throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
      }
      //outros erros durante a criação do tweet e retorna um erro HTTP
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  //endpoint para obter tweets com paginação
  @Get('/tweets')
  getTweets(@Query('page') page?: number): Tweet[] {
    //validação da página
    if (page && (isNaN(page) || page < 1)) {
      throw new HttpException('Informe uma página válida!', HttpStatus.BAD_REQUEST);
    }

    const tweetsPerPage = 15;
    const startIndex = page ? (page - 1) * tweetsPerPage : 0;
    const endIndex = page ? startIndex + tweetsPerPage : undefined;
   //chama o service para obter os tweets com base na página
    return this.appService.getTweets(startIndex, endIndex);
  }

   //endpoint para obter tweets de um usuário específico
  @Get('/tweets/:username')
  getUserTweets(@Param('username') username: string): Tweet[] {
    //chama o service para obter os tweets de um usuário específico
    const tweets = this.appService.getUserTweets(username);
        //verifica se o usuário não possui tweets e retorna um erro 404 se necessário
    if (!tweets) {
      throw new HttpException('User not found or has no tweets.', HttpStatus.NOT_FOUND);
    }
    return tweets;
  }
}
