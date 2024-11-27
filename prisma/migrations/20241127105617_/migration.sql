/*
  Warnings:

  - You are about to drop the column `cloudinary_public_ids` on the `answers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "answers" DROP COLUMN "cloudinary_public_ids",
ADD COLUMN     "path" TEXT;
