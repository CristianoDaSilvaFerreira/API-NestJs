import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('notification-user')
  sendEmail(@Payload() data: any): void {
    console.log(data.value);
  }

  @MessagePattern('notification-user') 
  sendPhone(@Payload() data: any): void {
    console.log(data.value);
  }
}
