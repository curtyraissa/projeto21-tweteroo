import { AppService } from './app.service';
import { SignupDTO } from './dto/signup.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHealth(): string;
    signUp(signupDto: SignupDTO): {
        message: string;
    };
}
