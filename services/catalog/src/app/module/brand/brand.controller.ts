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
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/brand.create.dto';
import { UpdateBrandDto } from './dto/brand.update.dto';
import { AuthGuard } from '../../../core/guard/auth/auth.guard';
import { Permissions } from '../../../core/guard/permission/permission';
import { Permission } from '../../../core/guard/permission/permission.enum';
import { PermissionGuard } from '../../../core/guard/permission/permission.guard';
import { HttpExceptionFilter } from '../../../core/filter/http-exception.filter';
import { BrandSlugDto } from './dto/brand.slug.dto';

@UseFilters(HttpExceptionFilter)
@Controller('/brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Permissions(Permission.BrandCreate)
  @UseGuards(AuthGuard, PermissionGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBrand(@Body() data: CreateBrandDto) {
    const created = await this.brandService.createBrand(data);

    if (!created)
      throw new HttpException('bad request error', HttpStatus.BAD_REQUEST);

    return created;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getBrands() {
    const brands = await this.brandService.getBrands();

    return { brands };
  }

  @Permissions(Permission.BrandUpdate)
  @UseGuards(AuthGuard, PermissionGuard)
  @Patch('/:slug')
  @HttpCode(HttpStatus.OK)
  async updateBrand(@Param('slug') slug: string, @Body() data: UpdateBrandDto) {
    const updated = await this.brandService.updateBrand(slug, data);

    if (!updated)
      throw new HttpException('bad request error', HttpStatus.BAD_REQUEST);

    return updated;
  }

  @Permissions(Permission.BrandDelete)
  @UseGuards(AuthGuard, PermissionGuard)
  @Delete('/:slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBrand(@Param('slug') slug: string) {
    const deleted = await this.brandService.deleteBrand(slug);

    if (!deleted)
      throw new HttpException('bad request error', HttpStatus.BAD_REQUEST);

    return deleted;
  }

  @Permissions(Permission.BrandCreate)
  @UseGuards(AuthGuard, PermissionGuard)
  @Post('/slug/check')
  @HttpCode(HttpStatus.OK)
  async slugBrand(@Body() body: BrandSlugDto) {
    const isSlug = await this.brandService.slugBrand(body.slug);

    if (!isSlug)
      throw new HttpException('bad request error', HttpStatus.BAD_REQUEST);

    return true;
  }
}
