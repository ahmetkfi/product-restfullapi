/*
  Warnings:

  - You are about to drop the column `category_type` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `Category` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_product_id_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "category_type",
DROP COLUMN "product_id";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
