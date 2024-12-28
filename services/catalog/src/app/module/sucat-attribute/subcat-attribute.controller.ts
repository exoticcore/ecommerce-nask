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
import { SubCatAttributeService } from './subcat-attribute.service';
import { CreateSubCatAttrDto } from './dto/subcat-attribute.create.dto';
import { HttpExceptionFilter } from '../../../core/filter/http-exception.filter';
import { UpdateSubcatAttr } from './dto/subcat-attribute.update.dto';
import { Permissions } from '../../../core/guard/permission/permission';
import { Permission } from '../../../core/guard/permission/permission.enum';
import { AuthGuard } from '../../../core/guard/auth/auth.guard';
import { PermissionGuard } from '../../../core/guard/permission/permission.guard';

@UseFilters(HttpExceptionFilter)
@Controller('/subcat-attr')
export class SubCatAttributeController {
  constructor(private subcatAttrService: SubCatAttributeService) {}

  @Permissions(Permission.SubcatAttrCreate)
  @UseGuards(AuthGuard, PermissionGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSubCatAttr(@Body() data: CreateSubCatAttrDto) {
    const created = await this.subcatAttrService.createSubcatAttr(data);
    if (!created)
      throw new HttpException(
        'already has this slug name',
        HttpStatus.BAD_REQUEST,
      );
    return { ...data };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getSubcatAttribute(@Query('lang') lang?: string | undefined) {
    const subcats = await this.subcatAttrService.getSubcatAttrs(lang);
    return subcats;
  }

  @Get('/:slug')
  @HttpCode(HttpStatus.OK)
  async getSubcatAttrInfo(@Param('slug') slug: string) {
    const subcatInfo = await this.subcatAttrService.getSubcatInfo(slug);

    if (!subcatInfo)
      throw new HttpException('bad request error', HttpStatus.BAD_REQUEST);

    return subcatInfo;
  }

  @Permissions(Permission.SubcatAttrUpdate)
  @UseGuards(AuthGuard, PermissionGuard)
  @Patch('/:slug')
  @HttpCode(HttpStatus.OK)
  async updateSubcatAttr(
    @Param('slug') slug: string,
    @Body() data: UpdateSubcatAttr,
  ) {
    const updated = await this.subcatAttrService.updateSubcatAttr(slug, data);

    if (!updated)
      throw new HttpException('bad request error', HttpStatus.BAD_REQUEST);

    return updated;
  }

  @Permissions(Permission.SubcatAttrDelete)
  @UseGuards(AuthGuard, PermissionGuard)
  @Delete('/:slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSubcatAttr(@Param('slug') slug: string) {
    const deleted = await this.subcatAttrService.deleteSubcatAttrs(slug);

    if (!deleted)
      throw new HttpException(
        `not found subcat attribute slug: ${slug}`,
        HttpStatus.BAD_REQUEST,
      );

    return { message: `delete subcat attribute controller: ${slug}` };
  }
}
