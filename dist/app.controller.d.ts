import { AppService } from './app.service';
import { SignupDTO } from './dto/signup.dto';
import { TweetDTO } from './dto/tweet.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHealth(): string;
    signUp(signupDto: SignupDTO): {
        message: string;
    };
    createTweet(tweetDto: TweetDTO): {
        message: string;
    };
}
