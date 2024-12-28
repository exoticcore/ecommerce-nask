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
import { ProductAttributeService } from './product-attribute.service';
import { UpdateProductAttributeDto } from './dto/product-attr.update.dto';
import { CreateProductAttributeDto } from './dto/product-attr.create.dto';
import { Permissions } from '../../../core/guard/permission/permission';
import { Permission } from '../../../core/guard/permission/permission.enum';
import { AuthGuard } from '../../../core/guard/auth/auth.guard';
import { PermissionGuard } from '../../../core/guard/permission/permission.guard';
import { HttpExceptionFilter } from '../../../core/filter/http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('/product-attr')
export class ProductAttributeController {
  constructor(private readonly productAttrService: ProductAttributeService) {}

  @Permissions(Permission.ProductAttrCreate)
  @UseGuards(AuthGuard, PermissionGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProductAttr(@Body() data: CreateProductAttributeDto) {
    const created = await this.productAttrService.createProductAttribute(data);
    if (!created) throw new HttpException('', HttpStatus.BAD_REQUEST);

    return created;
  }

  // @Permissions(Permission.ProductAttrRead)
  // @UseGuards(AuthGuard, PermissionGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllProductAttr(@Query('lang') lang: string) {
    const productAttrs =
      await this.productAttrService.getAllProductAttribute(lang);
    return productAttrs;
  }

  @Permissions(Permission.ProductAttrRead)
  @UseGuards(AuthGuard, PermissionGuard)
  @Get('single')
  @HttpCode(HttpStatus.OK)
  async getProductAttrById(@Query('id', ParseIntPipe) id: number) {
    const productAttr =
      await this.productAttrService.getProductAttributeById(id);

    if (!productAttr) throw new HttpException('', HttpStatus.BAD_REQUEST);

    return productAttr;
  }

  @Permissions(Permission.ProductAttrUpdate)
  @UseGuards(AuthGuard, PermissionGuard)
  @Patch()
  @HttpCode(HttpStatus.OK)
  async updateProductAttr(
    @Query('id', ParseIntPipe) id: number,
    @Body() data: UpdateProductAttributeDto,
  ) {
    const updated = await this.productAttrService.updateProductAttribute(
      id,
      data,
    );
    return updated;
  }

  @Permissions(Permission.ProductAttrDelete)
  @UseGuards(AuthGuard, PermissionGuard)
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProductAttr(@Query('id', ParseIntPipe) id: number) {
    const deleted = await this.productAttrService.deleteProductAttribute(id);

    if (!deleted)
      throw new HttpException('bad request erorr', HttpStatus.BAD_REQUEST);

    return { message: 'deleted product attribute' };
  }
}
