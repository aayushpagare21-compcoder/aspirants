"use client";
import { Button } from "../../ui/button";
import Link from "next/link";
import { Textarea } from "../../ui/textarea";
import PDFUploader from "../../shared/Uploader/PDFUploader";
const MAX_FILE_SIZE = 1 * 1024 * 1024;

export const SmartcheckForm = ({
  isTypedQuestion,
  question,
  setQuestion,
  handleSubmit,
  disabledSubmitButton,
  setUploadedAnswer,
  userLoggedIn,
}: {
  isTypedQuestion: boolean;
  question?: string;
  setQuestion: (question: string) => void;
  handleSubmit: () => void;
  disabledSubmitButton: boolean;
  setUploadedAnswer: (pdf: File | null) => void;
  userLoggedIn: boolean;
}) => {
  return (
    <section id="smart_check_form">
      {isTypedQuestion && (
        <div className="mb-4 w-full">
          <Textarea
            id="questionInput"
            className="focus-visible:none border-md w-full bg-inherit p-2"
            placeholder="Type your question here..."
            value={question || ""}
            onChange={(e) => setQuestion(e.target.value)}
            rows={10}
          />
        </div>
      )}

      <PDFUploader
        onUpload={(pdf) => {
          setUploadedAnswer(pdf);
        }}
        maxFileSize={MAX_FILE_SIZE}
      />

      <div className="flex w-full flex-col md:flex-row md:justify-between">
        <div>
          <ul className="-mt-1 flex list-disc flex-col justify-center p-4 text-primary-foreground/80">
            <li>{`Please upload pdf in clear and legible handwriting.`}</li>
            <li>
              {`Only pdf less than or equal to ${
                MAX_FILE_SIZE / 1024 / 1024
              }MB are allowed.`}
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-center gap-1 md:items-start">
          {userLoggedIn && (
            <Button
              variant="tertiary"
              className="w-full rounded-full p-6 text-[1rem] shadow-lg shadow-primary md:w-[14rem]"
              onClick={handleSubmit}
              disabled={disabledSubmitButton}
            >
              Evaluate Answer
            </Button>
          )}
          {!userLoggedIn && (
            <Button
              variant="tertiary"
              className="w-full rounded-full p-6 text-[1rem] shadow-lg shadow-primary md:w-[14rem]"
              disabled={disabledSubmitButton}
            >
              <Link href="/login?redirectTo=/ai/smartcheck">
                {" "}
                Evaluate Answer{" "}
              </Link>
            </Button>
          )}

          <div>
            <Link href="/feed">
              <Button
                variant="link"
                className="mb-8 w-full p-6 text-[1rem] md:w-[14rem]"
              >
                Back
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
