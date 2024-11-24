import { evaluateAnswer } from "@/app/server/services/ai/evaluateAnswer";
import { cloudinaryUpload } from "@/app/server/services/integrations/cloudinary.service";
import { NextResponse } from "next/server";
import cuid from "cuid";
import { createAnswer, updateAnswer } from "@/app/server/services/answers.service";
import { auth } from "@/auth";
import { getUserByEmail } from "@/app/server/services/user.service";
export async function POST(req: Request) {
  try {
    // Check if the user is authenticated or not
    const session = await auth();
    const userEmail = session?.user?.email;

    const user = await getUserByEmail(userEmail ?? "");

    const form = await req.formData();
    const files = form.getAll("files");

    // if these is our question
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
          // for our question, we are going to crate a folde in cloudinary
          questionId
            ? `${process.env.NODE_ENV}/${questionId}/${answerId}`
            : `${process.env.NODE_ENV}`,
        );
        return secure_url;
      }),
    );

    // TODO: In the prisma transaction
    if (questionId && user?.id) {
      await createAnswer({
        cloudinaryPublicIds: imageUrls,
        questionId: questionId?.toString() ?? "",
        id: answerId,
        userId: user.id,
      });
    }
    const evaluation = await evaluateAnswer(question ?? "", imageUrls); 

   if(questionId && user?.id) {
    await updateAnswer({ 
      answerId,
      evaluationJSON: JSON.stringify(evaluation), 
    })
   }

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
