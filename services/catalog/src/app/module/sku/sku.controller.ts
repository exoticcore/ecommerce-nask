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
  UseGuards,
} from '@nestjs/common';
import { SkuService } from './sku.service';
import { Permission } from '../../../core/guard/permission/permission.enum';
import { CreateSkuDto } from './dto/sku.create.dto';
import { Permissions } from '../../../core/guard/permission/permission';
import { AuthGuard } from '../../../core/guard/auth/auth.guard';
import { PermissionGuard } from '../../../core/guard/permission/permission.guard';
import { UpdateSkuDto } from './dto/sku.update.dto';

@Controller('/sku')
export class SkuController {
  constructor(private skuService: SkuService) {}

  @Permissions(Permission.ProductCreate)
  @UseGuards(AuthGuard, PermissionGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async creattProductSKU(@Body() data: CreateSkuDto) {
    const created = await this.skuService.createProductSku(data);

    if (!created)
      throw new HttpException('bad request error', HttpStatus.BAD_REQUEST);

    return created;
  }

  @Get('/:sku')
  async getProductBySKU(
    @Param('sku') sku: string,
    @Query('lang') lang?: string,
  ) {
    const product = await this.skuService.getProductsBySKU(sku, lang);
    if (!product) return null;

    return product;
  }

  @Permissions(Permission.ProductUpdate)
  @UseGuards(AuthGuard, PermissionGuard)
  @Patch()
  @HttpCode(HttpStatus.OK)
  async updateProductSKU(@Body() data: UpdateSkuDto) {
    const updated = await this.skuService.updateProductSKU(data);

    if (!updated)
      throw new HttpException('bad request error', HttpStatus.BAD_REQUEST);

    return updated;
  }

  @Permissions(Permission.ProductDelete)
  @UseGuards(AuthGuard, PermissionGuard)
  @Delete('/:sku')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProductSKU(@Param('sku') sku: string) {
    const deleted = await this.skuService.deleteProductSKU(sku);

    if (!deleted)
      throw new HttpException('bad request error', HttpStatus.BAD_REQUEST);

    return deleted;
  }
}
