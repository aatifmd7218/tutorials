/*
  Warnings:

  - Made the column `authorname` on table `Bloglivet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bloglivet" ALTER COLUMN "authorname" SET NOT NULL;
