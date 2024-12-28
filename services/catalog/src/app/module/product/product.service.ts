import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/provider/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CreateProductDto } from './dto/product.create.dto';
import { AmqpService } from '../../../core/provider/amqp/amqp.service';
import { ModifySlugUtils } from '../../../core/utils/modify-slug.util';
import { UpdateProductDto } from './dto/product.update.dto';
import { logger } from 'nestjs-i18n';
import { ImageUrlUtils } from '../../../core/utils/image-url.util';
import ProductForm from '../../../interface/product-form.enum';

@Injectable()
export class ProductService {
  private locale: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly slugUtil: ModifySlugUtils,
    private readonly amqp: AmqpService,
    private readonly imageUrl: ImageUrlUtils,
  ) {
    this.locale = this.config.get('DEFAULT_LOCALE') || 'th';
  }

  async createNewProduct(data: CreateProductDto) {
    const slug = this.slugUtil.modifySlug(data.product.slug);
    const isProduct = await this.prisma.product.findUnique({
      where: { slug },
    });

    console.log(data);

    const isSubcat = await this.prisma.subCategoryAttribute.findUnique({
      where: { slug: data.ref.subcat_attr_slug },
    });

    let notAccept: boolean;

    for (let i = 0; i <= data.options.length; i++) {
      if (data.options[i]) {
        const isSku = await this.prisma.skuProduct.findUnique({
          where: { sku: data.options[i].sku.sku },
        });

        if (isSku) notAccept = true;

        for (let x = 0; x <= data.options[i].attr_value_id.length; x++) {
          if (data.options[i].attr_value_id[x]) {
            const isAttrValue =
              await this.prisma.productAttributeValue.findUnique({
                where: {
                  id: data.options[i].attr_value_id[x],
                },
              });

            if (!isAttrValue) notAccept = true;
          }
        }
      }
    }

    if (!isProduct && isSubcat && !notAccept) {
      await this.prisma.$transaction(async (tx) => {
        const createdProduct = await tx.product.create({
          data: {
            ...data.product,
            slug,
            subcat_attr_id: isSubcat.id,
          },
        });

        if (data.ref.brand_slug) {
          const isBrand = await tx.brand.findUnique({
            where: { slug: data.ref.brand_slug },
          });

          if (isBrand) {
            await tx.product.update({
              where: { id: createdProduct.id },
              data: { brand_id: isBrand.id },
            });
          }
        }

        await Promise.all(
          data.translate.map(async (trans) => {
            await tx.productTranslate.create({
              data: { ...trans, productId: createdProduct.id },
            });
          }),
        );

        await Promise.all(
          data.options.map(async (option) => {
            if (option.attr_value_id) {
              const createSku = await tx.skuProduct.create({
                data: {
                  ...option.sku,
                  sku: option.sku.sku,
                  product_id: createdProduct.id,
                },
              });
              await Promise.all(
                option.attr_value_id.map(async (value_id) => {
                  await tx.productOption.create({
                    data: {
                      product_attr_value_id: value_id,
                      sku_id: createSku.id,
                    },
                  });
                }),
              );
            } else {
              await tx.skuProduct.create({
                data: { ...option.sku, product_id: createdProduct.id },
              });
            }
          }),
        );

        if (data.media.length) {
          for (let i = 0; i < data.media.length; i++) {
            await tx.productMedia.create({
              data: {
                image_url: data.media[i],
                productId: createdProduct.id,
              },
            });
          }
        }

        if (data.tag) {
          for (let i = 0; i < data.tag.length; i++) {
            const tag_slug = this.slugUtil.modifySlug(data.tag[i]);
            const isTag = await tx.tag.findUnique({
              where: { slug: tag_slug },
            });

            if (isTag) {
              await tx.productTag.create({
                data: {
                  product_id: createdProduct.id,
                  tag_id: isTag.id,
                },
              });
            } else {
              const createdTag = await tx.tag.create({
                data: {
                  title: data.tag[i],
                  slug: tag_slug,
                },
              });

              await tx.productTag.create({
                data: {
                  product_id: createdProduct.id,
                  tag_id: createdTag.id,
                },
              });
            }
          }
        }
      });

      const newProduct = await this.prisma.product.findUnique({
        where: { slug },
      });

      await this.amqp.channelWrapper.publish(
        'catalog_exchange',
        'catalog.created',
        JSON.stringify(newProduct),
      );

      return newProduct;
    }

    return false;
  }

  async getProducts(lang?: string, page?: number) {
    const skip = page ? (page - 1) * 12 : 0;
    if (lang) this.locale = lang;
    const products = await this.prisma.product.findMany({
      select: {
        slug: true,
        price: true,
        s_price: true,
        rating: true,
        image_url: true,
        translate: {
          select: {
            title: true,
          },
          where: {
            locale: this.locale,
          },
        },
        subcat_attr: {
          select: {
            slug: true,
            translate: {
              select: {
                name: true,
              },
              where: {
                locale: this.locale,
              },
            },
          },
        },
      },
      where: {
        deleted_at: null,
      },
      skip: skip,
      take: 12,
    });

    const newProduct = [];

    products.map((product) => {
      newProduct.push({
        ...product,
        image_url: this.imageUrl.imageUrl(product.image_url) || null,
      });
    });

    const count = await this.prisma.product.count({
      where: {
        deleted_at: null,
      },
    });

    return { products: [...newProduct], count, page: skip + 1 };
  }

  private async getProductOptions(product_id: number) {
    const skus = await this.prisma.skuProduct.findMany({
      where: {
        product_id,
      },
      select: {
        id: true,
        sku: true,
        price: true,
        stock: true,
        is_stock: true,
        is_active: true,
        product_option: true,
        image_url: true,
      },
    });

    const selection = [];
    for (const sku of skus) {
      const attr_value_id = await this.prisma.productOption.findMany({
        where: {
          sku_id: sku.id,
        },
        select: {
          product_attr_value: {
            select: {
              value: true,
              more: true,
              product_attr: {
                select: {
                  type: true,
                  translate: {
                    where: {
                      locale: this.locale,
                    },
                    select: {
                      title: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const options = [];
      attr_value_id.forEach((attr) => {
        options.push({
          attr: attr.product_attr_value.product_attr.translate[0].title,
          type: attr.product_attr_value.product_attr.type || null,
          value: attr.product_attr_value.value,
          more: attr.product_attr_value.more || null,
        });
      });
      selection.push({
        sku: sku.sku,
        price: sku.price,
        stock: sku.stock,
        is_stock: sku.is_stock,
        image_url: this.imageUrl.imageUrl(sku.image_url),
        options,
      });
    }

    return selection;
  }

  async getProductAdmin(slug: string): Promise<ProductForm | boolean> {
    const product = await this.prisma.product.findUnique({
      where: { slug },
    });

    if (!product) return null;

    const productMedia = await this.prisma.productMedia.findMany({
      where: { productId: product.id },
    });
    const media = [];
    if (productMedia.length) {
      productMedia.map((image) => {
        media.push(image.image_url);
      });
    }

    const subcat = await this.prisma.subCategoryAttribute.findUnique({
      where: { id: product.subcat_attr_id },
    });

    const brand = await this.prisma.brand.findUnique({
      where: { id: product.brand_id },
    });

    const productTranslate = await this.prisma.productTranslate.findMany({
      where: { productId: product.id },
    });

    const translate = [];
    if (productTranslate.length) {
      productTranslate.map((trans) => {
        translate.push({
          locale: trans.locale,
          title: trans.title,
          information: trans.information,
          description: trans.description,
        });
      });
    }

    const productOptions = await this.prisma.skuProduct.findMany({
      where: { product_id: product.id },
    });
    const options = [];
    if (productOptions.length) {
      for (const option of productOptions) {
        const attr_value_id = await this.prisma.productOption.findMany({
          where: {
            sku_id: option.id,
          },
          select: {
            product_attr_value_id: true,
          },
        });

        const values = [];
        for (const value of attr_value_id) {
          values.push(value.product_attr_value_id);
        }

        options.push({
          sku: {
            sku: option.sku,
            stock: option.stock,
            is_stock: option.is_stock,
            is_primary: option.is_primary,
            image_url: option.image_url,
          },
          attr_value_id: values,
        });
      }
    }
    return {
      product: {
        slug: product.slug,
        price: product.price ? product.price.toNumber() : null,
        s_price: product.s_price.toNumber(),
        s_price_start: product.s_price_start,
        s_price_end: product.s_price_end,
        image_url: product.image_url,
        gallery: media,
        publish_at: product.publish_at,
        visibility: product.visibility,
      },
      translate: translate,
      ref: {
        subcat_attr_slug: subcat.slug,
        brand_slug: brand.slug,
      },
      options: options,
    };
  }

  async getProduct(slug: string, lang?: string) {
    if (lang) this.locale = lang;

    const product = await this.prisma.product.findUnique({
      where: { slug },
      select: {
        id: true,
        slug: true,
        price: true,
        s_price: true,
        rating: true,
        image_url: true,
        brand: {
          select: {
            title: true,
            slug: true,
          },
        },
        subcat_attr: {
          select: {
            slug: true,
            translate: {
              select: {
                name: true,
              },
              where: {
                locale: this.locale,
              },
            },
          },
        },
        translate: {
          select: {
            title: true,
            information: true,
            description: true,
          },
          where: {
            locale: this.locale,
          },
        },
        media: {
          select: {
            image_url: true,
          },
        },
        tag: {
          select: {
            tag: {
              select: {
                title: true,
                slug: true,
              },
            },
          },
        },
      },
    });
    if (!product) return null;

    const selection = await this.getProductOptions(product.id);

    const newMedia = [];

    product.media.map((image) => {
      newMedia.push(this.imageUrl.imageUrl(image.image_url));
    });

    return {
      ...product,
      media: [...newMedia],
      image_url: this.imageUrl.imageUrl(product.image_url),
      selection,
    };
  }

  async skuLists(skus: string[], lang?: string) {
    if (lang) this.locale = lang;

    const products = [];

    if (skus.length > 0) {
      for (const sku of skus) {
        const p_sku = await this.prisma.skuProduct.findUnique({
          where: {
            sku: sku,
          },
          select: {
            sku: true,
            price: true,
            image_url: true,
            product_option: {
              select: {
                product_attr_value: {
                  select: {
                    value: true,
                  },
                },
              },
            },
            product: {
              select: {
                price: true,
                s_price: true,
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
          },
        });

        const values: string[] = [];

        p_sku.product_option.map((opt) => {
          values.push(opt.product_attr_value.value);
        });

        const data = {
          sku: p_sku.sku,
          name: p_sku.product.translate[0].title,
          value: values,
          price: p_sku.price || p_sku.product.s_price || p_sku.product.price,
          image_url: p_sku.image_url,
        };

        products.push(data);
      }
    }

    return products;
  }

  async updateProduct(slug: string, data: UpdateProductDto) {
    const isProduct = await this.prisma.product.findUnique({ where: { slug } });

    if (!isProduct) return false;

    await this.prisma.$transaction(async (tx) => {
      if (data.product) {
        await tx.product.update({
          data: { ...data.product },
          where: { id: isProduct.id },
        });
      }

      if (data.media) {
        await tx.productMedia.deleteMany({
          where: { productId: isProduct.id },
        });
        for (let i = 0; i <= data.media.length; i++) {
          if (data.media[i]) {
            await tx.productMedia.create({
              data: {
                image_url: data.media[i],
                productId: isProduct.id,
              },
            });
          }
        }
      }

      if (data.ref) {
        if (data.ref.brand_slug) {
          const isBrand = await tx.brand.findUnique({
            where: { slug: data.ref.brand_slug },
          });

          if (isBrand) {
            await tx.product.update({
              data: { brand_id: isBrand.id },
              where: {
                id: isProduct.id,
              },
            });
          }
        }

        if (data.ref.subcat_attr_slug) {
          const isSubcatAttr = await tx.subCategoryAttribute.findUnique({
            where: {
              slug: data.ref.subcat_attr_slug,
            },
          });

          if (isSubcatAttr) {
            await tx.product.update({
              data: {
                subcat_attr_id: isSubcatAttr.id,
              },
              where: { id: isProduct.id },
            });
          }
        }
      }

      if (data.translate.length) {
        for (let i = 0; i <= data.translate.length; i++) {
          if (data.translate[i]) {
            const translateData = data.translate[i];
            const isTranslate = await tx.productTranslate.findUnique({
              where: {
                productTranslateIdentifier: {
                  locale: translateData.locale,
                  productId: isProduct.id,
                },
              },
            });

            logger.debug(isTranslate);

            if (isTranslate) {
              await tx.productTranslate.update({
                data: {
                  ...translateData,
                },
                where: {
                  id: isTranslate.id,
                },
              });
            } else if (translateData.title && translateData.locale) {
              const checkTranslate = await tx.productTranslate.findUnique({
                where: {
                  productTranslateIdentifier: {
                    locale: translateData.locale,
                    productId: isProduct.id,
                  },
                },
              });

              if (!checkTranslate) {
                await tx.productTranslate.create({
                  data: {
                    ...translateData,
                    productId: isProduct.id,
                  },
                });
              }
            }
          }
        }
      }

      // if (data.options) {
      //   for (let i = 0; i <= data.options.length; i++) {
      //     if (data.options[i]) {
      //       const optionData = data.options[i];
      //       const isSku = await this.prisma.skuProduct.findUnique({
      //         where: { sku: optionData.sku_ref },
      //       });

      //       if (isSku) {
      //         if (optionData.attr_value_id) {
      //           await this.prisma.productOption.deleteMany({
      //             where: {
      //               sku: optionData.sku_ref,
      //             },
      //           });
      //           for (let x = 0; x <= optionData.attr_value_id.length; x++) {
      //             if (optionData.attr_value_id[x]) {
      //               const attrId = optionData.attr_value_id[x];
      //               await this.prisma.productOption.create({
      //                 data: {
      //                   product_attr_value_id: attrId,
      //                   sku: optionData.sku_ref,
      //                 },
      //               });
      //             }
      //           }
      //         }
      //       }

      //       if (optionData.sku) {
      //         await this.prisma.skuProduct.update({
      //           data: {
      //             ...optionData.sku,
      //           },
      //           where: {
      //             sku: optionData.sku_ref,
      //           },
      //         });
      //       }
      //     }
      //   }
      // }

      const newProduct = await this.prisma.product.findUnique({
        where: {
          id: isProduct.id,
        },
        include: {
          brand: true,
          media: true,
          sku: {
            include: {
              product_option: {
                include: {
                  product_attr_value: true,
                },
              },
            },
          },
          translate: true,
        },
      });
      return newProduct;
    });
  }

  async deleteProduct(slug: string) {
    return await this.prisma.$transaction(async (tx) => {
      const isProduct = await tx.product.findUnique({ where: { slug } });

      if (!isProduct) return false;

      // Delete Product Options
      const isProductOption = await tx.productOption.findMany({
        where: { sku_product: { product_id: isProduct.id } },
      });
      if (isProductOption.length) {
        await tx.productOption.deleteMany({
          where: { sku_product: { product_id: isProduct.id } },
        });
      }

      // Delete Product SKU
      const isSku = await tx.skuProduct.findMany({
        where: { product_id: isProduct.id },
      });
      if (isSku.length) {
        await tx.skuProduct.deleteMany({
          where: { product_id: isProduct.id },
        });
      }

      // Delete Product Translations
      const isTranslate = await tx.productTranslate.findMany({
        where: {
          productId: isProduct.id,
        },
      });
      if (isTranslate.length) {
        await tx.productTranslate.deleteMany({
          where: {
            productId: isProduct.id,
          },
        });
      }

      // Delete Product Media
      const isMedia = await tx.productMedia.findMany({
        where: { productId: isProduct.id },
      });
      if (isMedia.length) {
        await tx.productMedia.deleteMany({
          where: { productId: isProduct.id },
        });
      }

      // Finally, delete the product
      await tx.product.delete({
        where: { id: isProduct.id },
      });

      return true;
    });
  }

  async publishProduct() {
    const newProduct = await this.prisma.product.findUnique({
      where: { slug: 'cropped-wool-blend-coat' },
    });

    const skuProduct = await this.prisma.skuProduct.findMany({
      where: { product_id: newProduct.id },
    });

    await this.amqp.channelWrapper.publish(
      'catalog_exchange',
      'catalog.created',
      JSON.stringify(skuProduct),
    );
  }
}
