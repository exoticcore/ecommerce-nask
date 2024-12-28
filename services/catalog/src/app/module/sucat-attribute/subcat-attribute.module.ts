import { Module } from '@nestjs/common';
import { SubCatAttributeController } from './subcat-attribute.controller';
import { SubCatAttributeService } from './subcat-attribute.service';

@Module({
  controllers: [SubCatAttributeController],
  providers: [SubCatAttributeService],
})
export class SubCatAttributeModule {}
