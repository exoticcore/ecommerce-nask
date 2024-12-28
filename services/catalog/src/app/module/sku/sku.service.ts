import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/provider/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { ImageUrlUtils } from '../../../core/utils/image-url.util';
import { UpdateSkuDto } from './dto/sku.update.dto';
import { CreateSkuDto } from './dto/sku.create.dto';

@Injectable()
export class SkuService {
  private locale: string;
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private imgUrl: ImageUrlUtils,
  ) {
    this.locale = this.config.get('DEFAULT_LOCALE') || 'th';
  }

  async createProductSku(data: CreateSkuDto) {
    const product = await this.prisma.product.findUnique({
      where: {
        slug: data.product_slug,
      },
    });

    if (!product) return null;

    const created = await this.prisma.$transaction(async (tx) => {
      const createdSku = await tx.skuProduct.create({
        data: {
          ...data.sku,
          product_id: product.id,
        },
      });

      if (data.attr_value_id.length) {
        await Promise.all(
          data.attr_value_id.map(async (attr_id) => {
            await tx.productOption.create({
              data: {
                product_attr_value_id: attr_id,
                sku_id: createdSku.id,
              },
            });
          }),
        );
      }

      return createdSku;
    });

    return created;
  }

  async updateProductSKU(data: UpdateSkuDto) {
    const isSku = await this.prisma.skuProduct.findUnique({
      where: {
        sku: data.sku_ref,
      },
    });

    if (!isSku) return null;

    await this.prisma.$transaction(async (tx) => {
      if (data.attr_value_id.length) {
        await tx.productOption.deleteMany({
          where: {
            sku_id: isSku.id,
          },
        });

        await Promise.all(
          data.attr_value_id.map(async (attr_id) => {
            await tx.productOption.create({
              data: {
                product_attr_value_id: attr_id,
                sku_id: isSku.id,
              },
            });
          }),
        );
      } else if (data.attr_value_id.length === 0) {
        await tx.productOption.deleteMany({
          where: {
            sku_id: isSku.id,
          },
        });
      }
    });

    const updated = await this.prisma.skuProduct.findUnique({
      where: {
        id: isSku.id,
      },
    });

    return updated;
  }

  async deleteProductSKU(sku: string) {
    const isSku = await this.prisma.skuProduct.findUnique({
      where: {
        sku,
      },
    });

    if (!isSku) return null;

    const deleted = await this.prisma.skuProduct.delete({
      where: {
        sku: isSku.sku,
      },
    });

    return deleted;
  }

  async getProductsBySKU(sku: string, lang?: string) {
    if (lang) this.locale = lang;
    const product = await this.prisma.skuProduct.findUnique({
      where: {
        sku: sku,
      },
      select: {
        sku: true,
        price: true,
        image_url: true,
        stock: true,
        is_stock: true,
        product: {
          select: {
            price: true,
            s_price: true,
            discount: true,
            image_url: true,
            slug: true,
            translate: {
              select: {
                title: true,
              },
              where: {
                locale: this.locale,
              },
            },
          },
        },
        product_option: {
          select: {
            product_attr_value: {
              select: {
                value: true,
              },
            },
          },
        },
      },
    });

    if (product) {
      const values: string[] = [];
      if (product.product_option.length) {
        product.product_option.map((opt) => {
          values.push(opt.product_attr_value.value);
        });
      }

      const data = {
        sku: product.sku,
        slug: product.product.slug,
        title: product.product.translate[0].title,
        price:
          product.price || product.product.s_price || product.product.price,
        image_url:
          this.imgUrl.imageUrl(product.image_url) ||
          this.imgUrl.imageUrl(product.product.image_url) ||
          '',
        value: values,
        stock: product.stock,
        is_stock: product.is_stock,
      };

      return data;
    } else {
      return null;
    }
  }
}
