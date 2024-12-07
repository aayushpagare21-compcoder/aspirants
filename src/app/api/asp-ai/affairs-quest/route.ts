import { findRelaventPYQsToArticle } from "@/app/server/services/ai/findRelaventPYQsToArticle";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const questions = await findRelaventPYQsToArticle(body.url);

  return NextResponse.json({ questions });
}
