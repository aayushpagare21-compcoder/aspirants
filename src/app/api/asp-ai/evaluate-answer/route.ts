import { cloudinaryUpload } from "@/app/server/services/cloudinary.service";
import { mergeImagesVertically } from "@/app/server/services/images.service";
import { getUserByEmail } from "@/app/server/services/user.service";
import { auth } from "@/auth";
import { NextResponse } from "next/server"
export async function POST(req: Request) {
  try {
    const session = await auth(); 
    const user = await getUserByEmail(session?.user?.email ?? '');
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    } 

    const form = await req.formData();
    const files = form.getAll("files");
    const imagesToBeMerged = []
    for (const file of files) {
      if (file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        imagesToBeMerged.push(buffer);
      }
    }
    const finalImageBuffer = await mergeImagesVertically(imagesToBeMerged)
   
    const { public_id, secure_url } = await cloudinaryUpload(finalImageBuffer, `answers/${user.id}`);
    console.log("secure_url: ",  secure_url, public_id)

    NextResponse.json({ "tmkoc": "band hoja bhai" }, { status: 200 });

  } catch (error) {
    console.error("Error handling file upload:", error);
    return NextResponse.json({ error: "Failed to process file upload" }, { status: 500 });
  }
}
