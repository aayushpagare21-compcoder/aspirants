import {
  convertPaperToDisplayType,
  QuestionsWithEverything,
} from "@/app/lib/types/feed.types";
import { QuestionsCard } from "../../components/dashboard/questions";
import { Divider } from "@/app/components/shared/Divider/Divider";
import { DateTime } from "luxon";
import { getAPI } from "@/app/lib/utils";
import _ from "lodash";

export default async function WelcomePage() {
  const data = await getAPI<QuestionsWithEverything[]>(`/questions`);

  // console.log("=======", typeof data[0].askedDate, DateTime.fromISO(data[0]!.askedDate.toISOString()))

  if (!data) {
    return null;
  }

  return (
    <div>
      <Divider />
      <div className="mt-4 flex flex-col items-center justify-center gap-8">
        {data.map((q, i) => {
          const answeredByImages = _.compact(
            q.answers.slice(0, 5).map((a) => a.user.image),
          );
          return (
            <QuestionsCard
              key={i}
              questionText={q.text}
              answeredByImages={answeredByImages}
              questionAskedDate={
                q.askedDate
                  ? DateTime.fromISO(q.askedDate).toFormat("yyyy, LLL dd")
                  : ""
              }
              paperOnWhichQuestionsAsked={convertPaperToDisplayType(q.paper)}
              topicsRelatedToQuestion={q.topics.map((t) =>
                _.startCase(_.toLower(t.name)),
              )}
              answersOnQuestion={q.answers.length}
              maxWordsAnswerToWrite={q.words ?? 0}
              maxMarksAnswerToWrite={q.marks ?? 0}
            />
          );
        })}
      </div>
    </div>
  );
}
