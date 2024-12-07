import { Metadata } from "next";
import { SEOContainer } from "../shared/Containers/SEOContainer";
import KeywordHighlighter from "../shared/KeywordHighlighter";

export const smartCheckSEOHeader = {
  title: "SmartCheck | AI Answer Evaluator for UPSC Mains Preparation",
  description:
    "Boost your UPSC Mains preparation with SmartCheck, an AI-powered answer evaluator that provides personalized feedback on your handwritten answers. Improve your writing skills and exam performance.",
  keywords: [
    "SmartCheck",
    "AI answer evaluator",
    "UPSC Mains preparation",
    "AI feedback for UPSC",
    "answer writing evaluation",
    "handwritten answer feedback",
    "UPSC Mains answer checker",
    "personalized feedback for UPSC",
    "improve UPSC Mains answers",
  ],
  author: "Aayush Pagare",
  publisher: "Aayush Pagare",
  category: "Education, UPSC, AI Tools",
  robots: "index, follow",
  abstract:
    "SmartCheck is an AI-driven tool designed to enhance the UPSC Mains preparation process by providing personalized evaluations for handwritten answers. Aspirants can upload their PDFs, and SmartCheck's advanced AI analyzes key aspects such as content accuracy, structure, clarity, and depth. The tool offers valuable, actionable feedback to help users improve their answer-writing skills and boost their exam performance. SmartCheck is an indispensable companion for UPSC candidates, delivering expert-level evaluations that allow for smarter, more efficient preparation.",
} as Metadata;

export const SmartCheckSEOFooter = () => {
  return (
    <SEOContainer>
      <KeywordHighlighter
        keywords={[
          "upsc mains",
          "Answer Evaluator",
          "AI",
          "SmartCheck",
          "handwritten",
          "answers",
        ]}
      >
        {`Boost your UPSC Mains preparation with SmartCheck, an AI-powered answer evaluator designed to help you refine your handwritten answers. 
         Upload your PDFs, and let SmartCheck assess your answers based on content quality, structure, clarity, and relevance. 
         Receive personalized feedback that helps you identify key areas for improvement and strategies to enhance your writing.
          Whether you're practicing essay-type responses or concise answers, SmartCheck provides expert insights to help you achieve top scores.
         Take your UPSC Mains preparation to the next level with SmartCheck—smart evaluations for smarter exam preparation.`}
      </KeywordHighlighter>
    </SEOContainer>
  );
};
