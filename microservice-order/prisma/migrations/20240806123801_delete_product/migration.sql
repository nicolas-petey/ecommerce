/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductOnOrder" DROP CONSTRAINT "ProductOnOrder_idProduct_fkey";

-- DropTable
DROP TABLE "Product";
