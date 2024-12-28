import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ShippingCreateDto } from './shipping.dto';
import { HttpExceptionFilter } from '../../../core/filter/http-exception.filter';
import { ShippingService } from './shipping.service';

@UseFilters(HttpExceptionFilter)
@Controller('/shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  // Create Shipping Method Controller
  @Post('/')
  async createShippingMethod(@Body() body: ShippingCreateDto) {
    const created = await this.shippingService.createShippingMethod(body);

    if (!created)
      throw new HttpException('bad request error', HttpStatus.BAD_REQUEST);

    return { message: 'created shipping method' };
  }

  // Get All Shipping Methods Controller
  @Get('/')
  async getAllShippingMethods(@Query('lang') lang?: string) {
    const shippingMethods =
      await this.shippingService.getAllShippingMethod(lang);

    console.log('get all method');

    return shippingMethods;
  }

  // Update Shipping Method Controller
  @Patch('/:slug')
  async updateShippingMethod(@Param('slug') slug: string) {
    return { message: `update shipping method at slug: ${slug}` };
  }

  // Delete Shipping Method Controller
  @Delete('/:slug')
  async deleteShipingMethod(@Param('slug') slug: string) {
    const deleted = await this.shippingService.deleteShippingMethod(slug);

    if (!deleted)
      throw new HttpException('bad request error', HttpStatus.BAD_REQUEST);

    return { message: `delete shipping method at slug: ${slug}` };
  }
}
