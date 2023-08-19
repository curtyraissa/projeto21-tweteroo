"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const signup_dto_1 = require("./dto/signup.dto");
const tweet_dto_1 = require("./dto/tweet.dto");
let AppController = exports.AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHealth() {
        return this.appService.getHealth();
    }
    signUp(signupDto) {
        try {
            this.appService.signUp(signupDto.username, signupDto.avatar);
            return { message: 'OK' };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    createTweet(tweetDto) {
        try {
            this.appService.createTweet(tweetDto.username, tweetDto.tweet);
            return { message: 'OK' };
        }
        catch (error) {
            if (error.message === 'UNAUTHORIZED') {
                throw new common_1.HttpException('UNAUTHORIZED', common_1.HttpStatus.UNAUTHORIZED);
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHealth", null);
__decorate([
    (0, common_1.Post)('/sign-up'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupDTO]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('/tweets'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tweet_dto_1.TweetDTO]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createTweet", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map