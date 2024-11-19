import { fetchAllTopics } from "@/app/lib/fetchUtils";
import { QuestionsContainer } from "@/app/components/dashboard/questions/QuestionsContainer";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function WelcomePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  /*
   * Fetch all topics to be displayed on the navbar
   * These revalidates cache after every 24 hour
   */
  const topics = await fetchAllTopics();
  return (
    <QuestionsContainer
      topics={topics}
      userImage={session.user.image ?? undefined}
    />
  );
}
