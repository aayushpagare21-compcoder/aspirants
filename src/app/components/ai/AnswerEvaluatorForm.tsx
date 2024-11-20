"use client";
import ImageUploader from "../shared/Uploader/ImageUploader";
import { Textarea } from "../ui/textarea";
import { Groq } from "../shared/Logo/GroqEmbedding";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import { evaluateAnswer } from "../../lib/fetchUtils";

const MAX_NUMBER_OF_IMAGES_ALLOWED = 3;
const MAX_FILE_SIZE = 5 * 1024 * 1024; 
export const AnswerEvaluatorForm = ({ question }: { question: string }) => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const handleSubmit = async () => {
    const formData = new FormData();
    for (const image of Array.from(uploadedImages)) {
      formData.append('files', image);
    }
    formData.append("question", question);
    await evaluateAnswer(formData);
  };

  return (
    <div className="flex h-[100vh] w-[100vw] justify-center">
      <div className="flex w-[100vw] flex-col items-center gap-4 p-8 md:w-[50vw]">
        <div className="mb-4 text-left text-[2rem] leading-none">
          {" "}
          <span className="text-tertiary"> AI </span> answer evaluator{" "}
        </div>

        {question ? (
          <strong> {question} </strong>
        ) : (
          <Textarea
            placeholder="Please enter the question to be evaluated here"
            rows={20}
            name="question"
          />
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
                {" "}
                {`Please upload ${MAX_NUMBER_OF_IMAGES_ALLOWED} or less images.`}{" "}
              </li>
              <li>
                {" "}
                {`Only images less than or equal to ${MAX_FILE_SIZE / 1024 / 1024}MB`}{" "}
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-center gap-1 md:items-start">
            <Button
              variant="tertiary"
              className="w-full rounded-full p-6 text-[1rem] shadow-lg shadow-primary md:w-[14rem]"
              onClick={handleSubmit}
            >
              {" "}
              Evaluate Answer{" "}
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
        <Groq />
      </div>
    </div>
  );
};
