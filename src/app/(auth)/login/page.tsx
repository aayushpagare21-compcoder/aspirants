"use client";
import { useState } from "react";
import { LoginComponent } from "@/app/components/auth/LoginComponent";
import { aspirantsSignIn } from "@/app/server/actions/auth.actions";
export default function LoginPage() {
  const [showEmailInput, setShowEmailInput] = useState<boolean>(false);
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col justify-center gap-10 md:h-[42rem] md:w-[38rem] md:rounded-lg md:px-14 md:py-16">
        <LoginComponent
          setShowEmailInput={setShowEmailInput}
          showEmailInput={showEmailInput}
          onSignIn={(provider) => aspirantsSignIn(provider)}
        />
      </div>
    </div>
  );
}
