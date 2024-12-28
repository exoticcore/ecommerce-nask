/*
  Warnings:

  - You are about to drop the column `sku` on the `ProductOption` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `SKUMedia` table. All the data in the column will be lost.
  - The primary key for the `SkuProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[sku]` on the table `SkuProduct` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sku_id` to the `ProductOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku_id` to the `SKUMedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `SkuProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ProductOption` DROP FOREIGN KEY `ProductOption_sku_fkey`;

-- DropForeignKey
ALTER TABLE `SKUMedia` DROP FOREIGN KEY `SKUMedia_sku_fkey`;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `visibility` VARCHAR(191) NOT NULL DEFAULT 'public';

-- AlterTable
ALTER TABLE `ProductOption` DROP COLUMN `sku`,
    ADD COLUMN `sku_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `SKUMedia` DROP COLUMN `sku`,
    ADD COLUMN `sku_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `SkuProduct` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `is_stock` BOOLEAN NULL DEFAULT true,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `SkuProduct_sku_key` ON `SkuProduct`(`sku`);

-- AddForeignKey
ALTER TABLE `SKUMedia` ADD CONSTRAINT `SKUMedia_sku_id_fkey` FOREIGN KEY (`sku_id`) REFERENCES `SkuProduct`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOption` ADD CONSTRAINT `ProductOption_sku_id_fkey` FOREIGN KEY (`sku_id`) REFERENCES `SkuProduct`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
