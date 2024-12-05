import { ArticlePYQsClient } from "@/app/components/ai/article-pyqs";
import { Navbar } from "@/app/components/shared/Header/Navbar";
import { auth } from "@/auth";

export default async function ArticlePYQs() {
  const session = await auth();
  return (
    <>
      <Navbar userImage={session?.user?.image ?? ""} />
      <ArticlePYQsClient />
    </>
  );
}
