"use client";
import { EvaluationResult } from "@/app/lib/types/ai.types";
import { useState } from "react";
import DynamicLoader from "../../shared/Loaders/DynamicLoader";
import { AnswerEvaluatorForm } from "./AnswerEvaluatorForm";
import { EvaluationResults } from "./AnswerEvaluatorResults";
import { redirect } from "next/navigation";
import { useAsyncFn } from "react-use";
import { ErrorPage } from "../../error/ErrorPage";
import { ErrorCodes } from "@/app/lib/constants";

type Screens = "FORM" | "RESULT";

const evaluateAnswer = async (
  formData: FormData,
): Promise<EvaluationResult> => {
  const resp = await fetch(`/api/asp-ai/evaluate-answer`, {
    method: "POST",
    body: formData,
  });

  const evaluatedAnswer = await resp.json();

  if (evaluatedAnswer.errorCode) {
    throw new Error(evaluatedAnswer.errorCode);
  }
  return evaluatedAnswer;
};

export const EvaluateAnswer = ({
  isTypedQuestion,
  question: initialQuestion,
  questionId,
}: {
  isTypedQuestion: boolean;
  question?: string;
  questionId?: string;
}) => {
  const [answerEvaluationScreen, setAnswerEvaluationScreen] =
    useState<Screens>("FORM");
  const [uploadedAnswer, setUploadedAnswer] = useState<File | null>(null);
  const [question, setQuestion] = useState<string | undefined>(initialQuestion);
  console.log("======uploadedANswer", uploadedAnswer)
  console.log("======question", question)

  const [{ loading, error, value: results }, handleSubmit] = useAsyncFn(
    async () => {
      const formData = new FormData();
      if (question) {
        formData.append("question", question);
      }
      if (uploadedAnswer) {
        formData.append("answer", uploadedAnswer);
      }
      if (questionId) {
        formData.append("questionId", questionId);
      }

      console.log("formdata in FE====", formData)
      const results = await evaluateAnswer(formData);
      setAnswerEvaluationScreen("RESULT");
      setUploadedAnswer(null);

      return results;
    },
  );

  if (error) {
    switch (error.message) {
      case ErrorCodes.RATE_LIMIT_EXCEEDED:
        return (
          <ErrorPage
            title="To many requests"
            message="You can only evaluate three answers per day. We are working on increasing this limit."
            onRetry={() => window.location.reload()}
          />
        );
      default:
        return <ErrorPage />;
    }
  }

  return (
    <div className="flex h-[100vh] w-[100vw] justify-center">
      <div className="flex w-[100vw] flex-col items-center gap-4 p-8 md:w-[50vw]">
        <div className="mb-4 text-left text-[2rem] leading-none">
          <span className="text-tertiary">AI</span> answer evaluator
        </div>
        <strong>{question}</strong>
        {loading ? (
          <DynamicLoader
            messages={[
              "⏳ Please wait...",
              "🤔 Analyzing your answer...",
              "🧪 Your results are getting ready...",
              "🚀 Almost there...",
            ]}
          />
        ) : (
          <>
            {answerEvaluationScreen === "FORM" && (
              <AnswerEvaluatorForm
                question={question}
                disabledSubmitButton={!uploadedAnswer || !question}
                isTypedQuestion={isTypedQuestion}
                handleSubmit={handleSubmit}
                setQuestion={setQuestion}
                setUploadedAnswer={setUploadedAnswer}
              />
            )}
            {answerEvaluationScreen === "RESULT" && results && (
              <EvaluationResults
                results={results}
                onBack={() => {
                  if (!isTypedQuestion) {
                    redirect("/feed");
                  } else {
                    setAnswerEvaluationScreen("FORM");
                  }
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
