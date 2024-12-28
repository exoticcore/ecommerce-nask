import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/provider/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CreateSubCatAttrDto } from './dto/subcat-attribute.create.dto';
import { AmqpService } from '../../../core/provider/amqp/amqp.service';
import { UpdateSubcatAttr } from './dto/subcat-attribute.update.dto';

@Injectable()
export class SubCatAttributeService {
  private locale: string;

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private amqpService: AmqpService,
  ) {
    this.locale = this.config.get('DEFAULT_LOCALE') || 'th';
  }

  async createSubcatAttr(data: CreateSubCatAttrDto) {
    const isSubAttr = await this.prisma.subCategoryAttribute.findUnique({
      where: { slug: data.subcat_attr.slug },
    });

    if (isSubAttr) return false;

    const createdSubAttr = await this.prisma.subCategoryAttribute.create({
      data: {
        ...data.subcat_attr,
      },
    });

    await Promise.all(
      data.translate.map(async (trans) => {
        const isTranslate =
          await this.prisma.subCategoryAttributeTranslate.findUnique({
            where: {
              subCatAttrTranslateIndentifier: {
                locale: trans.locale,
                subcat_attr_id: createdSubAttr.id,
              },
            },
          });

        if (!isTranslate) {
          await this.prisma.subCategoryAttributeTranslate.create({
            data: {
              ...trans,
              subcat_attr_id: createdSubAttr.id,
            },
          });
        }
      }),
    );
    return true;
  }

  async getSubcatAttrs(lang?: string) {
    if (lang) this.locale = lang;
    const result = [];
    const subcats = await this.prisma.subCategoryAttribute.findMany({
      select: {
        slug: true,
        product: true,
        translate: {
          select: {
            name: true,
          },
          where: {
            locale: this.locale,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    subcats.map((subcat) => {
      const translate = { ...subcat.translate[0] };

      const data = {
        slug: subcat.slug,
        name: translate.name,
        product: subcat.product.length,
      };
      result.push(data);
    });

    return result;
  }

  async getSubcatInfo(slug: string) {
    const isSubcatAttr = await this.prisma.subCategoryAttribute.findUnique({
      where: { slug },
      include: {
        translate: true,
      },
    });

    if (!isSubcatAttr) return false;

    return isSubcatAttr;
  }

  async updateSubcatAttr(slug: string, data: UpdateSubcatAttr) {
    const isSubcat = await this.prisma.subCategoryAttribute.findUnique({
      where: { slug },
    });

    if (!isSubcat) return false;

    if (data.translate) {
      data.translate.forEach(async (trans) => {
        const isTranslate =
          await this.prisma.subCategoryAttributeTranslate.findUnique({
            where: {
              subCatAttrTranslateIndentifier: {
                locale: trans.locale,
                subcat_attr_id: isSubcat.id,
              },
            },
          });

        if (isTranslate) {
          await this.prisma.subCategoryAttributeTranslate.update({
            data: {
              ...trans,
            },
            where: {
              id: isTranslate.id,
            },
          });
        } else if (!isTranslate && trans.name) {
          await this.prisma.subCategoryAttributeTranslate.create({
            data: {
              locale: trans.locale,
              name: trans.name,
              subcat_attr_id: isSubcat.id,
            },
          });
        }
      });
    }

    if (data.slug) {
      await this.prisma.subCategoryAttribute.update({
        data: { slug: data.slug },
        where: { id: isSubcat.id },
      });
    }

    return await this.prisma.subCategoryAttribute.findUnique({
      where: { id: isSubcat.id },
      include: { translate: true },
    });
  }

  async deleteSubcatAttrs(slug: string) {
    const isSubAttr = await this.prisma.subCategoryAttribute.findUnique({
      where: { slug },
    });

    if (!isSubAttr) return false;

    await this.prisma.subCategoryAttributeTranslate.deleteMany({
      where: { subcat_attr_id: isSubAttr.id },
    });

    await this.prisma.subCategoryAttribute.delete({ where: { slug } });

    return true;
  }
}
