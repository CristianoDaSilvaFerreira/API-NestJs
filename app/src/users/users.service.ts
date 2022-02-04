import { User } from './interface/user.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    // Arrya para ser populado
    private users: User[] = [];

    // Função do create()
    create(user: User): User {
        this.users.push(user);
        return user;
    }
}
