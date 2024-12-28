import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ProductAttributeValueService } from './product-attr-value.service';
import { CreateProductAttrValueDto } from './dto/product-attr-value.create.dto';
import { UpdateProductAttrValueDto } from './dto/product-attr-value.update.dto';
import { Permissions } from '../../../core/guard/permission/permission';
import { Permission } from '../../../core/guard/permission/permission.enum';
import { AuthGuard } from '../../../core/guard/auth/auth.guard';
import { PermissionGuard } from '../../../core/guard/permission/permission.guard';
import { HttpExceptionFilter } from '../../../core/filter/http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('/product-attr-value')
export class ProductAttributeValueController {
  constructor(
    private readonly productAttrValueService: ProductAttributeValueService,
  ) {}

  @Permissions(Permission.ProductAttrValueCreate)
  @UseGuards(AuthGuard, PermissionGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAttrValue(@Body() data: CreateProductAttrValueDto) {
    const created = await this.productAttrValueService.createAttrValue(data);

    if (!created)
      throw new HttpException('bad request error', HttpStatus.BAD_REQUEST);

    return created;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllAttrValue() {
    const attrValues =
      await this.productAttrValueService.getAllAttributeValue();

    if (!attrValues)
      throw new HttpException('bad request error', HttpStatus.BAD_REQUEST);

    return attrValues;
  }

  @Permissions(Permission.ProductAttrValueUpdate)
  @UseGuards(AuthGuard, PermissionGuard)
  @Patch()
  @HttpCode(HttpStatus.OK)
  async updateAttrValue(
    @Query('id', ParseIntPipe) id: number,
    @Body() data: UpdateProductAttrValueDto,
  ) {
    const updated = await this.productAttrValueService.updateAttrValue(
      id,
      data,
    );

    if (!updated)
      throw new HttpException('bad request error', HttpStatus.BAD_REQUEST);

    return updated;
  }

  @Permissions(Permission.ProductAttrValueDelete)
  @UseGuards(AuthGuard, PermissionGuard)
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAttrValue(@Query('id', ParseIntPipe) id: number) {
    const deleted = await this.productAttrValueService.deleteAttrValue(id);
    if (!deleted)
      throw new HttpException('bad request error', HttpStatus.BAD_REQUEST);

    return { message: `deleted product attribute value` };
  }
}
