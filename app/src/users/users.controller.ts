import { UsersService } from './users.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './interface/user.interface';

@Controller('users')
export class UsersController {

    // Constructor
    constructor(private readonly userService: UsersService) {}

    // Rota de listar todos usuários
    @Get()
    index(): User[] {
        return this.userService.findAll();
    }

    // Rota de adiconar usuários
    @Post()
    create(@Body() user: User): User {
        return this.userService.create(user);
    }
}
