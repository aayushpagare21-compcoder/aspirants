import { AffairsQuest } from "@/app/components/ai/affairs-quest";
import { AffairsQuestSEO } from "@/app/components/seo/AffairsQuestSEO";
import { AIToolsContainer } from "@/app/components/shared/Containers/AIToolsContainer";
import { Navbar } from "@/app/components/shared/Header/Navbar";
import { AIToolNames, formatToolsName } from "@/app/lib/types/utils.types";
import { auth } from "@/auth";

export default async function ArticlePYQs() {
  const session = await auth();
  return (
    <>
      <Navbar userImage={session?.user?.image ?? ""} />
      <AIToolsContainer heading={formatToolsName(AIToolNames.AFFAIRS_QUEST)}>
        <AffairsQuest />
        <AffairsQuestSEO />
      </AIToolsContainer>
    </>
  );
}
