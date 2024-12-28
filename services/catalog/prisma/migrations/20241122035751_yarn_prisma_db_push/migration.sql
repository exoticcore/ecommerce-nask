/*
  Warnings:

  - You are about to drop the column `name` on the `ProductAttributeTransalte` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `SkuProduct` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ProductAttribute` table without a default value. This is not possible if the table is not empty.
  - Made the column `type` on table `ProductAttribute` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `title` to the `ProductAttributeTransalte` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `publish_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `s_price_end` DATETIME(3) NULL,
    ADD COLUMN `s_price_start` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `ProductAttribute` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    MODIFY `type` VARCHAR(191) NOT NULL DEFAULT 'text';

-- AlterTable
ALTER TABLE `ProductAttributeTransalte` DROP COLUMN `name`,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `SkuProduct` DROP COLUMN `discount`,
    ADD COLUMN `s_price` DECIMAL(10, 2) NULL,
    ADD COLUMN `s_price_end` DATETIME(3) NULL,
    ADD COLUMN `s_price_start` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `SKUMedia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image_url` VARCHAR(191) NOT NULL,
    `sku` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SKUMedia` ADD CONSTRAINT `SKUMedia_sku_fkey` FOREIGN KEY (`sku`) REFERENCES `SkuProduct`(`sku`) ON DELETE RESTRICT ON UPDATE CASCADE;
