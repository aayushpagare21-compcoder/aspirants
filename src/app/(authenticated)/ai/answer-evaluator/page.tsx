import { AnswerEvaluatorForm } from "@/app/components/ai/AnswerEvaluatorForm";
import { Navbar } from "@/app/components/shared/Header/Navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AIAnswerEvaluator() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <>
      <Navbar userImage={session.user.image ?? undefined} />
      <AnswerEvaluatorForm />
    </>
  );
}
