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
