import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/provider/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder() {
    return { message: `create order service` };
  }

  async getAllOrders() {
    return { message: 'get all orders service' };
  }
}
