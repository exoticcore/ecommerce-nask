import { Module } from '@nestjs/common';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';
import { ShippingConsumer } from './shipping.consumer';

@Module({
  imports: [ShippingConsumer],
  controllers: [ShippingController],
  providers: [ShippingService],
})
export class ShippingModule {}
