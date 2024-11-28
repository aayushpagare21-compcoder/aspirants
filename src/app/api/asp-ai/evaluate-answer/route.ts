import { NextResponse } from "next/server";
import cuid from "cuid";
import { createAnswer } from "@/app/server/services/answers.service";
import { auth } from "@/auth";
import { getUserByEmail } from "@/app/server/services/user.service";
import { S3Service } from "@/app/server/services/integrations/s3.service";
import { ContentType } from "@/app/lib/types/utils.types";
import { TextractService } from "@/app/server/services/integrations/texextract.service";
import { evaluateAnswer } from "@/app/server/services/ai/evaluateAnswer";

const s3 = new S3Service(process.env.AWS_S3_BUCKET_NAME!);
const textExtract = new TextractService(process.env.AWS_S3_BUCKET_NAME!);

export const maxDuration = 60 

async function validate(
  answerPDF: FormDataEntryValue | null,
  question?: string,
) {
  const session = await auth();
  const userEmail = session?.user?.email;
  const user = await getUserByEmail(userEmail ?? "");

  if (!user) {
    throw new Error(`User with email ${userEmail} not found`);
  }
  if (!answerPDF) {
    throw new Error("No answer PDF found.");
  }

  if (!question) {
    throw new Error("No question found");
  }
  return user.id;
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const answerPDF = form.get("answer");
    // if this is our question
    const questionId = form.get("questionId")?.toString();
    const question = form.get("question")?.toString();

    const userId = await validate(answerPDF, question);

    const answerId = cuid();
    const s3Key = questionId
      ? `${process.env.NODE_ENV}/${questionId}/${answerId}.pdf`
      : `${process.env.NODE_ENV}/random-user-uploads/${answerId}.pdf`;

    const answerFile = answerPDF as File;
    await s3.uploadFile(
      s3Key,
      Buffer.from(await answerFile.arrayBuffer()),
      ContentType.PDF,
    );
    const extractedAnswer = await textExtract.extractTextFromS3PDF(s3Key);

    const evaluation = await evaluateAnswer(question!, extractedAnswer);

    await createAnswer({
      s3Key,
      id: answerId,
      userId: userId!,
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
