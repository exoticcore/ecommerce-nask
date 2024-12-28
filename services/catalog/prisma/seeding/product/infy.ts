import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const infy = async (favorAttr) => {
  const infyProduct = await prisma.product.create({
    data: {
      slug: 'infy-6000-puffs',
      price: 299,
      s_price: 249,
      rating: 4.5,
      brand: {
        create: {
          slug: 'infy',
          title: 'Infy',
          image_url: '',
        },
      },
      image_url: 'https://nask-media.s3.ap-southeast-1.amazonaws.com/infy.jpeg',
      subcat_attr: {
        connect: {
          slug: 'disposable-pod',
        },
      },
      translate: {
        create: [
          {
            locale: 'en',
            title: 'Infy 6000 puffs',
            description:
              '<title>Description</title><div><p>Marbo Bar 9000 Puffs is a disposable pod offering a modern and expansive vaping experience in the world of new generation e-cigarettes. With ample power to provide up to 9000 puffs, users will experience a variety of intense flavors accompanied by a smooth and consistent pulling experience. Its sleek and portable design makes Marbo Bar 9000 Puffs a perfect choice for those who value convenience and contemporary style.\n\nMarbo Bar 9000 Puffs Disposable Pod comes in a total of 15 flavors:<br/></p><ul><li>Watermelon</li><li>Grape Aloe</li><li>Blue ice</li><li>Peach</li><li>Grape</li><li>Apple Aloe</li><li>Sparkling Lemon</li><li>Strawberry</li><li>Orange Sour</li><li>Cola</li><li>Double Mint</li><li>Grape Lychee</li><li>Mixberry</li><li>Sour Gummy</li><li>Rainbow Candy</li></ul></div><title>Specification</title><div><p><ul><li>Size: 110 x 30 mm</li><li>Puff Count: 9000 puffs</li><li>E-liquid Capacity: 14ml</li><li>Nicotine: 30mg</li><li>Resistance: 1.0 ohm</li><li>Charging Type: TYPE-C</li></ul></p></div>',
            information:
              'Experience the Marbo Bar 9000 Puffs, a high-capacity disposable vape delivering 9000 puffs of rich flavor. Enjoy its sleek design, perfect for on-the-go vaping pleasure.',
          },
          {
            locale: 'th',
            title: 'Infy 6000 puffs',
            description:
              '<title>ข้อมูลเพิ่มเติม</title><div><>Marbo Bar 9000 Puffs เป็นพอตใช้แล้วทิ้งนำเสนอประสบการณ์การใช้งานที่ยิ่งใหญ่และทันสมัยในโลกของบุหรี่ไฟฟ้ารุ่นใหม่ ด้วยกำลังไฟในตัวที่มากพอที่จะให้บริการได้ถึง 9000 จังหวะการดูด ผู้ใช้จะได้สัมผัสกับรสชาติที่หลากหลายและเข้มข้นที่มาพร้อมกับประสบการณ์การดึงดูดที่นุ่มนวลและสม่ำเสมอ ด้วยดีไซน์ที่สวยงามและคมชัดที่พกพาง่าย ทำให้ Marbo Bar 9000 Puffs เป็นเลือกที่สมบูรณ์แบบสำหรับคนรักความสะดวกสบายและสไตล์ที่ทันสมัย\n\n<br>Marbo Bar 9000 Puffs Disposable Pod มีมาด้วยกันทั้งหมด 15กลิ่น</p></div>',
            information:
              'Infy Pod 6000 puffs พอตอินฟี้ พอตใช้แล้วทิ้งมาใหม่ล่าสุด ราคาถูก รีวิวเยอะ ได้ดีไซน์รูปทรงแปลกใหม่ โดยจะมีทรงอ้วนจับกระชับมือ ให้ปริมาณน้ำยาสูงถึง 15 ml สามารถสูบได้สูงสุดถึง 6000 คำ อีกทั้งยังสามารถชาร์จไฟได้ พกพาสะดวก',
          },
        ],
      },
    },
  });

  await prisma.productMedia.create({
    data: {
      image_url:
        'https://nask-media.s3.ap-southeast-1.amazonaws.com/INFY-6000_1.jpg',
      productId: infyProduct.id,
    },
  });

  const infyFlavor = [
    {
      value: 'Strawberry ice cream',
      product_attr_id: favorAttr.id,
    },
    {
      value: 'Grape apple',
      product_attr_id: favorAttr.id,
    },
    {
      value: 'Lemon soda',
      product_attr_id: favorAttr.id,
    },
  ];

  const infySKU = [
    {
      product_id: infyProduct.id,
      sku: 'TCR-INF-001',
      image_url:
        'https://nask-media.s3.ap-southeast-1.amazonaws.com/INFY-6K-Strawberry-Ice-Cream.jpg',
      stock: 16,
    },
    {
      product_id: infyProduct.id,
      sku: 'TCR-INF-002',
      image_url:
        'https://nask-media.s3.ap-southeast-1.amazonaws.com/INFY-6K-Lemon-Soda.jpg',
      stock: 5,
    },
    {
      product_id: infyProduct.id,
      sku: 'TCR-INF-003',
      image_url:
        'https://nask-media.s3.ap-southeast-1.amazonaws.com/INFY-6K-Grape-Apple.jpg',
      stock: 43,
    },
  ];

  for (let i = 0; i < infySKU.length; i++) {
    const attrValue = await prisma.productAttributeValue.create({
      data: infyFlavor[i],
    });

    const skuPrd = await prisma.skuProduct.create({
      data: infySKU[i],
    });

    await prisma.productOption.create({
      data: {
        product_attr_value_id: attrValue.id,
        sku_id: skuPrd.id,
      },
    });
  }
};

export default infy;
