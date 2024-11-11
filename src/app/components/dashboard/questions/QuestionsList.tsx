"use client";
import {
  convertPaperToDisplayType,
  DEFAULT_QUESTIONS_FETCH_COUNT,
  Papers,
  QuestionsWithEverything,
} from "@/app/lib/types/feed.types";
import { DateTime } from "luxon";
import { QuestionsCard } from "./QuestionCard";
import _, { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { getQuestions } from "@/app/server/actions/questions.actions";
import { useInView } from "react-intersection-observer";
import { SkeletonLoader } from "../../shared/Loaders/SkeletonLoader";

export const QuestionsList = ({
  paper,
  topic,
}: {
  paper?: Papers;
  topic?: string;
}) => {
  const [offset, setOffset] = useState<number>(DEFAULT_QUESTIONS_FETCH_COUNT);
  const [questions, setQuestions] = useState<QuestionsWithEverything[]>([]);
  const [hasMoreQuestions, setHasMoreQuestions] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();

  const loadMoreQuestions = async () => {
    setLoading(true);
    const apiQuestions = await getQuestions({
      questionsLimit: DEFAULT_QUESTIONS_FETCH_COUNT,
      questionsOffset: offset,
      paper,
      topic,
    });
    if (isEmpty(apiQuestions)) {
      setHasMoreQuestions(false);
    }
    setQuestions((questions) => [...questions, ...apiQuestions]);
    setOffset((offset) => offset + DEFAULT_QUESTIONS_FETCH_COUNT);
    setLoading(false);
  };

  useEffect(() => {
    if (inView) {
      loadMoreQuestions();
    }
  }, [inView]);

  useEffect(() => {
    setQuestions([]);
    setOffset(DEFAULT_QUESTIONS_FETCH_COUNT);
    loadMoreQuestions();
  }, [paper, topic]);

  return (
    <div>
      <div className="mt-4 flex flex-col items-center justify-center gap-8">
        {questions.map((q) => {
          const answeredByImages = _.compact(
            q.answers.slice(0, 5).map((a) => a.user.image),
          );
          return (
            <QuestionsCard
              key={q.id}
              questionText={q.text}
              answeredByImages={answeredByImages}
              questionAskedDate={
                q.askedDate
                  ? DateTime.fromISO(q.askedDate).toFormat("yyyy, LLL dd")
                  : ""
              }
              paperOnWhichQuestionsAsked={convertPaperToDisplayType(q.paper)}
              topicsRelatedToQuestion={q.topics.map((t) =>
                _.startCase(_.toLower(t.name)),
              )}
              answersOnQuestion={q.answers.length}
              maxWordsAnswerToWrite={q.words ?? 0}
              maxMarksAnswerToWrite={q.marks ?? 0}
            />
          );
        })}
        {hasMoreQuestions && (
          <div
            className="flex min-h-[300px] w-[100vw] flex-col items-center gap-4 md:min-h-[100px] md:w-[90vw] xl:w-[60vw]"
            ref={ref}
          >
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </div>
        )}
        {!hasMoreQuestions && !loading && (
          <div className="flex items-center justify-center text-sm font-bold text-tertiary">
            Oops😲 More questions to be added yet.
          </div>
        )}
      </div>
    </div>
  );
};
