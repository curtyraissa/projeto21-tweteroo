export declare class AppService {
    private readonly users;
    getHealth(): string;
    signUp(username: string, avatar: string): void;
    authenticate(username: string, avatar: string): boolean;
}
