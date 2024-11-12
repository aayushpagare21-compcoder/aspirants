"use client";
import {
  convertPaperToDisplayType,
  DEFAULT_QUESTIONS_FETCH_COUNT,
  Papers,
  QuestionsWithEverything,
} from "@/app/lib/types/feed.types";
import { DateTime } from "luxon";
import { QuestionsCard } from "./QuestionCard";
import  { isEmpty, debounce, startCase, toLower, compact } from "lodash";
import { useEffect, useState, useCallback } from "react";
import { getQuestions } from "@/app/server/actions/questions.actions";
import { useInView } from "react-intersection-observer";
import { SkeletonLoader } from "../../shared/Loaders/SkeletonLoader";
import usePrevious from "@/app/hooks/usePrevious";
import { useEffectOnce } from "react-use";

export const QuestionsList = ({
  paper,
  topic,
  searchValue,
  setPaper,
  setTopic,
  setSearchValue,
}: {
  paper?: Papers;
  topic?: string;
  searchValue?: string;
  setPaper?: (paper: Papers | null) => void;
  setTopic?: (topic: string | null) => void;
  setSearchValue?: (searchValue: string | null) => void;
}) => {
  const [offset, setOffset] = useState<number>(0);
  const [questions, setQuestions] = useState<QuestionsWithEverything[]>([]);
  const [hasMoreQuestions, setHasMoreQuestions] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();

  const prevSearchText = usePrevious(searchValue ?? "");
  const prevTopic = usePrevious(topic ?? "");
  const prevPaper = usePrevious(paper);

  
  const fetchQuestions = useCallback(
    debounce(async () => {
      setLoading(true);
      const apiQuestions = await getQuestions({
        questionsLimit: DEFAULT_QUESTIONS_FETCH_COUNT,
        questionsOffset: 0,
        paper,
        topic,
        textToSearch: searchValue,
      });
      setQuestions(apiQuestions);
      setOffset(DEFAULT_QUESTIONS_FETCH_COUNT);
      setHasMoreQuestions(!isEmpty(apiQuestions));
      setLoading(false);
    }, 500),
    [paper, topic, searchValue]
  );
  

  // Load more questions on scroll
  const loadMoreQuestions = async () => {
    if (loading || !hasMoreQuestions) return;
    setLoading(true);
    const apiQuestions = await getQuestions({
      questionsLimit: DEFAULT_QUESTIONS_FETCH_COUNT,
      questionsOffset: offset,
      paper,
      topic,
      textToSearch: searchValue,
    });
    setQuestions((prevQuestions) => [...prevQuestions, ...apiQuestions]);
    setOffset((prevOffset) => prevOffset + DEFAULT_QUESTIONS_FETCH_COUNT);
    setHasMoreQuestions(!isEmpty(apiQuestions));
    setLoading(false);
  };

  useEffectOnce(() => {
    fetchQuestions()
  })

  // Trigger initial load or refresh on filter change
  useEffect(() => {
    // Only reset when a new search starts
    if (
      searchValue !== prevSearchText ||
      topic !== prevTopic ||
      paper !== prevPaper
    ) {
      if (searchValue && searchValue !== prevSearchText) {
        setTopic?.(null);
        setPaper?.(null);
      } else if (paper && paper !== prevPaper) {
        setTopic?.(null);
        setSearchValue?.("");
      } else if (topic && topic !== prevTopic) {
        setSearchValue?.("");
        setPaper?.(null);
      }
      fetchQuestions();
    }
  }, [
    paper,
    topic,
    searchValue,
  ]);
  // Load more when the user scrolls to the bottom
  useEffect(() => {
    if (inView) {
      loadMoreQuestions();
    }
  }, [inView]);

  return (
    <div>
      <div className="mt-4 flex flex-col items-center justify-center gap-8">
        {questions.map((q) => {
          const answeredByImages = compact(
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
                startCase(toLower(t.name)),
              )}
              answersOnQuestion={q.answers.length}
              maxWordsAnswerToWrite={q.words ?? 0}
              maxMarksAnswerToWrite={q.marks ?? 0}
            />
          );
        })}
        {questions.length > 3 && (hasMoreQuestions || loading) && (
          <div
            className="flex min-h-[300px] w-[100vw] flex-col items-center gap-4 md:min-h-[100px] md:w-[90vw] xl:w-[60vw]"
            ref={ref}
          >
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </div>
        )}
        {!hasMoreQuestions && (
          <div className="flex items-center justify-center text-sm font-bold text-tertiary">
            Oops😲 No questions available.
          </div>
        )}
      </div>
    </div>
  );
};
