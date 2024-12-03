import { prisma } from "../utils/prisma";

export async function createAnswer({
  id,
  s3Key,
  questionId,
  userId,
  evaluationJSON,
}: {
  id?: string;
  s3Key: string;
  questionId?: string;
  userId: string;
  evaluationJSON: string;
}) {
  const answer = await prisma.answer.create({
    data: {
      id,
      path: s3Key,
      ...(questionId && { questionId }),
      userId,
      evaluations: {
        create: {
          evaluationJSON,
        },
      },
    },
  });
  return answer;
}
