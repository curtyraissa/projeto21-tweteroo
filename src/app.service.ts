import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class AppService {
  private readonly users: User[] = [];
  private readonly tweets: Tweet[] = [];

  getHealth(): string {
    return "I'm okay!";
  }

  signUp(username: string, avatar: string) {
    if (!username || typeof username !== 'string' || !avatar || typeof avatar !== 'string') {
      throw new Error('All fields are required!');
    }
    this.users.push(new User(username, avatar));
  }

  authenticate(username: string, avatar: string): boolean {
    const user = this.users.find((u) => u.username === username && u.avatar === avatar);
    return !!user;
  }

  createTweet(username: string, tweet: string) {
    if (!username || typeof username !== 'string' || !tweet || typeof tweet !== 'string') {
      throw new Error('All fields are required!');
    }
    const user = this.users.find((u) => u.username === username);
    if (!user) {
      throw new Error('UNAUTHORIZED');
    }
    this.tweets.push(new Tweet(username, tweet));
  }

  // getTweets(): { username: string; tweet: string }[] {
  //   return this.tweets;
  // }
}
