import { auth } from "@clerk/nextjs/server";
import { LandingPage } from "./Landing";
import { Welcome } from "./Welcome";

const MainPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return <LandingPage />;
  }
  return <Welcome />;
};

export default MainPage;
