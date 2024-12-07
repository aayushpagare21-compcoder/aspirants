import { ErrorCodes } from "@/app/lib/constants";
import * as cheerio from "cheerio";
import { getVectorStore } from "../../utils/vectorStore";
import { getAllPublishedQuestionsWithEverything } from "../questions.service";
import _ from "lodash";
export async function findRelaventPYQsToArticle(url: string) {
  const content = await fetchAndExtractContentFromTheHinduArticle(url);

  if (content.length > 1000) {
    throw new Error(ErrorCodes.ARTICLE_TOO_LENGHTY);
  }

  const questions = await findRelaventQuestionsWithExtractedText(
    content.join(" "),
  );

  const questionIds = questions.map((question) => question.metadata.id);

  const fetchedQuestions = await getAllPublishedQuestionsWithEverything({
    ids: questionIds,
    disableOrdering: true,
  });

  return fetchedQuestions;
}

async function fetchAndExtractContentFromTheHinduArticle(url: string) {
  try {
    // Fetch the webpage content
    const response = await fetch(url);
    const html = await response.text();

    // Load the HTML content into cheerio for parsing
    const $ = cheerio.load(html);

    // Array to hold the extracted content
    const content: string[] = [];

    // Select and process elements in order
    $("h1.title, h2.sub-title, p, h4.sub_head")
      .not(
        "p.copyrights, p.related-topics-list, p.publish-time-new, div.comments-box > p, div.back-to-top > p",
      )
      .each((i, el) => {
        content.push($(el).text().replace(/\s+/g, " ").trim());
      });

    // Return the extracted content
    return content;
  } catch (error) {
    console.error("Error fetching or parsing the webpage:", error);
    return [];
  }
}

async function findRelaventQuestionsWithExtractedText(text: string) {
  // Initialize a NeonPostgres instance to store embedding vectors
  const vectorStore = await getVectorStore();
  const results = await vectorStore.similaritySearchWithScore(text);
  return _.orderBy(
    results.filter((result) => result[1] <= 0.4),
    (result) => result[1],
    ["asc"],
  ).map((result) => result[0]);
}
