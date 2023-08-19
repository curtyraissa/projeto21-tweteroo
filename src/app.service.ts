import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {
  private readonly users: User[] = [];

  getHealth(): string {
    return "I'm okay!";
  }

  signUp(username: string, avatar: string) {
    if (!username || typeof username !== 'string' || !avatar || typeof avatar !== 'string') {
      throw new Error('Todos os campos são obrigatórios!');
    }
    this.users.push(new User(username, avatar));
  }

  authenticate(username: string, avatar: string): boolean {
    const user = this.users.find((u) => u.username === username && u.avatar === avatar);
    return !!user;
  }
}
