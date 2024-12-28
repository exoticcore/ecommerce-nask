import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/provider/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CreateBrandDto } from './dto/brand.create.dto';
import { UpdateBrandDto } from './dto/brand.update.dto';
import { ImageUrlUtils } from '../../../core/utils/image-url.util';

@Injectable()
export class BrandService {
  private locale: string;

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private imageUrl: ImageUrlUtils,
  ) {
    this.locale = this.config.get('DEFAULT_LOCALE') || 'th';
  }

  async createBrand(data: CreateBrandDto) {
    const isBrand = await this.prisma.brand.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (isBrand) return false;

    const created = await this.prisma.brand.create({
      data: {
        ...data,
        image_url: data.image_url && `${data.image_url}`,
      },
    });

    return created;
  }

  async getBrands() {
    const result = [];
    const brands = await this.prisma.brand.findMany({
      select: {
        slug: true,
        image_url: true,
        title: true,
        products: true,
      },
      where: {
        deleted_at: null,
      },
    });

    brands.map((brand) => {
      const data = {
        slug: brand.slug,
        title: brand.title,
        image_url: this.imageUrl.imageUrl(brand.image_url),
        product: brand.products.length,
      };
      result.push(data);
    });

    return result;
  }

  async updateBrand(slug: string, data: UpdateBrandDto) {
    const isBrand = await this.prisma.brand.findUnique({ where: { slug } });

    if (!isBrand) return false;

    const updated = await this.prisma.brand.update({
      data: { ...data },
      where: { id: isBrand.id },
    });

    return updated;
  }

  async deleteBrand(slug: string) {
    const isBrand = await this.prisma.brand.findUnique({ where: { slug } });

    if (!isBrand) return false;

    const deleted = await this.prisma.brand.update({
      where: {
        id: isBrand.id,
      },
      data: {
        deleted_at: new Date(),
      },
    });

    return deleted;
  }

  async slugBrand(slug: string) {
    const isBrand = await this.prisma.brand.findUnique({ where: { slug } });

    if (isBrand) return false;

    return true;
  }

  convertSlug(slug: string) {
    const lowerCase = slug.toLowerCase();
    const newSlug = lowerCase.split(' ').join('-');

    return newSlug;
  }
}
