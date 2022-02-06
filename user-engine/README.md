# User-Engine

## Instalações 

> Instalando os Microservice

```bash
yarn add @nestjs/microservices kafkajs
```

> Instalando o TypeOrm e Postgres

```bash
yarn add npm @nestjs/typeorm typeorm pg
```

## Configurando serviço

Configurando o `user-engine` para se comunicar com o serviço do `kafka` através do `app`

> Modulo database

- src > database > database.module.ts

```js
import { UserEntity } from '../interfaces/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
export class DatabaseModule {}
```

- src > interfaces > user.entity.ts

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

- src > interfaces > user.interface.ts

```ts
export interface User {
    name: string;
    email: string;
    password: string;
    phone: string;
}
```

Com isso faz se as exclusões e importações necessárias para o serviço funcionar corretamente.
