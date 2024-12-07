import { EvaluationResult } from "@/app/lib/types/ai.types";
import { Button } from "../../ui/button";

export const SmartcheckResults = ({
  results,
  onBack,
}: {
  results: EvaluationResult;
  onBack: () => void;
}) => {
  const { mistakesAndCorrections, goodParts, score, modelAnswer } = results;

  return (
    <div className="flex flex-col rounded-md">
      <h2 className="text-xl font-bold text-primary-foreground">
        {results ? "Evaluation Results" : "Error evaluating the results."}
      </h2>
      {score && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-tertiary">Score</h3>
          <p className="text-lg text-primary-foreground">{score}</p>
        </div>
      )}

      {mistakesAndCorrections && mistakesAndCorrections.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-tertiary">
            Mistakes and Corrections
          </h3>
          <ul className="list-disc space-y-2 pl-5">
            {mistakesAndCorrections.map((item, index) => (
              <li key={index} className="text-primary-foreground">
                <p>
                  <span className="font-bold text-red-500">Mistake:</span>{" "}
                  {item.mistake}
                </p>
                <p>
                  <span className="font-bold text-green-500">Correction:</span>{" "}
                  {item.correction}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {goodParts && goodParts.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-tertiary">Good Parts</h3>
          <ul className="list-disc space-y-2 pl-5">
            {goodParts.map((item, index) => (
              <li key={index} className="text-primary-foreground">
                <p>
                  <span className="font-bold text-green-500">Good Part:</span>{" "}
                  {item.goodPart}
                </p>
                {item.appreciation && (
                  <p>
                    <span className="font-bold text-green-500">
                      Appreciation:
                    </span>{" "}
                    {item.appreciation}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {modelAnswer && (
        <div>
          <h3 className="text-xl font-semibold text-tertiary">Model Answer</h3>
          <p className="whitespace-pre-line text-primary-foreground">
            {modelAnswer}
          </p>
        </div>
      )}

      <div className="flex justify-center">
        <Button
          variant="link"
          className="mb-8 w-full p-6 text-[1rem] md:w-[14rem]"
          onClick={onBack}
        >
          Back
        </Button>
      </div>
    </div>
  );
};
