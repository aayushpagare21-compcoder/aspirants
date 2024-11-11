import { NEXT_REVALIDATE_TOPICS_AFTER } from "./constants";
import { Topics } from "./types/feed.types";

const baseUrl = `${process.env.NEXT_BASE_URL}/api`;
export const fetchAllTopics = async (): Promise<Topics[]> => {
  const resp = await fetch(`${baseUrl}/topics`, {
    next: {
      revalidate: NEXT_REVALIDATE_TOPICS_AFTER,
    },
  });

  const topics = await resp.json();

  return topics;
};
