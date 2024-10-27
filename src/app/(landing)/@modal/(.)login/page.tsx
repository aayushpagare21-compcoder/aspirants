"use client";
import { Dialog } from "@/app/components/ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginComponent } from "@/app/components/auth/LoginComponent";
import { aspirantsSignIn } from "@/app/server/actions/auth.actions";
export default function InterceptedLogin() {
  const [showEmailInput, setShowEmailInput] = useState<boolean>(false);
  const router = useRouter();
  return (
    <>
      <div className="fixed inset-0 z-40 bg-[#ffffff] bg-opacity-50 backdrop-blur-sm" />
      <Dialog defaultOpen={true}>
        <DialogContent>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative flex h-full w-full flex-col justify-center gap-10 bg-accent md:h-[42rem] md:w-[38rem] md:rounded-lg md:px-14 md:py-16 md:shadow-lg">
              <div className="absolute right-4 top-4">
                <button onClick={() => router.push("/")}>
                  <Cross2Icon className="h-6 w-6" />
                </button>
              </div>
              <LoginComponent
                showEmailInput={showEmailInput}
                setShowEmailInput={setShowEmailInput}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
