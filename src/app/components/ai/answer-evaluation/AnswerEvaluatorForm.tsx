"use client";
import ImageUploader from "../../shared/Uploader/ImageUploader";
import { Button } from "../../ui/button";
import Link from "next/link";
import { Textarea } from "../../ui/textarea";

const MAX_NUMBER_OF_IMAGES_ALLOWED = 3;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const AnswerEvaluatorForm = ({
  isTypedQuestion,
  question,
  setQuestion,
  handleSubmit,
  disabledSubmitButton,
  setUploadedImages,
}: {
  isTypedQuestion: boolean;
  question?: string;
  setQuestion: (question: string) => void;
  handleSubmit: () => void;
  disabledSubmitButton: boolean;
  setUploadedImages: (images: File[]) => void;
}) => {
  return (
    <>
      {isTypedQuestion && (
        <div className="mb-4 w-full">
          <Textarea
            id="questionInput"
            className="w-full text-sm text-primary-foreground shadow-sm"
            placeholder="Type your question here..."
            value={question || ""}
            onChange={(e) => setQuestion(e.target.value)}
            rows={10}
          />
        </div>
      )}

      <ImageUploader
        onUpload={(images) => {
          setUploadedImages(images);
        }}
        maxNumberOfImages={MAX_NUMBER_OF_IMAGES_ALLOWED}
        maxFileSize={MAX_FILE_SIZE}
      />

      <div className="flex w-full flex-col md:flex-row md:justify-between">
        <div>
          <ul className="-mt-1 flex list-disc flex-col justify-center p-4 text-primary-foreground/80">
            <li>
              {`Please upload ${MAX_NUMBER_OF_IMAGES_ALLOWED} or fewer images.`}
            </li>
            <li>
              {`Only images less than or equal to ${
                MAX_FILE_SIZE / 1024 / 1024
              }MB.`}
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-center gap-1 md:items-start">
          <Button
            variant="tertiary"
            className="w-full rounded-full p-6 text-[1rem] shadow-lg shadow-primary md:w-[14rem]"
            onClick={handleSubmit}
            disabled={disabledSubmitButton || !question?.trim()}
          >
            Evaluate Answer
          </Button>

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
    </>
  );
};
