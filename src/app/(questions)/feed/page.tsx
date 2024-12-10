import { QuestionsContainer } from "@/app/client/components/questions/QuestionsContainer";
import { NEXT_REVALIDATE_TOPICS_AFTER } from "@/app/lib/constants";
import { auth } from "@/auth";
import { Topics } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UPSC Mains PYQs – Comprehensive Feed of Previous Year Questions",
  description:
    "Explore a complete feed of UPSC Mains Previous Year Questions (PYQs) categorized by topics and years. Use this resource to refine your preparation and master answer writing with ease.",
  keywords: [
    "UPSC Mains PYQs",
    "Previous Year Questions",
    "UPSC Mains questions",
    "UPSC PYQ feed",
    "Mains exam preparation",
    "UPSC preparation tools",
    "UPSC question bank",
    "PYQs by topic",
    "UPSC study material",
  ],
  authors: [
    {
      name: "Aayush Pagare",
    },
  ],
  applicationName: "AspirantsAI",
  publisher: "Aayush Pagare",
  category: "Education, UPSC, AI Tools",
  robots: "index, follow",
};

const fetchAllTopics = async (): Promise<Topics[]> => {
  const resp = await fetch(`${process.env.API_BASE_URL}/api/topics`, {
    next: {
      revalidate: NEXT_REVALIDATE_TOPICS_AFTER,
    },
  });

  const topics = await resp.json();

  return topics;
};

export default async function WelcomePage() {
  const session = await auth();
  /*
   * Fetch all topics to be displayed on the navbar
   * These revalidates cache after every 24 hour
   */
  const topics = await fetchAllTopics();
  return (
    <QuestionsContainer
      topics={topics}
      userImage={session?.user?.image ?? undefined}
      userLoggedIn={!!session}
    />
  );
}
