import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/provider/prisma/prisma.service';
import { ShippingCreateDto } from './shipping.dto';

@Injectable()
export class ShippingService {
  private locale: string;

  constructor(private readonly prisma: PrismaService) {
    this.locale = 'th';
  }

  async createShippingMethod(createShippingMethod: ShippingCreateDto) {
    const isMethod = await this.prisma.shippingMethod.findUnique({
      where: { slug: createShippingMethod.shipping.slug },
    });

    if (isMethod) return false;

    const createMethod = await this.prisma.shippingMethod.create({
      data: createShippingMethod.shipping,
    });

    createShippingMethod.translate.forEach(async (translate) => {
      await this.prisma.shippingMethodTranslate.create({
        data: { ...translate, shipping_method_id: createMethod.id },
      });
    });
    return true;
  }

  async getAllShippingMethod(lang?: string) {
    if (lang) this.locale = lang;

    const methods = await this.prisma.shippingMethod.findMany({
      select: {
        slug: true,
        cost: true,
        translate: {
          select: {
            title: true,
            description: true,
          },
          where: {
            locale: this.locale,
          },
        },
      },
    });

    const data = [];

    methods.forEach((method) => {
      data.push({
        slug: method.slug,
        cost: method.cost,
        title: method.translate[0].title,
        description: method.translate[0].description,
      });
    });

    return data;
  }

  async updateShippingMethod() {
    return { message: 'update shipping method service' };
  }

  async deleteShippingMethod(slug: string): Promise<boolean> {
    const isMethod = await this.prisma.shippingMethod.findUnique({
      where: { slug: slug },
    });

    if (!isMethod) return false;

    await this.prisma.shippingMethodTranslate.deleteMany({
      where: { shipping_method_id: isMethod.id },
    });
    await this.prisma.shippingMethod.delete({ where: { slug: slug } });

    return true;
  }
}
