-- CreateTable
CREATE TABLE `Brand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `image_url` VARCHAR(191) NULL,

    UNIQUE INDEX `Brand_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(191) NULL,

    UNIQUE INDEX `Category_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoryTranslate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `locale` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `cat_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `cat_id` INTEGER NOT NULL,

    UNIQUE INDEX `SubCategory_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubCategoryTranslate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `locale` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `subcat_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubCategoryAttribute` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `subcat_id` INTEGER NULL,

    UNIQUE INDEX `SubCategoryAttribute_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubCategoryAttributeTranslate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `locale` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `subcat_attr_id` INTEGER NOT NULL,

    UNIQUE INDEX `SubCategoryAttributeTranslate_locale_subcat_attr_id_key`(`locale`, `subcat_attr_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `s_price` DECIMAL(10, 2) NULL,
    `discount` DECIMAL(10, 2) NULL,
    `rating` DECIMAL(2, 1) NULL,
    `image_url` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `brand_id` INTEGER NULL,
    `subcat_attr_id` INTEGER NOT NULL,

    UNIQUE INDEX `Product_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductTranslate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `locale` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `information` TEXT NULL,
    `description` TEXT NULL,
    `productId` INTEGER NOT NULL,

    UNIQUE INDEX `ProductTranslate_locale_productId_key`(`locale`, `productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WholesaleProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `from` INTEGER NOT NULL,
    `to` INTEGER NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `product_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SkuProduct` (
    `sku` VARCHAR(191) NOT NULL,
    `stock` INTEGER NULL,
    `price` DECIMAL(10, 2) NULL,
    `discount` DECIMAL(10, 2) NULL,
    `is_primary` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `image_url` VARCHAR(191) NULL,
    `product_id` INTEGER NOT NULL,

    PRIMARY KEY (`sku`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductMedia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image_url` VARCHAR(191) NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductAttribute` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductAttributeTransalte` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `locale` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `product_attr_id` INTEGER NOT NULL,

    UNIQUE INDEX `ProductAttributeTransalte_locale_product_attr_id_key`(`locale`, `product_attr_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductAttributeValue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(191) NOT NULL,
    `more` VARCHAR(191) NULL,
    `product_attr_id` INTEGER NOT NULL,

    UNIQUE INDEX `ProductAttributeValue_value_product_attr_id_key`(`value`, `product_attr_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductOption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_attr_value_id` INTEGER NOT NULL,
    `sku` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CategoryTranslate` ADD CONSTRAINT `CategoryTranslate_cat_id_fkey` FOREIGN KEY (`cat_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategory` ADD CONSTRAINT `SubCategory_cat_id_fkey` FOREIGN KEY (`cat_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategoryTranslate` ADD CONSTRAINT `SubCategoryTranslate_subcat_id_fkey` FOREIGN KEY (`subcat_id`) REFERENCES `SubCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategoryAttribute` ADD CONSTRAINT `SubCategoryAttribute_subcat_id_fkey` FOREIGN KEY (`subcat_id`) REFERENCES `SubCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategoryAttributeTranslate` ADD CONSTRAINT `SubCategoryAttributeTranslate_subcat_attr_id_fkey` FOREIGN KEY (`subcat_attr_id`) REFERENCES `SubCategoryAttribute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_brand_id_fkey` FOREIGN KEY (`brand_id`) REFERENCES `Brand`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_subcat_attr_id_fkey` FOREIGN KEY (`subcat_attr_id`) REFERENCES `SubCategoryAttribute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductTranslate` ADD CONSTRAINT `ProductTranslate_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WholesaleProduct` ADD CONSTRAINT `WholesaleProduct_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkuProduct` ADD CONSTRAINT `SkuProduct_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductMedia` ADD CONSTRAINT `ProductMedia_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductAttributeTransalte` ADD CONSTRAINT `ProductAttributeTransalte_product_attr_id_fkey` FOREIGN KEY (`product_attr_id`) REFERENCES `ProductAttribute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductAttributeValue` ADD CONSTRAINT `ProductAttributeValue_product_attr_id_fkey` FOREIGN KEY (`product_attr_id`) REFERENCES `ProductAttribute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOption` ADD CONSTRAINT `ProductOption_product_attr_value_id_fkey` FOREIGN KEY (`product_attr_value_id`) REFERENCES `ProductAttributeValue`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOption` ADD CONSTRAINT `ProductOption_sku_fkey` FOREIGN KEY (`sku`) REFERENCES `SkuProduct`(`sku`) ON DELETE RESTRICT ON UPDATE CASCADE;
