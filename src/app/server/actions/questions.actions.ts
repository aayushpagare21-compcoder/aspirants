"use server";

import { getAllPublishedQuestionsWithEverything } from "../services/questions.service";

export async function getQuestions(params?: {
  questionsLimit?: number;
  questionsOffset?: number;
}) {
  const questions = await getAllPublishedQuestionsWithEverything({
    limit: params?.questionsLimit,
    offset: params?.questionsOffset,
  });

  return questions;
}
