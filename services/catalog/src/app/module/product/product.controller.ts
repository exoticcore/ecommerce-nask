import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.create.dto';
import { UpdateProductDto } from './dto/product.update.dto';
import { Permissions } from '../../../core/guard/permission/permission';
import { Permission } from '../../../core/guard/permission/permission.enum';
import { AuthGuard } from '../../../core/guard/auth/auth.guard';
import { PermissionGuard } from '../../../core/guard/permission/permission.guard';
import { HttpExceptionFilter } from '../../../core/filter/http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('/product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Permissions(Permission.ProductCreate)
  @UseGuards(AuthGuard, PermissionGuard)
  @Post()
  async createProduct(@Body() data: CreateProductDto) {
    const created = await this.productService.createNewProduct(data);

    if (!created)
      throw new HttpException('bad request error', HttpStatus.BAD_REQUEST);

    return created;
  }

  @Get()
  async getAllProducts(@Query('lang') lang?: string | undefined) {
    const products = await this.productService.getProducts(lang);
    return products;
  }

  // @Permissions(Permission.ProductRead)
  // @UseGuards(AuthGuard, PermissionGuard)
  @Get('/admin/slug/:slug')
  async GetProductBySlugAdmin(@Param('slug') slug: string) {
    const product = await this.productService.getProductAdmin(slug);

    if (!product) return false;

    return product;
  }

  @Get('/slug/:slug')
  async GetProductBySlug(
    @Param('slug') slug: string,
    @Query('lang') lang?: string,
  ) {
    const product = await this.productService.getProduct(slug, lang);

    if (!product) return false;

    return product;
  }

  @Get('/sku-lists')
  async productListsBySku(
    @Body() data: { sku: string[] },
    @Query('lang') lang?: string,
  ) {
    const products = await this.productService.skuLists(data.sku, lang);

    if (!products) return [];

    return products;
  }

  @Permissions(Permission.ProductUpdate)
  @UseGuards(AuthGuard, PermissionGuard)
  @Patch('/slug/:slug')
  @HttpCode(HttpStatus.OK)
  async updateProduct(
    @Param('slug') slug: string,
    @Body() data: UpdateProductDto,
  ) {
    const updated = await this.productService.updateProduct(slug, data);

    if (!updated)
      throw new HttpException('bad request error', HttpStatus.BAD_REQUEST);

    return updated;
  }

  @Permissions(Permission.ProductDelete)
  @UseGuards(AuthGuard, PermissionGuard)
  @Delete('/slug/:slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduct(@Param('slug') slug: string) {
    const deleted = await this.productService.deleteProduct(slug);

    if (!deleted)
      throw new HttpException('bad request error', HttpStatus.BAD_REQUEST);

    return deleted;
  }

  @Get('/publish')
  async publishProduct() {
    await this.productService.publishProduct();

    return 'published';
  }
}
