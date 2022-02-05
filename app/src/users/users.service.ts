import { UserEntity } from './database/user.entity';
import { User } from './interface/user.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // Arrya para ser populado
  private users: User[] = [];

  // Função findAll()
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  // Função do create()
  async create(user: User): Promise<UserEntity> {
    return await this.userRepository.save(user);
    
  }
}
