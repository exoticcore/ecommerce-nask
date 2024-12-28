import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ShippingModule } from './module/shipping/shipping.module';
import { CoreModule } from '../core/core.module';
import { CartModule } from './module/cart/cart.module';
import { OrderModule } from './module/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'order_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
    OrderModule,
    ShippingModule,
    CartModule,
    CoreModule,
  ],
})
export class AppModule {}
