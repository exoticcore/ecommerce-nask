import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/provider/prisma/prisma.service';
import { CreateProductAttrValueDto } from './dto/product-attr-value.create.dto';
import { UpdateProductAttrValueDto } from './dto/product-attr-value.update.dto';

@Injectable()
export class ProductAttributeValueService {
  constructor(private readonly prisma: PrismaService) {}

  async createAttrValue(data: CreateProductAttrValueDto) {
    const isAttr = await this.prisma.productAttribute.findUnique({
      where: { id: data.product_attr_id },
    });

    const isAttrValue = await this.prisma.productAttributeValue.findUnique({
      where: {
        productAttrValueIdentifier: {
          product_attr_id: data.product_attr_id,
          value: data.value,
        },
      },
    });

    if (!isAttr || isAttrValue) return false;

    const created = await this.prisma.productAttributeValue.create({
      data: { ...data },
    });

    return created;
  }

  async getAllAttributeValue() {
    const attrValue = await this.prisma.productAttributeValue.findMany({
      where: { deleted_at: null },
    });

    return attrValue;
  }

  async updateAttrValue(id: number, data: UpdateProductAttrValueDto) {
    const isAttrValue = await this.prisma.productAttributeValue.findUnique({
      where: { id },
    });

    if (!isAttrValue) return false;

    const updated = await this.prisma.productAttributeValue.update({
      data: { ...data },
      where: { id },
    });

    return updated;
  }

  async deleteAttrValue(id: number) {
    const isAttrValue = await this.prisma.productAttributeValue.findUnique({
      where: { id },
    });

    if (!isAttrValue) return false;

    const deleted = await this.prisma.productAttributeValue.update({
      where: { id },
      data: {
        deleted_at: new Date(),
      },
    });

    return deleted;
  }
}
