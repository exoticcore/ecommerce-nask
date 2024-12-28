import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './module/product/product.module';
import { CoreModule } from '../core/core.module';
import { SubCatAttributeModule } from './module/sucat-attribute/subcat-attribute.module';
import { BrandModule } from './module/brand/brand.module';
import { SkuModule } from './module/sku/sku.module';
import { ProductAttributeModule } from './module/product-attribute/product-attribute.module';
import { ProductAttributeValueModule } from './module/product-attribute-value/product-attr-value.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductModule,
    SkuModule,
    SubCatAttributeModule,
    BrandModule,
    ProductAttributeModule,
    ProductAttributeValueModule,
    CoreModule,
  ],
})
export class AppModule {}
