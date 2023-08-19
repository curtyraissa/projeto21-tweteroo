import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class AppService {
  private readonly users: User[] = [];
  private readonly tweets: Tweet[] = [];

  //verificar a saúde do serviço
  getHealth(): string {
    return "I'm okay!";
  }

  //cadastrar um novo usuário
  signUp(username: string, avatar: string) {
    //validação dos campos de entrada
    if (!username || typeof username !== 'string' || !avatar || typeof avatar !== 'string') {
      throw new Error('All fields are required!');
    }
  //cria um novo usuário e adiciona à lista de usuários
    this.users.push(new User(username, avatar));
  }

  //autenticar um usuário
  authenticate(username: string, avatar: string): boolean {
    //busca o usuário na lista de usuários com base em username e avatar
    const user = this.users.find((u) => u.username === username && u.avatar === avatar);
    return !!user; //retorna true se o usuário foi encontrado, false caso contrário
  }

  //criar um novo tweet
  createTweet(username: string, tweet: string) {
    //validação dos campos de entrada
    if (!username || typeof username !== 'string' || !tweet || typeof tweet !== 'string') {
      throw new Error('All fields are required!');
    }
    //busca o usuário na lista de usuários
    const user = this.users.find((u) => u.username === username);
    if (!user) {
      throw new Error('UNAUTHORIZED');
    }
    //cria um novo tweet e adiciona à lista de tweets
    this.tweets.push(new Tweet(username, tweet));
  }

  //obter tweets com paginação
  getTweets(startIndex: number, endIndex?: number): Tweet[] {
    //validação do índice de início
    if (startIndex < 0) {
      throw new Error('Invalid start index.');
    }
    // Inverte a ordem para exibir os mais recentes primeiro
    let tweetsToShow = this.tweets.slice().reverse(); 
    //filtra os tweets com base nos índices de início e fim
    if (endIndex) {
      tweetsToShow = tweetsToShow.slice(startIndex, endIndex);
    } else {
      tweetsToShow = tweetsToShow.slice(0, 15);
    }

    //mapeia os tweets para adicionar informações de avatar
    const completeTweets = tweetsToShow.map((tweet) => {
      const user = this.users.find((u) => u.username === tweet.username);
      return { ...tweet, avatar: user?.avatar };
    });

    return completeTweets;
  }

  //obter tweets de um usuário específico
  getUserTweets(username: string): Tweet[] {
    //filtra os tweets com base no nome de usuário
    const userTweets = this.tweets.filter((tweet) => tweet.username === username);
    //se o usuário não tiver tweets, retorna um array vazio
    if (userTweets.length === 0) {
      return [];
    }
    //busca o usuário na lista de usuários
    const user = this.users.find((u) => u.username === username);
    //mapeia os tweets do usuário para adicionar informações de avatar
    const completeTweets = userTweets.map((tweet) => {
      return { ...tweet, avatar: user?.avatar };
    });
    return completeTweets;
  }
}
