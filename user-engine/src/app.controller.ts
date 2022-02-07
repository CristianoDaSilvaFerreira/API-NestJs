import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UserEntity } from './interfaces/user.entity';
import { User } from './interfaces/user.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @MessagePattern('find-all-user')
  async index(): Promise<UserEntity[]> {
    return this.appService.findAll();
  }

  @MessagePattern('find-user')
  async find(@Payload() data: any): Promise<User> {
    return this.appService.find(Number(data.value.id));
  }


  @MessagePattern('update-user')
  async update(@Payload() data: any): Promise<void> {
    this.logger.log(`User: ${JSON.stringify(data)}`);

    await this.appService.update(data.value);
  }

  @MessagePattern('delete-user')
  async delete(@Payload() data: any): Promise<void> {
    return this.appService.delete(Number(data.value.id));
  }
}
