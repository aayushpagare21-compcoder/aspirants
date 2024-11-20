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

async function questionsFullTextSearch(websearchQuery: string) {
  const foundQuestions = await prisma.$queryRaw<{ id: string; rank: number }[]>`
  SELECT 
    q.id,
    ts_rank(
      to_tsvector('english', 
        q.text || ' ' || 
        q.paper || ' ' || 
        t.name || ' ' || 
        DATE_PART('year', q.asked_date)::text || ' ' || 
        q.words
      ),
      websearch_to_tsquery('english', ${websearchQuery})
    ) as rank
  FROM 
    "questions" q
  LEFT JOIN 
    "_QuestionToTopics" qt ON q.id = qt."A"
  LEFT JOIN 
    "topics" t ON t.id = qt."B"
  WHERE 
    to_tsvector('english', 
      q.text || ' ' || 
      q.paper || ' ' || 
      t.name || ' ' || 
      DATE_PART('year', q.asked_date)::text || ' ' || 
      q.words
    ) @@ websearch_to_tsquery('english', ${websearchQuery})
  ORDER BY 
    rank DESC;
`;
  return foundQuestions.map((q) => q.id);
}

export async function getAllPublishedQuestionsWithEverything({
  limit,
  offset,
  answerOffset,
  answerLimit,
  paper,
  topic,
  year,
  textToSearch,
}: {
  limit?: number;
  offset?: number;
  answerOffset?: number;
  answerLimit?: number;
  paper?: Papers;
  topic?: string;
  year?: number;
  textToSearch?: string;
}): Promise<QuestionsWithEverything[]> {
  let questionIds = null;
  if (textToSearch) {
    questionIds = await questionsFullTextSearch(textToSearch);
  }

  const questions = await prisma.question.findMany({
    take: limit ?? DEFAULT_QUESTIONS_FETCH_COUNT,
    skip: offset ?? DEFAULT_QUESTIONS_OFFSET,
    where: {
      ...(questionIds && { id: { in: questionIds } }),
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
