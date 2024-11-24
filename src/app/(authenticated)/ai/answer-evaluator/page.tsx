import { EvaluateAnswer } from "@/app/components/ai/answer-evaluation";
import { Navbar } from "@/app/components/shared/Header/Navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AIAnswerEvaluator({
  searchParams,
}: {
  searchParams: { question?: string; questionId?: string };
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <>
      <Navbar userImage={session.user.image ?? undefined} />
      <EvaluateAnswer
        question={searchParams.question}
        questionId={searchParams.questionId}
        isTypedQuestion={!searchParams.question}
      />
    </>
  );
}
