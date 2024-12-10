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
    "UPSC Mains Previous Year Questions",
    "PYQs categorized by topics",
    "UPSC answer writing preparation",
    "UPSC Mains question bank",
    "Refine UPSC preparation with PYQs",
    "Master UPSC answer writing",
    "UPSC Mains PYQ resource",
    "UPSC Mains topic-wise PYQs",
    "UPSC preparation with PYQs",
    "Complete feed of UPSC Mains questions",
    "UPSC answer writing practice",
    "UPSC question papers by year",
    "Answer writing tips for UPSC Mains",
    "UPSC Mains question categorization",
    "Year-wise UPSC Mains questions",
    "UPSC answer writing mastery",
    "UPSC Mains preparation guide",
    "Detailed PYQs for UPSC Mains",
    "UPSC Mains question archive"
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
  alternates: { 
    canonical: "https://www.aspirantsai.com/feed",
  }
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
