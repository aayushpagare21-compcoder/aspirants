import Link from "next/link";
import { SkeletonLoader } from "../../shared/Loaders/SkeletonLoader";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";

export const AffairsQuestForm = ({
  articleUrl,
  handleUrlChange,
  onSubmit,
  validationError: error,
  loading,
  userLoggedIn,
}: {
  articleUrl: string;
  handleUrlChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  validationError: string | null;
  loading: boolean;
  userLoggedIn: boolean;
}) => {
  return (
    <>
      <Textarea
        id="articleUrlInput"
        className="focus-visible:none border-md w-full bg-inherit p-2"
        placeholder={`Paste article's link here. e.g https://www.thehindu.com/life-and-style/travel/on-a-buddhist-trail-in-sanchi/article28771908.ece`}
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
                Please paste an article link from <i> The Hindu here </i>.
              </span>
            </li>
            <li>{`We'll find out all the relavent PYQs of mains.`}</li>
          </ul>
        </div>

        <div className="flex flex-col justify-center gap-1 md:items-start">
          {userLoggedIn && (
            <Button
              variant="tertiary"
              className="w-full rounded-full p-6 text-[1rem] shadow-lg shadow-primary md:w-[14rem]"
              onClick={onSubmit}
              disabled={!articleUrl || !!error}
            >
              Find Relavent PYQs
            </Button>
          )}
          {!userLoggedIn && (
            <Button
              variant="tertiary"
              className="w-full rounded-full p-6 text-[1rem] shadow-lg shadow-primary md:w-[14rem]"
              disabled={!articleUrl || !!error}
            >
              <Link href="/login?redirectTo=/ai/affairs-quest">
                {" "}
                Find Relavent PYQs{" "}
              </Link>
            </Button>
          )}
        </div>
      </div>
      {loading && (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      )}
    </>
  );
};
