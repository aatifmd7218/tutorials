/*
  Warnings:

  - Made the column `authorName` on table `Usert` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Usert" ALTER COLUMN "authorName" SET NOT NULL;
