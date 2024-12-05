"use client";
import { useState } from "react";
import { AIToolsContainer } from "../../shared/Containers/AIToolsContainer";
import { ArticlePYQsForm } from "./ArticlePYQsForm";
import { QuestionsWithEverything } from "@/app/lib/types/feed.types";
import { useAsyncFn } from "react-use";
import { ErrorCodes } from "@/app/lib/constants";
import { ErrorPage } from "../../error/ErrorPage";
import { ArticlePYQsResult } from "./ArticlePYQsResult";

const getMatchingPYQs = async (
  url: string,
): Promise<QuestionsWithEverything[]> => {
  const resp = await fetch(`/api/asp-ai/article-pyqs`, {
    method: "POST",
    body: JSON.stringify({ url: url }),
  });

  const matchingPYQs = await resp.json();

  if (matchingPYQs.errorCode) {
    throw new Error(matchingPYQs.errorCode);
  }
  return matchingPYQs.questions;
};

export const ArticlePYQsClient = () => {
  const [articleUrl, setArticleUrl] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");

  // Function to validate URL
  const validateUrl = (url: string) => {
    const hinduUrlRegex = /^https?:\/\/(www\.)?thehindu\.com\/.+$/;
    return hinduUrlRegex.test(url);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const url = e.target.value;
    setArticleUrl(url);

    if (!url) {
      setValidationError("");
    } else if (!validateUrl(url)) {
      setValidationError("Please enter a valid article URL from The Hindu.");
    } else {
      setValidationError("");
    }
  };

  const [{ loading, error, value: results }, handleSubmit] = useAsyncFn(
    async ({ url }: { url: string }) => {
      const results = await getMatchingPYQs(url);
      return results;
    },
  );

  if (error) {
    switch (error.message) {
      case ErrorCodes.ARTICLE_TOO_LENGHTY:
        return (
          <ErrorPage
            title="Article too lenngthy.."
            message="Please enter a shorter article."
            onRetry={() => window.location.reload()}
          />
        );
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
    <AIToolsContainer heading={`Article's PYQ's`}>
      <ArticlePYQsForm
        articleUrl={articleUrl}
        handleUrlChange={handleUrlChange}
        onSubmit={() => handleSubmit({ url: articleUrl })}
        validationError={validationError}
        loading={loading}
      />
      {results && (
        <ArticlePYQsResult
          results={results}
          onBack={() => {
            window.location.reload();
          }}
        />
      )}
    </AIToolsContainer>
  );
};
