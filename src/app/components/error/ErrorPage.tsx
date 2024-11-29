import React from "react";
import { Button } from "../ui/button";

interface ErrorPageProps {
  title?: string; // Error title
  message?: string; // Error message
  onRetry?: () => void; // Optional retry button handler
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  title = "Something went wrong",
  message = "We encountered an unexpected error. Please try again later.",
  onRetry,
}) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <div className="max-w-md rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 text-2xl font-bold text-tertiary">{title}</div>
        <p className="mb-6 text-gray-700">{message}</p>
        {onRetry && (
          <Button
            onClick={onRetry}
            className="w-[120px] rounded-full p-4 text-sm shadow-md"
            variant="secondary"
          >
            Retry
          </Button>
        )}
      </div>
    </div>
  );
};
