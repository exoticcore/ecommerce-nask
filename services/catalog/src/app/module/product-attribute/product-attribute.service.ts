import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/provider/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { UpdateProductAttributeDto } from './dto/product-attr.update.dto';
import { CreateProductAttributeDto } from './dto/product-attr.create.dto';

@Injectable()
export class ProductAttributeService {
  private locale: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    this.locale = this.config.get('DEFAULT_LOCALE') || 'th';
  }

  async createProductAttribute(data: CreateProductAttributeDto) {
    const createProductAttr = await this.prisma.productAttribute.create({
      data: {
        type: data.type,
        name: data.name,
      },
    });

    data.translate.map(async (trans) => {
      if (trans) {
        await this.prisma.productAttributeTransalte.create({
          data: {
            ...trans,
            product_attr_id: createProductAttr.id,
          },
        });
      }
    });

    if (data.product_attr_value) {
      for (let i = 0; i < data.product_attr_value.length; i++) {
        const attrValue = data.product_attr_value[i];
        await this.prisma.productAttributeValue.create({
          data: {
            ...attrValue,
            product_attr_id: createProductAttr.id,
          },
        });
      }
    }

    const created = await this.prisma.productAttribute.findUnique({
      where: { id: createProductAttr.id },
      include: {
        translate: true,
        product_attr_value: true,
      },
    });

    return created;
  }

  async getAllProductAttribute(lang?: string) {
    if (lang) this.locale = lang;

    const productAttr = await this.prisma.productAttribute.findMany({
      include: {
        translate: {
          where: {
            locale: this.locale,
          },
        },
        product_attr_value: {
          select: {
            id: true,
            more: true,
            value: true,
          },
        },
      },
      where: {
        deleted_at: null,
      },
    });

    const data = [];

    productAttr.forEach((attr) => {
      const attrValue = [];
      attr.product_attr_value.forEach((value) => {
        attrValue.push({
          id: value.id,
          value: value.value,
          more: value.more,
        });
      });
      data.push({
        id: attr.id,
        translate_id: attr.translate[0].id,
        name: attr.name,
        title: attr.translate[0].title,
        description: attr.translate[0].description,
        type: attr.type,
        value: attrValue,
      });
    });

    return data;
  }

  async getProductAttributeById(id: number) {
    const isAttr = await this.prisma.productAttribute.findUnique({
      where: { id },
      include: {
        translate: true,
        product_attr_value: true,
      },
    });

    if (!isAttr) return null;

    return isAttr;
  }

  async updateProductAttribute(id: number, data: UpdateProductAttributeDto) {
    const updated = await this.prisma.productAttribute.update({
      data: {
        ...data,
      },
      where: {
        id,
      },
      include: {
        translate: true,
      },
    });

    // const data = {
    //   id: updated.id,
    //   type: updated.type,
    // };
    return updated;
  }

  async deleteProductAttribute(id: number) {
    const isProductAttr = await this.prisma.productAttribute.findUnique({
      where: {
        id,
      },
    });

    if (!isProductAttr) return false;

    const deleted = this.prisma.$transaction(async (tx) => {
      await tx.productAttributeValue.updateMany({
        where: { product_attr_id: isProductAttr.id },
        data: {
          deleted_at: new Date(),
        },
      });

      await tx.productAttributeTransalte.updateMany({
        where: {
          product_attr_id: isProductAttr.id,
        },
        data: {
          deleted_at: new Date(),
        },
      });

      await tx.productAttribute.update({
        where: { id: isProductAttr.id },
        data: { deleted_at: new Date() },
      });

      return true;
    });

    return deleted;
  }
}
