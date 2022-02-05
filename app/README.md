# App NestJs

## Criando o projeto
* Para criação do projeto, será necessário seguir os seguintes passos:
> criando o projeto 
```js
nest new project
```

> Adicionando o `module users`
```js
nest g module users
```

> Adicionando o `controller user`
```js
nest g controller users
```

> Adicionando o `service users`
```js
nest g service users
```

## Criando rodas
> create

Para a criação das rotas, dentro do `users.controller` usa o decorention `@Post()` para ter acesso ao método de criação. Criando uma interface dos dados

### Openapi
> Instalação do swagger e swagger-ui-express

Serve para o usuário estar testando a aplicação sem uso de outra ferramenta com o Insomnia

```js
npm install --save @nestjs/swagger swagger-ui-express
```

ou
```js
yarn add npm @nestjs/swagger swagger-ui-express
```

> Configuração
Dentro do `main.ts` configura e fazer as importações necessárias
```js
const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
```

## Banco de Dados SQLite
> Instalando 

Para fazer uso do banco de dados é simples, basta usar o comando abaixo, nesse caso será usado o SQLite
```js
npm install --save @nestjs/typeorm typeorm sqlite3
```

Ou simplesmente
```js
yarn add npm @nestjs/typeorm typeorm sqlite3
```

> Configurando

Para ter acesso as configurações do banco de dados
```js
@Module({
  imports: [UsersModule],
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
```

- `src > users > database > user.entity.ts`

```js
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;
}
```

## Banco de dados PostgreSQL + Docker
> Criando a imagem no Docker

```js
docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

> Instalando a biblioteca do Postgres

```js 
yarn add pg
```

> Criando o modulo do banco de dados

```bash
nest g module database
```

> Configurando

- src > database > database.module.ts

```js
@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        username: 'postgres',
        password: 'docker',
        database: 'user',
        entities: [UserEntity],
        synchronize: true,
      }),]
})
```

## Configurando o Docker
> Criar um arquivo `docker-compose.yml`

Arquivo para as configurações do Docker-compose

```js
version: "3"
services:
  zookeeper:
    image: wurstmeister/zookeeper:latest
    ports:
      - "2181:2181"
  kafka:
    image: wurstmeister/kafka:2.11-1.1.0
    ports:
      - "9092:9092"
    environment:
      KAFKA_ADVERTISED_HOST_NAME: localhost
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_CREATE_TOPICS: "create-user:1:1, find-all-user:1:1"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
```

> Verificando o status do contêiner 

```bash
docker ps
```

Ou

```bash
docker ps -a
```

> Levantando o sistema do Postgres

```bash
docker start postgres
```

> Baixando as configurações do `docker-compose.yml`

```bash
docker-compose up -d
```

> Configurando os `Microservices & Kafkajs`

```bash
yarn add @nestjs/microservices kafkajs
```

## Configurando o service do kafka

```js
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
```
