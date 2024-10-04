/*
  Warnings:

  - Added the required column `publishDate` to the `Bloglivet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bloglivet" ADD COLUMN     "publishDate" TIMESTAMP(3) NOT NULL;
