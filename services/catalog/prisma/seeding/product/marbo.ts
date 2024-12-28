import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const marbo = async (favorAttr) => {
  const marboProduct = await prisma.product.create({
    data: {
      slug: 'marbo-9000-puff',
      price: 250,
      s_price: 230,
      rating: 4.5,
      brand: {
        create: {
          slug: 'marbo',
          title: 'Marbo',
          image_url: '',
        },
      },
      image_url:
        'https://nask-media.s3.ap-southeast-1.amazonaws.com/marbo-bar-9000-puffs.webp',
      subcat_attr: {
        connect: {
          slug: 'disposable-pod',
        },
      },
      translate: {
        create: [
          {
            locale: 'en',
            title: 'Marbo Bar 9000 puffs',
            description:
              '<title>Description</title><div><p>Marbo Bar 9000 Puffs is a disposable pod offering a modern and expansive vaping experience in the world of new generation e-cigarettes. With ample power to provide up to 9000 puffs, users will experience a variety of intense flavors accompanied by a smooth and consistent pulling experience. Its sleek and portable design makes Marbo Bar 9000 Puffs a perfect choice for those who value convenience and contemporary style.\n\nMarbo Bar 9000 Puffs Disposable Pod comes in a total of 15 flavors:<br/></p><ul><li>Watermelon</li><li>Grape Aloe</li><li>Blue ice</li><li>Peach</li><li>Grape</li><li>Apple Aloe</li><li>Sparkling Lemon</li><li>Strawberry</li><li>Orange Sour</li><li>Cola</li><li>Double Mint</li><li>Grape Lychee</li><li>Mixberry</li><li>Sour Gummy</li><li>Rainbow Candy</li></ul></div><title>Specification</title><div><p><ul><li>Size: 110 x 30 mm</li><li>Puff Count: 9000 puffs</li><li>E-liquid Capacity: 14ml</li><li>Nicotine: 30mg</li><li>Resistance: 1.0 ohm</li><li>Charging Type: TYPE-C</li></ul></p></div>',
            information:
              'Experience the Marbo Bar 9000 Puffs, a high-capacity disposable vape delivering 9000 puffs of rich flavor. Enjoy its sleek design, perfect for on-the-go vaping pleasure.',
          },
          {
            locale: 'th',
            title: 'Marbo Bar 9000 puffs',
            description:
              '<title>ข้อมูลเพิ่มเติม</title><div><p>Marbo Bar 9000 Puffs เป็นพอตใช้แล้วทิ้งนำเสนอประสบการณ์การใช้งานที่ยิ่งใหญ่และทันสมัยในโลกของบุหรี่ไฟฟ้ารุ่นใหม่ ด้วยกำลังไฟในตัวที่มากพอที่จะให้บริการได้ถึง 9000 จังหวะการดูด ผู้ใช้จะได้สัมผัสกับรสชาติที่หลากหลายและเข้มข้นที่มาพร้อมกับประสบการณ์การดึงดูดที่นุ่มนวลและสม่ำเสมอ ด้วยดีไซน์ที่สวยงามและคมชัดที่พกพาง่าย ทำให้ Marbo Bar 9000 Puffs เป็นเลือกที่สมบูรณ์แบบสำหรับคนรักความสะดวกสบายและสไตล์ที่ทันสมัย\n\n<br>Marbo Bar 9000 Puffs Disposable Pod มีมาด้วยกันทั้งหมด 15กลิ่น</p><br/><ul><li>Watermelon</li><li>Grape Aloe</li><li>Blue ice</li><li>Peach</li><li>Grape</li><li>Apple Aloe</li><li>Sparkling Lemon</li><li>Strawberry</li><li>Orange Sour</li><li>Cola</li><li>Double Mint</li><li>Grape Lychee</li><li>Mixberry</li><li>Sour Gummy</li><li>Rainbow Candy</li></ul></div><title>ข้อมูลจำเพาะ</title><div><p><ul><li>ขนาด: 110 x 30 mm</li><li>จำนวนสูบ: 9000 ครั้ง</li><li>บรรจุน้ำยา: 14ml</li><li>นิโคติน: 30mg</li><li>ค่าความต้านทาน: 1.0 ohm</li><li>รูปแบบการชาร์จ: TYPE-C</li></ul></p></div>',
            information:
              'พอตใช้แล้วทิ้ง Marbo Bar 9000 ปรับรูลมได้ รสชาติหลากหลายที่เข้มข้นและเสน่ห์ ด้วยดีไซน์ที่บางเบาและสวยงามเหมาะสำหรับการใช้งานสำหรับพกพา',
          },
        ],
      },
    },
  });

  const maboFlavor = [
    {
      value: 'Grape',
      product_attr_id: favorAttr.id,
    },
    {
      value: 'Peach',
      product_attr_id: favorAttr.id,
    },
    {
      value: 'Rainbow candy',
      product_attr_id: favorAttr.id,
    },
    {
      value: 'Grape Lychee',
      product_attr_id: favorAttr.id,
    },
    {
      value: 'Sour Gummy',
      product_attr_id: favorAttr.id,
    },
    {
      value: 'Orange Sour',
      product_attr_id: favorAttr.id,
    },
    {
      value: 'Sparking Lemon',
      product_attr_id: favorAttr.id,
    },
    {
      value: 'Watermelon',
      product_attr_id: favorAttr.id,
    },
    {
      value: 'Strawberry',
      product_attr_id: favorAttr.id,
    },
    {
      value: 'Cola',
      product_attr_id: favorAttr.id,
    },
  ];

  const maboSKU = [
    {
      product_id: marboProduct.id,
      sku: 'TCR-MBR-001',
      image_url:
        'https://nask-media.s3.ap-southeast-1.amazonaws.com/MarboBar-9K-Grape.webp',
      stock: 16,
    },
    {
      product_id: marboProduct.id,
      sku: 'TCR-MBR-002',
      image_url:
        'https://nask-media.s3.ap-southeast-1.amazonaws.com/MarboBar-9K-Peach.webp',
      stock: 5,
    },
    {
      product_id: marboProduct.id,
      sku: 'TCR-MBR-003',
      image_url:
        'https://nask-media.s3.ap-southeast-1.amazonaws.com/MarboBar-9K-RainbowCandy.webp',
      stock: 43,
    },
    {
      product_id: marboProduct.id,
      sku: 'TCR-MBR-004',
      image_url:
        'https://nask-media.s3.ap-southeast-1.amazonaws.com/MarboBar-9K-GrapeLychee.webp',
      stock: 76,
    },
    {
      product_id: marboProduct.id,
      sku: 'TCR-MBR-005',
      image_url:
        'https://nask-media.s3.ap-southeast-1.amazonaws.com/MarboBar-9K-SourGummy.webp',
      stock: 13,
    },
    {
      product_id: marboProduct.id,
      sku: 'TCR-MBR-006',
      image_url:
        'https://nask-media.s3.ap-southeast-1.amazonaws.com/MarboBar-9K-OrangeSour.webp',
      stock: 24,
    },
    {
      product_id: marboProduct.id,
      sku: 'TCR-MBR-007',
      image_url:
        'https://nask-media.s3.ap-southeast-1.amazonaws.com/MarboBar-9K-SparkingLemon.jpeg',
      stock: 33,
    },
    {
      product_id: marboProduct.id,
      sku: 'TCR-MBR-008',
      image_url:
        'https://nask-media.s3.ap-southeast-1.amazonaws.com/MarboBar-9K-Watermelon.webp',
      stock: 78,
    },
    {
      product_id: marboProduct.id,
      sku: 'TCR-MBR-009',
      image_url:
        'https://nask-media.s3.ap-southeast-1.amazonaws.com/MarboBar-9K-Stawberry.webp',
      stock: 3,
    },
    {
      product_id: marboProduct.id,
      sku: 'TCR-MBR-010',
      image_url:
        'https://nask-media.s3.ap-southeast-1.amazonaws.com/MarboBar-9K-Cola.webp',
      stock: 11,
    },
  ];

  for (let i = 0; i < maboSKU.length; i++) {
    const attrValue = await prisma.productAttributeValue.create({
      data: maboFlavor[i],
    });

    const skuPrd = await prisma.skuProduct.create({
      data: maboSKU[i],
    });

    await prisma.productOption.create({
      data: {
        product_attr_value_id: attrValue.id,
        sku_id: skuPrd.id,
      },
    });
  }
};

export default marbo;
