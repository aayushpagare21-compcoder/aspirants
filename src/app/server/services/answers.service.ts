import { prisma } from "../db/prisma";

export async function createAnswer({
  id,
  cloudinaryPublicIds,
  questionId,
  userId,
  evaluationJSON
}: {
  id?: string;
  cloudinaryPublicIds: string[];
  questionId?: string;
  userId: string;
  evaluationJSON: string
}) {
  const answer = await prisma.answer.create({
    data: {
      id,
      cloudinaryPublicIds,
      ...(questionId && {questionId}),
      userId,
      evaluations: { 
        create: { 
          evaluationJSON
        }
      }
    },
  });
  return answer;
}

