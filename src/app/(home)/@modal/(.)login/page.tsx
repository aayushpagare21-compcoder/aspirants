"use client";
import { Dialog } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { MailIcon } from "lucide-react";
import { GoogleIcon } from "@/app/components/shared/Logo/GoogleIcon";
import { DialogContent } from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
const Buttons = ({
  showEmailButton,
  onClickEmailButton,
}: {
  showEmailButton: boolean;
  onClickEmailButton: () => void;
}) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        variant="outline"
        className="flex w-[60%] rounded-full px-4 py-5 text-[1rem]"
        onClick={async function () {
          await signIn("google", {
            callbackUrl: "/feed",
          });
        }}
      >
        <GoogleIcon />
        <div className="flex-1">Continue with Google</div>
      </Button>

      {showEmailButton && (
        <Button
          variant="outline"
          className="flex w-[60%] rounded-full border border-black px-4 py-5 text-[1rem]"
          onClick={onClickEmailButton}
        >
          <MailIcon />
          <div className="flex-1">Continue with email</div>
        </Button>
      )}
    </div>
  );
};

const Header = () => {
  return (
    <h1 className="mb-4 text-center font-[family-name:var(--font-gtsuper-medium)] text-2xl text-[1.8rem] font-bold md:mb-10">
      Continue on <span className="font-bold text-green-800"> Aspirants.</span>
    </h1>
  );
};

const Footer = () => {
  return (
    <div className="flex flex-col gap-8 px-4 text-center md:mt-8">
      {" "}
      We are glad that you are back 🎉
    </div>
  );
};

const EmailInput = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="-mt-6 flex flex-col items-center justify-center">
      <input
        placeholder="mandirshrusti2811@gmail.com"
        className="w-[60%] border-2 border-primary p-2"
        type="email"
      />
      <div className="flex justify-between">
        <Button className="w-[20%]" variant="link">
          {" "}
          Continue{" "}
        </Button>

        <Button className="w-[20%]" variant="link" onClick={onBack}>
          {" "}
          Back{" "}
        </Button>
      </div>
    </div>
  );
};

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
              <Header />
              <Buttons
                onClickEmailButton={() => {
                  setShowEmailInput(true);
                }}
                showEmailButton={!showEmailInput}
              />
              {showEmailInput && (
                <EmailInput
                  onBack={() => {
                    setShowEmailInput(false);
                  }}
                />
              )}
              <Footer />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
