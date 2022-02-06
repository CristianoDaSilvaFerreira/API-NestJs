import { UserEntity } from './interfaces/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './interfaces/user.interface';

@Injectable()
export class AppService {
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

  // Função findAll
  async find(userId: number): Promise<User> {
    const {id, name, email, password, phone} = await this.userRepository.findOne(userId);
    const respose: User = {
      id,
      name,
      email,
      password, 
      phone,
    };

    return respose;
  }

  // Função do create()
  async create(user: User): Promise<UserEntity> {
    return await this.userRepository.save(user);
    
  }
}
