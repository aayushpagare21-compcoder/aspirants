import { evaluateAnswer } from "@/app/server/services/ai/evaluateAnswer";
import { cloudinaryUpload } from "@/app/server/services/integrations/cloudinary.service";
import { NextResponse } from "next/server";
import cuid from "cuid";
import { createAnswer } from "@/app/server/services/answers.service";
import { auth } from "@/auth";
import { getUserByEmail } from "@/app/server/services/user.service";
export async function POST(req: Request) {
  try {
    const session = await auth();
    const userEmail = session?.user?.email;

    const user = await getUserByEmail(userEmail ?? "");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const form = await req.formData();
    const files = form.getAll("files");
    const questionId = form.get("questionId")?.toString();
    const question = form.get("question")?.toString();
    const answerId = cuid();
    const imagesToBeMerged = [];
    for (const file of files) {
      if (file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        imagesToBeMerged.push(buffer);
      }
    }
    const imageUrls = await Promise.all(
      imagesToBeMerged.map(async (image) => {
        const { secure_url } = await cloudinaryUpload(
          image,
          questionId
            ? `${process.env.NODE_ENV}/${questionId}/${answerId}`
            : `${process.env.NODE_ENV}`,
        );
        return secure_url;
      }),
    );
    if (questionId) {
      await createAnswer({
        cloudinaryPublicIds: imageUrls,
        questionId: questionId?.toString() ?? "",
        id: answerId,
        userId: user.id,
      });
    }
    const evaluation = await evaluateAnswer(question ?? "", imageUrls);

    return NextResponse.json({
      modelAnswer: evaluation.modelAnswer,
      score: evaluation.score,
      mistakesAndCorrections: evaluation.mistakesAndCorrections,
      goodParts: evaluation.goodParts,
    });
  } catch (error) {
    console.error("Error evaluating answer:", error);
    return NextResponse.json(
      { error: "Error evaluating answer" },
      { status: 500 },
    );
  }
}
