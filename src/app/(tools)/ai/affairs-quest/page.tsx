import { AffairsQuestClient } from "@/app/client/components/ai/affairs-quest";
import {
  affairsQuestHeaderSEO,
  AffairsQuestSEOFooter,
} from "@/app/client/components/seo/AffairsQuestSEO";
import { AIToolsContainer } from "@/app/client/components/shared/Containers/AIToolsContainer";
import { Navbar } from "@/app/client/components/shared/Header/Navbar";
import { AIToolNames, formatToolsName } from "@/app/lib/types/utils.types";
import { auth } from "@/auth";
import type { Metadata } from "next";

export const metadata: Metadata = affairsQuestHeaderSEO;

export default async function AffairsQuest() {
  const session = await auth();
  return (
    <>
      <Navbar userImage={session?.user?.image ?? ""} />
      <AIToolsContainer heading={formatToolsName(AIToolNames.AFFAIRS_QUEST)}>
        <AffairsQuestClient />
        <AffairsQuestSEOFooter />
      </AIToolsContainer>
    </>
  );
}
