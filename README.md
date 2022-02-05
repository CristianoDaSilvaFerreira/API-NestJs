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

* `src > users > database > user.entity.ts`
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