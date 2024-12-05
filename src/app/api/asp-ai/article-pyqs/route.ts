import { findMatchingPYQs } from "@/app/server/services/ai/findMatchingPYQ";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const questions = await findMatchingPYQs(body.url);

  return NextResponse.json({ questions });
}
