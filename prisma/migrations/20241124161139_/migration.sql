-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_user_id_fkey";

-- AlterTable
ALTER TABLE "answers" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
