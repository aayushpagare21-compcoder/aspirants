-- CreateEnum
CREATE TYPE "Papers" AS ENUM ('GS1', 'GS2', 'GS3', 'GS4', 'ESSAY', 'OPTIONAL');

-- CreateTable
CREATE TABLE "claps" (
    "id" TEXT NOT NULL,
    "answer_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "claps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topics" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answers" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "markdown_answer" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "paper" "Papers",
    "paper_date" TIMESTAMP(3),
    "words" INTEGER,
    "marks" INTEGER,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AnswerToTopics" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "claps_user_id_answer_id_key" ON "claps"("user_id", "answer_id");

-- CreateIndex
CREATE UNIQUE INDEX "topics_name_key" ON "topics"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AnswerToTopics_AB_unique" ON "_AnswerToTopics"("A", "B");

-- CreateIndex
CREATE INDEX "_AnswerToTopics_B_index" ON "_AnswerToTopics"("B");

-- AddForeignKey
ALTER TABLE "claps" ADD CONSTRAINT "claps_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claps" ADD CONSTRAINT "claps_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswerToTopics" ADD CONSTRAINT "_AnswerToTopics_A_fkey" FOREIGN KEY ("A") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswerToTopics" ADD CONSTRAINT "_AnswerToTopics_B_fkey" FOREIGN KEY ("B") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
