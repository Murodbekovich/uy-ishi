import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'get_users' })
  getUsers() {
    return [
      { id: 1, name: 'Ali' },
      { id: 2, name: 'Vali' },
    ];
  }
}