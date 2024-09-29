import { Welcome } from "@/app/components/Welcome";
import { LandingPage } from "@/app/components/Landing";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
export default function MainPage() {
  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <Welcome />
      </SignedIn>
    </>
  );
}
