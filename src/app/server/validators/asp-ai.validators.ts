import { ErrorCodes } from "@/app/lib/constants";
import { NextResponse } from "next/server";

// TODO: Replace this with zod schema.
export async function validateEvaluateAnswerAPIFormData(
  answerPDF: FormDataEntryValue | null,
  question?: string,
) {
  if (!answerPDF) {
    return NextResponse.json(
      {
        error: "No answer provided to evaluate",
        errorCode: ErrorCodes.BAD_REQUEST,
      },
      { status: 400 },
    );
  }

  if (!question) {
    return NextResponse.json(
      {
        error: "No question provided to evaluate",
        errorCode: ErrorCodes.BAD_REQUEST,
      },
      { status: 400 },
    );
  }
}
