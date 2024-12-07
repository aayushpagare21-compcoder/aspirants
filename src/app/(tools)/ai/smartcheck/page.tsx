import { SmartcheckClient } from "@/app/client/components/ai/smartcheck";
import {
  SmartCheckSEOFooter,
  smartCheckSEOHeader,
} from "@/app/client/components/seo/SmartcheckSEO";
import { AIToolsContainer } from "@/app/client/components/shared/Containers/AIToolsContainer";
import { Navbar } from "@/app/client/components/shared/Header/Navbar";
import { AIToolNames, formatToolsName } from "@/app/lib/types/utils.types";
import { auth } from "@/auth";

export const metadata = smartCheckSEOHeader;
export default async function SmartCheck({
  searchParams,
}: {
  searchParams: { question?: string; questionId?: string };
}) {
  const session = await auth();

  return (
    <>
      <Navbar userImage={session?.user?.image ?? undefined} />
      <AIToolsContainer heading={formatToolsName(AIToolNames.SMARTCHECK)}>
        <SmartcheckClient
          question={searchParams.question}
          questionId={searchParams.questionId}
          isTypedQuestion={!searchParams.question}
        />
        <SmartCheckSEOFooter />
      </AIToolsContainer>
    </>
  );
}
