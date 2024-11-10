import { getQuestions } from "@/app/server/actions/questions.actions";
import { QuestionsList } from "@/app/components/dashboard/questions/QuestionsList";

export default async function WelcomePage() {
  const initialQuestions = await getQuestions();
  return <QuestionsList initialQuestions={initialQuestions} />;
}
