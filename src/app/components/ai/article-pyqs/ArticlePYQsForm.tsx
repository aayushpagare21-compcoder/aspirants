import { SkeletonLoader } from "../../shared/Loaders/SkeletonLoader";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";

export const ArticlePYQsForm = ({
  articleUrl,
  handleUrlChange,
  onSubmit,
  validationError: error,
  loading,
}: {
  articleUrl: string;
  handleUrlChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  validationError: string | null;
  loading: boolean;
}) => {
  return (
    <>
      <Textarea
        id="articleUrlInput"
        className="focus-visible:none border-md w-full bg-inherit p-2"
        placeholder={`Paste your link of article here...`}
        value={articleUrl || ""}
        onChange={handleUrlChange}
        rows={2}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      <div className="flex w-full flex-col md:flex-row md:justify-between">
        <div>
          <ul className="-mt-1 flex list-disc flex-col justify-center p-4 text-primary-foreground/80">
            <li>
              {" "}
              <span>
                {" "}
                Paste an article link from <i> THE HINDU here.</i>{" "}
              </span>
            </li>
            <li>You will get all the matching PYQs of mains.</li>
          </ul>
        </div>

        <div className="flex flex-col justify-center gap-1 md:items-start">
          <Button
            variant="tertiary"
            className="w-full rounded-full p-6 text-[1rem] shadow-lg shadow-primary md:w-[14rem]"
            onClick={onSubmit}
            disabled={!articleUrl || !!error}
          >
            Find Matching PYQs
          </Button>
        </div>
      </div>
      {loading && (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      )}
    </>
  );
};
