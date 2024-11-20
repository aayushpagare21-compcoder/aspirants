import { createAnswer } from "@/app/server/services/answers.service";
import { cloudinaryUpload } from "@/app/server/services/cloudinary.service";
import { mergeImagesVertically } from "@/app/server/services/images.service";
import { getUserByEmail } from "@/app/server/services/user.service";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const session = await auth();
    const user = await getUserByEmail(session?.user?.email ?? "");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const form = await req.formData();
    const files = form.getAll("files");
    const questionId = form.get("questionId");
    const imagesToBeMerged = [];
    for (const file of files) {
      if (file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        imagesToBeMerged.push(buffer);
      }
    }
    const finalImageBuffer = await mergeImagesVertically(imagesToBeMerged);

    const { public_id, secure_url } = await cloudinaryUpload(
      finalImageBuffer,
      `/${questionId}/${user.id}`,
    );

    await createAnswer({
      cloudinaryPublicId: public_id,
      questionId: questionId?.toString() ?? "",
      userId: user.id,
    });

    return NextResponse.json({ secure_url }, { status: 200 });
  } catch (error) {
    console.error("Error handling file upload:", error);
    return NextResponse.json(
      { error: "Failed to process file upload" },
      { status: 500 },
    );
  }
}
