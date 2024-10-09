/*
  Warnings:

  - You are about to drop the column `delete_request` on the `Bloglivet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bloglivet" DROP COLUMN "delete_request";

-- AlterTable
ALTER TABLE "Blogt" ADD COLUMN     "scheduledAt" TIMESTAMP(3),
ALTER COLUMN "published" SET DEFAULT 'pending';
