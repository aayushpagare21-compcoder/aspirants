"use client";
import { useState } from "react";
import { LoginComponent } from "@/app/components/auth/LoginComponent";
import { aspirantsSignIn } from "@/app/server/actions/auth.actions";
export default function LoginPage() {
  const [showEmailInput, setShowEmailInput] = useState<boolean>(false);
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex w-full flex-col gap-4 p-8 pt-12 md:h-[20rem] md:w-[30rem] md:rounded-lg md:bg-accent md:shadow-lg">
        <LoginComponent
          setShowEmailInput={setShowEmailInput}
          showEmailInput={showEmailInput}
          onSignIn={(provider) => aspirantsSignIn(provider)}
        />
      </div>
    </div>
  );
}
