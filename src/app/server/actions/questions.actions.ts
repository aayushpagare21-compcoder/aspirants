"use server";

import { Papers } from "@/app/lib/types/feed.types";
import { getAllPublishedQuestionsWithEverything } from "../services/questions.service";

export async function getQuestions(params?: {
  questionsLimit?: number;
  questionsOffset?: number;
  topic?: string;
  paper?: Papers;
  year?: number;
  textToSearch?: string;
}) {
  const questions = await getAllPublishedQuestionsWithEverything({
    limit: params?.questionsLimit,
    offset: params?.questionsOffset,
    paper: params?.paper,
    topic: params?.topic,
    year: params?.year,
    textToSearch: params?.textToSearch,
  });

  return questions;
}
