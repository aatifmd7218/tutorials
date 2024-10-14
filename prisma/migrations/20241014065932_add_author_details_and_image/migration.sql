/*
  Warnings:

  - Added the required column `authorDetail` to the `Usert` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usert" ADD COLUMN     "authorDetail" TEXT NOT NULL,
ADD COLUMN     "authorImage" TEXT;
