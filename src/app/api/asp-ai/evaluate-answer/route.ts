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
import { ErrorCodes } from "@/app/lib/constants";
import RatelimitService from "@/app/server/services/integrations/rateLimitig.service";

const s3 = S3Service.getInstance(process.env.AWS_S3_BUCKET_NAME!);
const textExtract = TextractService.getInstance(
  process.env.AWS_S3_BUCKET_NAME!,
);
const rl = RatelimitService.getInstance().getRatelimit();

export const maxDuration = 60;
export const config = {
  api: {
    bodyParser: false,
  },
};


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

    if (process.env.RATE_LIMIT_DISABLED !== "true") {
      // Rate limiting
      //apiPath:keyPerfix:key
      const rateLimitCheck = await rl.limit(
        `/asp-ai/evaluate-answer:userId:${user.id}`,
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
    }

    // Get the form data
    const form = await req.formData();
    const answerPDF = form.get("answer");
    // if this is our question
    const questionId = form.get("questionId")?.toString();
    const question = form.get("question")?.toString();

    // Validate the form data
    if (!validateEvaluateAnswerAPIFormData(answerPDF, question)) {
      return NextResponse.json(
        {
          error: "Invalid form data, requires both question and answerPDF",
          errorCode: ErrorCodes.BAD_REQUEST,
        },
        { status: 400 },
      );
    }

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
      modelAnswer: evaluation.modelAnswer,
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
