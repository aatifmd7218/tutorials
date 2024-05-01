/*
  Warnings:

  - Added the required column `featuredpost` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `featuredpost` to the `Bloglive` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "featuredpost" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Bloglive" ADD COLUMN     "featuredpost" TEXT NOT NULL;
