"use client";
import { useState } from "react";
import { LoginComponent } from "@/app/components/shared/auth/LoginComponent";
export default function LoginPage() {
  const [showEmailInput, setShowEmailInput] = useState<boolean>(false);
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col justify-center gap-10 md:h-[42rem] md:w-[38rem] md:rounded-lg md:px-14 md:py-16">
        <LoginComponent
          setShowEmailInput={setShowEmailInput}
          showEmailInput={showEmailInput}
        />
      </div>
    </div>
  );
}
