import { Module } from '@nestjs/common';
import { ProductAttributeValueController } from './product-attr-value.controller';
import { ProductAttributeValueService } from './product-attr-value.service';

@Module({
  controllers: [ProductAttributeValueController],
  providers: [ProductAttributeValueService],
})
export class ProductAttributeValueModule {}
