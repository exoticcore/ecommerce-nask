import { PrismaClient } from '@prisma/client';
import marbo from './product/marbo';
import infy from './product/infy';
const prisma = new PrismaClient();

async function seeding() {
  try {
    const favorAttr = await prisma.productAttribute.create({
      data: {
        name: 'flavor',
        translate: {
          create: [
            {
              locale: 'th',
              title: 'Flavor',
            },
            {
              locale: 'en',
              title: 'Flavor',
            },
          ],
        },
      },
    });

    await prisma.subCategoryAttribute.create({
      data: {
        slug: 'pod',
        translate: {
          create: [
            {
              locale: 'en',
              name: 'Pod System',
            },
            {
              locale: 'th',
              name: 'เครื่องพอต',
            },
          ],
        },
      },
    });

    await prisma.subCategoryAttribute.create({
      data: {
        slug: 'flavor-pod',
        translate: {
          create: [
            {
              locale: 'en',
              name: 'Flavor Pod',
            },
            {
              locale: 'th',
              name: 'หัวพอต',
            },
          ],
        },
      },
    });

    await prisma.subCategoryAttribute.create({
      data: {
        slug: 'disposable-pod',
        translate: {
          create: [
            {
              locale: 'th',
              name: 'พอดใช้แล้วทิ้ง',
            },
            {
              locale: 'en',
              name: 'Disposable Pod',
            },
          ],
        },
      },
    });

    await prisma.subCategoryAttribute.create({
      data: {
        slug: 'accessories',
        translate: {
          create: [
            {
              locale: 'en',
              name: 'Accessories',
            },
            {
              locale: 'th',
              name: 'อุปกรณ์เสริมพอต',
            },
          ],
        },
      },
    });

    await marbo(favorAttr);
    await infy(favorAttr);
  } catch (err) {
    console.log(err);
  }
}

seeding();
