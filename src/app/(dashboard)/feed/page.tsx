import { fetchAllTopics } from "@/app/lib/fetchUtils";
import { QuestionsContainer } from "@/app/components/dashboard/questions/QuestionsContainer";

export default async function WelcomePage() {
  /*
   * Fetch all topics to be displayed on the navbar
   * These revalidates cache after every 24 hour
   */
  const topics = await fetchAllTopics();

  return <QuestionsContainer topics={topics} />;
}
