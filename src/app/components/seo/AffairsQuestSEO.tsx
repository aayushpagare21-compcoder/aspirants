import { SEOContainer } from "../shared/Containers/SEOContainer";
import KeywordHighlighter from "../shared/KeywordHighlighter";

export const AffairsQuestSEO = () => {
  return (
    <SEOContainer>
      <KeywordHighlighter
        keywords={["AffairsQuest", "AI ", "The Hindu", "current affairs"]}
      >
        AffairsQuest is an AI-powered tool designed for UPSC aspirants, offering
        seamless integration of current affairs into your exam preparation. By
        simply pasting a link from The Hindu newspaper, AffairsQuest instantly
        connects the article to relevant UPSC Mains PYQs, saving you time and
        helping you stay focused on what matters. Whether you're preparing for
        GS papers or answer writing, our tool ensures that current events are
        always linked to the UPSC syllabus. Stay ahead of the competition with
        AffairsQuest, the ultimate resource for matching current affairs with
        UPSC Mains questions from The Hindu. Enhance your preparation today and
        align every article with your exam strategy.
      </KeywordHighlighter>
    </SEOContainer>
  );
};
