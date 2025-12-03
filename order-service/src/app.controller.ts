import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'get_orders' })
  getOrders() {
    return [
      { id: 101, product: 'Laptop', userId: 1 },
      { id: 102, product: 'Phone', userId: 2 },
    ];
  }
}