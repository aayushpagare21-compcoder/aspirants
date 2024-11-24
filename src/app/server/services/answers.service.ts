import { prisma } from "../db/prisma";

export async function createAnswer({
  id,
  cloudinaryPublicIds,
  questionId,
  userId,
}: {
  id?: string;
  cloudinaryPublicIds: string[];
  questionId: string;
  userId: string;
}) {
  const answer = await prisma.answer.create({
    data: {
      id,
      cloudinaryPublicIds,
      questionId,
      userId,
    },
  });
  return answer;
}

export async function updateAnswer({evaluationJSON, answerId}: {evaluationJSON: string, answerId: string}) { 
  return prisma.answer.update({ 
    where: {
      id: answerId,
    },
    data: { 
      evaluations: { 
        create: { 
          evaluationJSON
        },
      }
    }
  })
}
