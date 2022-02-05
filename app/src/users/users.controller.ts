import { UserEntity } from './database/user.entity';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { Body, Controller, Get, OnModuleInit, Post } from '@nestjs/common';
import { User } from './interface/user.interface';
import { ApiBody } from '@nestjs/swagger';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Controller('users')
export class UsersController implements OnModuleInit {

    // Configurando o Client de conexão com o Kafka
    @Client({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'user',
                brokers: ['localhost:9092'],
            },
            consumer: {
                groupId: 'user-consumer',
                allowAutoTopicCreation: true
            }
        }
    })

    private client: ClientKafka;

    async onModuleInit() {
        const requestPatters = [
            'find-all-user',
            'create-user'
        ];

        requestPatters.forEach(async pattern => {
            this.client.subscribeToResponseOf(pattern);
            await this.client.connect();
        })
    }

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
