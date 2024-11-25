import { evaluateAnswer } from "@/app/server/services/ai/evaluateAnswer";
import { cloudinaryUpload } from "@/app/server/services/integrations/cloudinary.service";
import { NextResponse } from "next/server";
import cuid from "cuid";
import { createAnswer } from "@/app/server/services/answers.service";
import { auth } from "@/auth";
import { getUserByEmail } from "@/app/server/services/user.service";
export async function POST(req: Request) {
  try {
    // Check if the user is authenticated or not
    const session = await auth();
    const userEmail = session?.user?.email;

    const user = await getUserByEmail(userEmail ?? "");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const form = await req.formData();
    const files = form.getAll("files");

    // if this is our question
    const questionId = form.get("questionId")?.toString();
    const question = form.get("question")?.toString();

    if (!question) {
      return NextResponse.json(
        { error: "Bad Request, Enter a question to get it evaluated." },
        { status: 400 },
      );
    }

    const answerId = cuid();
    const imagesToUpload = [];
    for (const file of files) {
      if (file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        imagesToUpload.push(buffer);
      }
    }
    const imageUrls = await Promise.all(
      imagesToUpload.map(async (image) => {
        const { secure_url } = await cloudinaryUpload(
          image,
          // for our question, we are going to create a folder in cloudinary
          questionId
            ? `${process.env.NODE_ENV}/${questionId}/${answerId}`
            : `${process.env.NODE_ENV}`,
        );
        return secure_url;
      }),
    );

    const evaluation = await evaluateAnswer(question, imageUrls);

    await createAnswer({
      cloudinaryPublicIds: imageUrls,
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
    return NextResponse.json(
      { error: "Error evaluating answer" },
      { status: 500 },
    );
  }
}
