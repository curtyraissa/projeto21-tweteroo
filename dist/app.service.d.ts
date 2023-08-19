import { Tweet } from './entities/tweet.entity';
export declare class AppService {
    private readonly users;
    private readonly tweets;
    getHealth(): string;
    signUp(username: string, avatar: string): void;
    authenticate(username: string, avatar: string): boolean;
    createTweet(username: string, tweet: string): void;
    getTweets(startIndex: number, endIndex?: number): Tweet[];
}
