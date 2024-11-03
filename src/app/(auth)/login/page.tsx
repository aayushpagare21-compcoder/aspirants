"use client";
import { LoginComponent } from "@/app/components/auth/LoginComponent";
export default function LoginPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col gap-4 p-8 pt-12 md:h-[20rem] md:w-[30rem] md:rounded-lg md:bg-accent md:shadow-lg">
        <LoginComponent />
      </div>
    </div>
  );
}
