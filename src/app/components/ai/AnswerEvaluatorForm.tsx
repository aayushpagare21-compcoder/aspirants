"use client";
import Link from "next/link";
import ImageUploader from "../shared/Uploader/ImageUploader";
import { Textarea } from "../ui/textarea";
import Image from "next/image";

export const AnswerEvaluatorForm = ({ question }: { question: string }) => {
  return (
    <div className="flex h-[100vh] w-[100vw] justify-center">
      <div className="flex w-[100vw] flex-col items-center gap-8 p-8 md:w-[80vw] 2xl:w-[60vw]">
        <div className="text-left text-[2rem] leading-none">
          {" "}
          <span className="text-tertiary"> AI </span> answer evaluator.{" "}
        </div>
        {question ? (
          <strong> {question} </strong>
        ) : (
          <Textarea
            placeholder="Please enter the question to be evaluated here"
            rows={50}
          />
        )}

        <ImageUploader
          onUpload={(images) => {
            console.log("======images======", images);
          }}
        />

        <Link href="https://groq.com" target="_blank" rel="noopener noreferrer">
          <Image
            src="https://groq.com/wp-content/uploads/2024/03/PBG-mark1-color.svg"
            alt="Powered by Groq for fast inference."
            height={100}
            width={100}
          />
        </Link>
      </div>
    </div>
  );
};
