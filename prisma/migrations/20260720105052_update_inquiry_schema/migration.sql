/*
  Warnings:

  - You are about to drop the column `email` on the `Inquiry` table. All the data in the column will be lost.
  - Added the required column `contact` to the `Inquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactType` to the `Inquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variant` to the `Inquiry` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Inquiry_email_idx` ON `Inquiry`;

-- AlterTable
ALTER TABLE `Inquiry` DROP COLUMN `email`,
    ADD COLUMN `contact` VARCHAR(191) NOT NULL,
    ADD COLUMN `contactType` VARCHAR(191) NOT NULL,
    ADD COLUMN `qty` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `size` VARCHAR(191) NULL,
    ADD COLUMN `variant` VARCHAR(191) NOT NULL;
