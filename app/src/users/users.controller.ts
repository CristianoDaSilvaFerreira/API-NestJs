import { UserEntity } from './database/user.entity';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { Body, Controller, Get, OnModuleInit, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

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

    // Rota de listar todos usuários
    @Get()
    index(): Observable<UserEntity[]> {
        return this.client.send('find-all-user', {});
    }

    // Rota de adiconar usuários
    @Post()
    @ApiBody({ type: UserDto })
    create(@Body() user: UserDto): Observable<UserEntity> {
        return this.client.send('create-user', user);
    }
}
