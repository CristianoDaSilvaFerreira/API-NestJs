import { UserEntity } from './database/user.entity';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './interface/user.interface';
import { ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UsersController {

    // Constructor
    constructor(private readonly userService: UsersService) {}

    // Rota de listar todos usuários
    @Get()
    async index(): Promise<UserEntity[]> {
        return await this.userService.findAll();
    }

    // Rota de adiconar usuários
    @Post()
    @ApiBody({ type: UserDto })
    async create(@Body() user: UserDto): Promise<UserEntity> {
        return await this.userService.create(user);
    }
}
