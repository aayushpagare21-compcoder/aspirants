import { BookAIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";

export const QuestionsCard = ({
  questionText,
  questionId,
  questionAskedDate,
  answersOnQuestion,
  topicsRelatedToQuestion,
  paperOnWhichQuestionsAsked,
  maxWordsAnswerToWrite,
  maxMarksAnswerToWrite,
  answeredByImages,
}: {
  questionText: string;
  questionId: string;
  questionAskedDate: string;
  answersOnQuestion: number;
  topicsRelatedToQuestion: string[];
  paperOnWhichQuestionsAsked?: string;
  maxWordsAnswerToWrite?: number;
  maxMarksAnswerToWrite?: number;
  answeredByImages: string[];
}) => {
  return (
    <div>
      <Card className="min-h-[300px] w-[100vw] overflow-auto p-4 md:min-h-[100px] md:w-[90vw] xl:w-[60vw]">
        <div>
          <CardHeader>
            <CardTitle className="mb-2 text-[1.2rem] font-bold leading-[1.5rem]">
              <div>
                <span> {questionText} </span>
                {maxMarksAnswerToWrite || maxWordsAnswerToWrite ? "(" : ""}
                <span>
                  {maxWordsAnswerToWrite
                    ? `${maxWordsAnswerToWrite} words`
                    : ``}
                </span>
                {maxMarksAnswerToWrite && maxWordsAnswerToWrite ? "|" : ""}
                <span>
                  {maxMarksAnswerToWrite
                    ? `${maxMarksAnswerToWrite} marks`
                    : ``}
                </span>
                {maxMarksAnswerToWrite || maxWordsAnswerToWrite ? ")" : ""}
              </div>
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <div className="grid grid-cols-1 gap-1 md:grid-cols-12">
              <div className="text-sm text-muted-foreground md:col-span-2">
                {" "}
                {questionAskedDate}{" "}
              </div>
              {paperOnWhichQuestionsAsked && (
                <div className="text-sm text-muted-foreground md:col-span-2">
                  {" "}
                  {paperOnWhichQuestionsAsked}{" "}
                </div>
              )}
              <div className="text-muted-foregrund text-sm md:col-span-8">
                {topicsRelatedToQuestion.map((topic, index) => {
                  return (
                    <span className="text-muted-foreground" key={index}>
                      {" "}
                      {topic}{" "}
                    </span>
                  );
                })}
              </div>
              <div className="flex grid-cols-4 items-center gap-6 md:col-span-2">
                <div className="flex items-center gap-1">
                  <BookAIcon height="15" width="15" className="text-tertiary" />
                  <div className="text-sm font-bold text-tertiary">
                    {" "}
                    {answersOnQuestion} ans
                  </div>
                </div>
                {answeredByImages.length > 2 && (
                  <div>
                    <div className="flex">
                      {answeredByImages.map((user, index) => {
                        return (
                          <Image
                            src={user}
                            alt="user image"
                            width={20}
                            height={20}
                            key={index}
                            className="-ml-3 h-[20px] w-[20px] rounded-full"
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex">
                <Link
                  href={{
                    pathname: "/ai/answer-evaluator",
                    query: { question: questionText, questionId }, // passing question as query parameter
                  }}
                >
                  <Button variant="link" className="pl-0">
                    Evaluate your answer with AI
                  </Button>
                </Link>
              </div>
            </div>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};
