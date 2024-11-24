"use client";
import { evaluateAnswer } from "@/app/lib/fetchUtils";
import { EvaluationResult } from "@/app/lib/types/ai.types";
import { useState } from "react";
import DynamicLoader from "../../shared/Loaders/DynamicLoader";
import { AnswerEvaluatorForm } from "./AnswerEvaluatorForm";
import { EvaluationResults } from "./AnswerEvaluatorResults";
import { redirect } from "next/navigation";

type Screens = "FORM" | "RESULT";
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
  const [results, setResults] = useState<EvaluationResult | null>(null);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState<string | undefined>(initialQuestion);

  const handleSubmit = async () => {
    const formData = new FormData();
    for (const image of Array.from(uploadedImages)) {
      formData.append("files", image);
    }
    formData.append("question", question ?? "");
    formData.append("questionId", questionId ?? "");
    setLoading(true);
    const data = await evaluateAnswer(formData);
    setLoading(false);
    setUploadedImages([]);
    setResults(data);
    setAnswerEvaluationScreen("RESULT");
  };

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
                disabledSubmitButton={uploadedImages.length === 0}
                isTypedQuestion={isTypedQuestion}
                handleSubmit={handleSubmit}
                setQuestion={setQuestion}
                setUploadedImages={setUploadedImages}
              />
            )}
            {answerEvaluationScreen === "RESULT" && results && (
              <EvaluationResults
                results={results}
                onBack={() => {
                  if (isTypedQuestion) {
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
