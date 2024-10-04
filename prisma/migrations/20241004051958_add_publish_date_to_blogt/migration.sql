/*
  Warnings:

  - Added the required column `publishDate` to the `Blogt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blogt" ADD COLUMN     "publishDate" TIMESTAMP(3) NOT NULL;
