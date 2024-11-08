import { QuestionsWithEverything } from "@/app/lib/types/feed.types";
import { NextRequest, NextResponse } from "next/server";
import { getAllPublishedQuestionsWithEverything } from "@/app/server/services/questions.service";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<QuestionsWithEverything[] | null>> {
  try {
    const { searchParams } = new URL(request.url);

    const limit = searchParams.get("limit") ?? undefined;
    const offset = searchParams.get("offset") ?? undefined;
    const answerOffset = searchParams.get("answerOffset") ?? undefined;

    const questions = await getAllPublishedQuestionsWithEverything({
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
      answerOffset: answerOffset ? parseInt(answerOffset) : undefined,
    });

    return NextResponse.json(questions);
  } catch (err) {
    console.error("Error fetching questions", err);
    return NextResponse.json(null);
  }
}
