import { Topics } from "@/app/lib/types/feed.types";
import { getAllTopics } from "@/app/server/services/topics.services";
import { NextResponse } from "next/server";

export async function GET() {
  const topics = await getAllTopics();

  return NextResponse.json(
    topics.map((topic) => {
      return {
        id: topic.id,
        name: topic.name,
        createdAt: topic.createdAt,
        updatedAt: topic.updatedAt,
      };
    }) as Topics[],
  );
}
