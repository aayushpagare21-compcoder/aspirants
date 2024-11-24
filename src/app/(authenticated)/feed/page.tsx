import { QuestionsContainer } from "@/app/components/dashboard/questions/QuestionsContainer";
import { NEXT_REVALIDATE_TOPICS_AFTER } from "@/app/lib/constants";
import { auth } from "@/auth";
import { Topics } from "@prisma/client";
import { redirect } from "next/navigation";

const fetchAllTopics = async (): Promise<Topics[]> => {
  const resp = await fetch(`/api/topics`, {
    next: {
      revalidate: NEXT_REVALIDATE_TOPICS_AFTER,
    },
  });

  const topics = await resp.json();

  return topics;
};

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
