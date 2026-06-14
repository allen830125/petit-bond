/*
  Warnings:

  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - Added the required column `bracelet` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `necklace` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pair` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `series` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seriesName` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stones` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `price`,
    ADD COLUMN `bracelet` DOUBLE NOT NULL,
    ADD COLUMN `necklace` DOUBLE NOT NULL,
    ADD COLUMN `pair` DOUBLE NOT NULL,
    ADD COLUMN `series` VARCHAR(191) NOT NULL,
    ADD COLUMN `seriesName` VARCHAR(191) NOT NULL,
    ADD COLUMN `stones` JSON NOT NULL,
    ADD COLUMN `sub` VARCHAR(191) NOT NULL;
