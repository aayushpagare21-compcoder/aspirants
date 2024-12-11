"use client";
import { EvaluationResult } from "@/app/lib/types/ai.types";
import { useState } from "react";
import DynamicLoader from "../../shared/Loaders/DynamicLoader";

import { redirect } from "next/navigation";
import { useAsyncFn } from "react-use";
import { ErrorPage } from "../../error/ErrorPage";
import { ErrorCodes } from "@/app/lib/constants";
import { SmartcheckForm } from "./SmartcheckForm";
import { SmartcheckResults } from "./SmartcheckResults";

type Screens = "FORM" | "RESULT";

const evaluateAnswer = async (
  formData: FormData,
): Promise<EvaluationResult> => {
  const resp = await fetch(`/api/asp-ai/smartcheck`, {
    method: "POST",
    body: formData,
  });

  const evaluatedAnswer = await resp.json();

  if (evaluatedAnswer.errorCode) {
    throw new Error(evaluatedAnswer.errorCode);
  }
  return evaluatedAnswer;
};

export const SmartcheckClient = ({
  isTypedQuestion,
  question: initialQuestion,
  questionId,
  userLoggedIn,
}: {
  isTypedQuestion: boolean;
  question?: string;
  questionId?: string;
  userLoggedIn: boolean;
}) => {
  const [answerEvaluationScreen, setAnswerEvaluationScreen] =
    useState<Screens>("FORM");
  const [uploadedAnswer, setUploadedAnswer] = useState<File | null>(null);
  const [question, setQuestion] = useState<string | undefined>(initialQuestion);

  const [{ loading, error, value: results }, handleSubmit] = useAsyncFn(
    async ({
      question,
      questionId,
      uploadedAnswer,
    }: {
      question?: string;
      questionId?: string;
      uploadedAnswer?: File | null;
    }) => {
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
    <>
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
            <SmartcheckForm
              question={question}
              disabledSubmitButton={!uploadedAnswer || !question}
              isTypedQuestion={isTypedQuestion}
              handleSubmit={() => {
                handleSubmit({ question, questionId, uploadedAnswer });
              }}
              setQuestion={setQuestion}
              setUploadedAnswer={setUploadedAnswer}
              userLoggedIn={userLoggedIn}
            />
          )}
          {answerEvaluationScreen === "RESULT" && results && (
            <SmartcheckResults
              results={results}
              onBack={() => {
                setAnswerEvaluationScreen("FORM");
              }}
            />
          )}
        </>
      )}
    </>
  );
};
