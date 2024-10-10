/*
  Warnings:

  - Added the required column `category_id` to the `Bloglivet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `Blogt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bloglivet" ADD COLUMN     "category_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Blogt" ADD COLUMN     "category_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Blogt" ADD CONSTRAINT "Blogt_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bloglivet" ADD CONSTRAINT "Bloglivet_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
