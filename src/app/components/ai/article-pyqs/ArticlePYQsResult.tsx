import {
  convertPaperToDisplayType,
  QuestionsWithEverything,
} from "@/app/lib/types/feed.types";
import { compact, startCase, toLower } from "lodash";
import { QuestionsCard } from "../../dashboard/questions/QuestionCard";
import { DateTime } from "luxon";
import { Divider } from "../../shared/Divider/Divider";
import { Button } from "../../ui/button";

export const ArticlePYQsResult = ({
  results,
  onBack,
}: {
  results: QuestionsWithEverything[];
  onBack: () => void;
}) => {
  return (
    <>
      <Divider />
      <div className="text-center text-2xl font-semibold">
        <span className="text-tertiary"> Questions </span> matching the article
      </div>
      <div className="mt-4 flex flex-col items-center justify-center gap-8">
        {results.map((q) => {
          const answeredByImages = compact(
            q.answers.slice(0, 5).map((a) => a.user.image),
          );
          return (
            <QuestionsCard
              key={q.id}
              questionId={q.id}
              questionText={q.text}
              answeredByImages={answeredByImages}
              questionAskedDate={
                q.askedDate
                  ? DateTime.fromISO(q.askedDate).toFormat("yyyy, LLL dd")
                  : ""
              }
              paperOnWhichQuestionsAsked={convertPaperToDisplayType(q.paper)}
              topicsRelatedToQuestion={q.topics.map((t) =>
                startCase(toLower(t.name)),
              )}
              answersOnQuestion={q.answers.length}
              maxWordsAnswerToWrite={q.words ?? 0}
              maxMarksAnswerToWrite={q.marks ?? 0}
            />
          );
        })}
      </div>
      <div className="flex justify-center">
        <Button
          variant="link"
          className="mb-8 w-full p-6 text-[1rem] md:w-[14rem]"
          onClick={onBack}
        >
          Back
        </Button>
      </div>
    </>
  );
};