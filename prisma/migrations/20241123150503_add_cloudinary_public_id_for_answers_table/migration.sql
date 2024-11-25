/*
  Warnings:

  - You are about to drop the column `markdown_text` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `answers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "answers" DROP COLUMN "markdown_text",
DROP COLUMN "published",
DROP COLUMN "text",
ADD COLUMN     "cloudinary_public_ids" TEXT[];
