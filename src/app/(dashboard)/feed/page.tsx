import { getQuestions } from "@/app/server/actions/questions.actions";
import { QuestionsList } from "@/app/components/dashboard/questions/QuestionsList";
import { SlidingNavbar } from "@/app/components/shared/Caraousels/SlidingNavBar";
import { Divider } from "@/app/components/shared/Divider/Divider";
import { slidingNavBarStaticItems } from "@/app/lib/types/feed.types";
import { fetchAllTopics } from "@/app/lib/fetchUtils";

export default async function WelcomePage() {
  const [initialQuestions, topics] = await Promise.all([
    getQuestions(),
    fetchAllTopics(),
  ]);

  return (
    <>
      <Divider />
      <SlidingNavbar
        navItems={slidingNavBarStaticItems.concat(
          topics.map((topic) => {
            return {
              id: topic.name,
              label: topic.name,
            };
          }),
        )}
      />
      <QuestionsList initialQuestions={initialQuestions} />;
    </>
  );
}
