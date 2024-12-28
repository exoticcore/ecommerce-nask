/*
  Warnings:

  - You are about to alter the column `cost` on the `ShippingMethod` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.

*/
-- AlterTable
ALTER TABLE `ShippingMethod` ADD COLUMN `image_url` VARCHAR(191) NULL,
    MODIFY `cost` DOUBLE NOT NULL;
