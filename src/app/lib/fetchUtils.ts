import { NEXT_REVALIDATE_TOPICS_AFTER } from "./constants";
import { EvaluationResult } from "./types/ai.types";
import { Topics } from "./types/feed.types";

export const fetchAllTopics = async (): Promise<Topics[]> => {
  const resp = await fetch(`/api/topics`, {
    next: {
      revalidate: NEXT_REVALIDATE_TOPICS_AFTER,
    },
  });

  const topics = await resp.json();

  return topics;
};

export const evaluateAnswer = async (
  formData: FormData,
): Promise<EvaluationResult> => {
  const resp = await fetch(`/api/asp-ai/evaluate-answer`, {
    method: "POST",
    body: formData,
  });

  const evaluatedAnswer = await resp.json();

  return evaluatedAnswer;
};
