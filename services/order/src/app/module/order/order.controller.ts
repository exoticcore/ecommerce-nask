import { Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder() {
    const created = await this.orderService.createOrder();
    return created;
  }

  @Get()
  async getAllOrders() {
    const orders = await this.orderService.getAllOrders();
    return orders;
  }
}
