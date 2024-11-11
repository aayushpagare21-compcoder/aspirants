import {
  AnswersWithEverything,
  DEFAULT_QUESTIONS_FETCH_COUNT,
  Papers,
  QuestionsWithEverything,
} from "@/app/lib/types/feed.types";
import { prisma } from "../db/prisma";

const DEFAULT_ANSWER_LIMIT = 5;
const DEFAULT_QUESTIONS_OFFSET = 0;
const DEFAULT_ANSWER_OFFSET = 0;

export async function getAllPublishedQuestionsWithEverything({
  limit,
  offset,
  answerOffset,
  answerLimit,
  paper,
  topic,
  year,
}: {
  limit?: number;
  offset?: number;
  answerOffset?: number;
  answerLimit?: number;
  paper?: Papers;
  topic?: string;
  year?: number;
}): Promise<QuestionsWithEverything[]> {
  const questions = await prisma.question.findMany({
    take: limit ?? DEFAULT_QUESTIONS_FETCH_COUNT,
    skip: offset ?? DEFAULT_QUESTIONS_OFFSET,
    where: {
      published: true,
      ...(topic && {
        topics: {
          some: {
            name: topic,
          },
        },
      }),
      ...(paper && { paper }),
      ...(year && { year: year }),
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      topics: true,
      answers: {
        take: answerLimit ?? DEFAULT_ANSWER_LIMIT,
        skip: answerOffset ?? DEFAULT_ANSWER_OFFSET,
        where: {
          published: true,
        },
        include: {
          user: true,
          claps: true,
        },
      },
    },
  });

  return questions.map((question) => ({
    id: question.id,
    askedDate: question.askedDate ? question.askedDate.toISOString() : null,
    createdAt: question.createdAt,
    updatedAt: question.updatedAt,
    published: question.published,
    text: question.text,
    words: question.words,
    marks: question.marks,
    paper: question.paper ? Papers[question.paper] : null,
    topics: question.topics.map((t) => ({
      id: t.id,
      name: t.name,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    })),
    answers: question.answers.map((answer) => ({
      id: answer.id,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
      markdownText: answer.markdownText,
      published: answer.published,
      text: answer.text,
      claps: answer.claps.map((clap) => ({
        id: clap.id,
        userId: clap.userId,
      })),
      user: {
        id: answer.user.id,
        image: answer.user.image,
      },
    })) as AnswersWithEverything[],
  }));
}
