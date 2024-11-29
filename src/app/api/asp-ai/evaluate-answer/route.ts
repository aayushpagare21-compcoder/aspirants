import { NextResponse } from "next/server";
import cuid from "cuid";
import { createAnswer } from "@/app/server/services/answers.service";
import { S3Service } from "@/app/server/services/integrations/s3.service";
import { ContentType } from "@/app/lib/types/utils.types";
import { TextractService } from "@/app/server/services/integrations/texextract.service";
import { evaluateAnswer } from "@/app/server/services/ai/evaluateAnswer";
import { validateEvaluateAnswerAPIFormData } from "@/app/server/validators/asp-ai.validators";
import { getAuthenticatedUser } from "@/app/server/utils/getAuthUserDetails";
import { User } from "@prisma/client";
import { Duration, Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { ErrorCodes } from "@/app/lib/constants";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(
    parseInt(process.env.DEFAULT_API_TOKENS!),
    process.env.DEFAULT_API_TOKEN_FILLED_AFTER! as Duration,
  ),
});
const s3 = new S3Service(process.env.AWS_S3_BUCKET_NAME!);
const textExtract = new TextractService(process.env.AWS_S3_BUCKET_NAME!);

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    // Get the authenticated user
    let user: User;
    try {
      user = await getAuthenticatedUser();
    } catch (err: unknown) {
      console.error("Failed to get authenticated user:", err);
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Rate limiting
    //apiPath:keyPerfix:key
    const rateLimitCheck = await ratelimit.limit(
      `${process.env.NODE_ENV}:/asp-ai/evaluate-answer:userId:${user.id}`,
    );

    if (!rateLimitCheck.success) {
      return NextResponse.json(
        {
          errorCode: ErrorCodes.RATE_LIMIT_EXCEEDED,
          errorMessage: "Too many requests...",
        },
        { status: 429 },
      );
    }

    // Get the form data
    const form = await req.formData();
    const answerPDF = form.get("answer");
    // if this is our question
    const questionId = form.get("questionId")?.toString();
    const question = form.get("question")?.toString();

    // Validate the form data
    await validateEvaluateAnswerAPIFormData(answerPDF, question);

    const answerId = cuid();
    const s3Key = questionId
      ? `${process.env.NODE_ENV}/${questionId}/${answerId}.pdf`
      : `${process.env.NODE_ENV}/random-user-uploads/${answerId}.pdf`;

    // Upload the file in the S3 bucket.
    const answerFile = answerPDF as File;
    await s3.uploadFile(
      s3Key,
      Buffer.from(await answerFile.arrayBuffer()),
      ContentType.PDF,
    );
    // Extract the text using OCR (AWS TESSERACT)
    const extractedAnswer = await textExtract.extractTextFromS3PDF(s3Key);

    // Evaluate the answer using the GEMINI AI
    const evaluation = await evaluateAnswer(question!, extractedAnswer);

    // Create the answer record in the database.
    await createAnswer({
      s3Key,
      id: answerId,
      userId: user.id,
      questionId: questionId,
      evaluationJSON: JSON.stringify(evaluation),
    });

    return NextResponse.json({
      modelAnswer: evaluation.modelAnswer.replace,
      score: evaluation.score,
      mistakesAndCorrections: evaluation.mistakesAndCorrections,
      goodParts: evaluation.goodParts,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err: unknown) {
    console.error("Error evaluating answer", err);
    return NextResponse.json(
      { error: "Error evaluating answer" },
      { status: 500 },
    );
  }
}
