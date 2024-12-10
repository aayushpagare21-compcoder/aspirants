import { Metadata } from "next";
import { SEOContainer } from "../shared/Containers/SEOContainer";
import KeywordHighlighter from "../shared/KeywordHighlighter";

export const affairsQuestHeaderSEO = {
  title: "AffairsQuest | Link Current Affairs to UPSC Mains PYQs",
  description:
    "AffairsQuest helps UPSC aspirants link current affairs directly to previous year questions (PYQs) from The Hindu newspaper. Stay exam-ready with AI-driven insights.",
  abstract:
    "AffairsQuest is an AI-powered tool that connects articles from The Hindu newspaper with UPSC Mains PYQs. It simplifies preparation by linking current affairs to exam-relevant questions, providing aspirants with valuable insights.",
  keywords: [
    "UPSC current affairs preparation",
    "AI-powered UPSC tools",
    "AffairsQuest UPSC Mains",
    "Current affairs for UPSC Mains",
    "The Hindu UPSC preparation",
    "Link current affairs with PYQs",
    "UPSC Mains previous year questions",
    "AI tool for UPSC aspirants",
    "Simplify UPSC preparation",
    "Current affairs insights for UPSC",
    "UPSC Mains preparation tool",
    "The Hindu articles for UPSC",
    "Connect news with UPSC syllabus",
    "UPSC Mains question insights",
    "Current affairs and UPSC questions",
    "PYQ-focused UPSC preparation",
    "UPSC AI preparation tool",
    "Efficient current affairs study UPSC",
    "AI for UPSC current affairs",
    "Exam-relevant current affairs UPSC",
  ],
  applicationName: "AspirantsAI",
  robots: "index, follow",
  creator: "Aayush Pagare",
  authors: {
    name: "Aayush Pagare",
    url: "",
  },
  publisher: "Aayush Pagare",
  category: "Education, UPSC, AI Tools",  
  alternates: { 
    canonical: "https://www.aspirantsai.com/ai/affairs-quest"
  }
} as Metadata;


export const AffairsQuestSEOFooter = () => {
  return (
    <SEOContainer>
      <KeywordHighlighter
        keywords={["AffairsQuest", "AI", "The Hindu", "current affairs"]}
      >
        {`AffairsQuest is an AI-powered tool designed for UPSC aspirants, offering
        seamless integration of current affairs into your exam preparation. By
        simply pasting a link from The Hindu newspaper, AffairsQuest instantly
        connects the article to relevant UPSC Mains PYQs, saving you time and
        helping you stay focused on what matters. Whether you're preparing for
        GS papers or answer writing, our tool ensures sthat current events are
        always linked to the UPSC syllabus. Stay ahead of the competition with
        AffairsQuest, the ultimate resource for matching current affairs with
        UPSC Mains questions from The Hindu. Enhance your preparation today and
        align every article with your exam strategy.`}
      </KeywordHighlighter>
    </SEOContainer>
  );
};
