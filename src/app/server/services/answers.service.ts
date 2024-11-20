import { prisma } from "../db/prisma";

export async function createAnswer({
  cloudinaryPublicId,
  questionId,
  userId,
}: {
  cloudinaryPublicId: string;
  questionId: string;
  userId: string;
}) {
  const answer = await prisma.answer.create({
    data: {
      cloudinaryPublicId,
      questionId,
      userId,
    },
  });
  return answer;
}
