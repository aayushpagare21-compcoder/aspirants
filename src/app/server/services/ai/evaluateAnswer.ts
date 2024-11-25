import { ChatPromptTemplate } from "@langchain/core/prompts";
import { HumanMessage } from "@langchain/core/messages";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { z } from "zod";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  maxOutputTokens: 2048,
  apiKey: process.env.GEMINI_API_KEY,
  topP: 1,
});

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mistakesAndCorrections: z
      .array(
        z.object({
          mistake: z.string(),
          correction: z.string(),
        }),
      )
      .describe(
        "An array of objects, each describing a mistake in the answer and its corresponding correction.",
      )
      .nullable()
      .optional(),
    goodParts: z
      .array(
        z.object({
          goodPart: z.string(),
          appreciation: z.string().optional().nullable(),
        }),
      )
      .describe(
        "An array of objects, each highlighting a good aspect of the answer and optionally providing appreciation for diagrams or flowcharts.",
      )
      .nullable()
      .optional(),
    score: z
      .number()
      .max(15)
      .min(0)
      .describe(
        "The total score out of 15, in the format 'X / 15'. This is required.",
      ),
    modelAnswer: z
      .string()
      .describe(
        "A corrected version of the answer that satisfies the evaluation criteria.",
      ),
  }),
);

export async function evaluateAnswer(question: string, imageUrls: string[]) {
  const evaluationRubric = `
    Role and Task: You are an experienced UPSC Mains evaluator. 
    Your task is to assess a candidate's written answer to the provided question.
    Use the given evaluation rubric to assign scores for each criterion, based on the quality of the response.

    Instructions for Evaluation:
    STEP 1:  Carefully read the question and extract the answer's text from the provided images.
    STEP 2:  If the answer is shorter than 10 words or completely unrelated to the question give zero marks
    STEP 3:  For valid answers, evaluate the response against each of the five criteria in the rubric. 
    
    Evaluation Rubric:

    Criteria 1: Directive Compliance:
      Excellent (2/2): Fully respects the directive with balanced and logical analysis, supported by evidence.
      Good (1/2): Covers most aspects but lacks depth or balance.   
      Poor (0/2): Basic understanding with major deviations or irrelevant content.
    Criteria 2: Coverage of Question Parts:
      Excellent (2/2): Comprehensive exploration of all parts with relevant details and examples.
      Good (1/2): Covers most parts but lacks depth in one or more areas.
      Poor (0/2): Significant parts missing or irrelevant content.
    Criteria 3: Structure and Organization:
      Excellent (2/2): Clear introduction, coherent body, and effective conclusion.
      Good (1/2): Adequate structure but minor issues in flow or coherence.
      Poor (0/2): Disorganized with missing or irrelevant sections.
    Criteria 4: Language Proficiency:
      Excellent (2/2): Formal, clear, varied sentence structures, and precise vocabulary.
      Good (1/2): Adequate vocabulary with minor lapses in clarity.
      Poor (0/2): Informal, unclear, or frequent grammatical errors.
    Criteria 5: Use of Examples:
    Excellent (2/2): Relevant, diverse, and well-integrated examples that effectively support the analysis.
    Good (1/2): Examples provided but limited in relevance, diversity, or integration with the analysis.
    Poor (0/2): No examples or irrelevant examples that do not support the analysis.  
  Output Format: Please follow these formatting instructions for the output:
  ${parser.getFormatInstructions()}
  Question to Evaluate: ${question}`;

  // Create message content with the evaluation rubric and image URLs
  const messageContent = [
    { type: "text", text: evaluationRubric },
    ...imageUrls.map((url, index) => ({
      type: "image_url",
      image_url: { url, id: `image-${index}` },
    })),
  ];

  const messages = [
    new HumanMessage({
      content: JSON.stringify(messageContent),
    }),
  ];
  const chain = ChatPromptTemplate.fromMessages(messages)
    .pipe(model)
    .pipe(parser);

  const evaluation = await chain.invoke({});
  return evaluation;
}
