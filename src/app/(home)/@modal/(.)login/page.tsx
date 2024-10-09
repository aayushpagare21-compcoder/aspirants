"use client";
import { Dialog } from "@/app/components/ui/dialog";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { MailIcon } from "lucide-react";
import { GoogleIcon } from "@/app/components/shared/Logo/GoogleIcon";
import { useState } from "react";
import { DialogContent } from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
enum ModalState {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
}

const Prompt = ({
  onRegisterPage,
  onClick,
}: {
  onRegisterPage: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="text-center">
      {onRegisterPage ? "Already have an account?" : "No account?"}{" "}
      <Link href="#" className="font-bold text-[#1a8917]" onClick={onClick}>
        {onRegisterPage ? "Sign in" : "Create one"}
      </Link>
    </div>
  );
};

const Footer = ({ onRegisterPage }: { onRegisterPage: boolean }) => {
  return (
    <div className="flex flex-col gap-8 px-4 text-center text-sm text-tertiary md:mt-8">
      {!onRegisterPage && (
        <div>
          {" "}
          Forgot email or trouble Signing in{" "}
          <Link href="#" className="underline">
            {" "}
            Get help{" "}
          </Link>
          .
        </div>
      )}
      <div>
        Click {onRegisterPage ? `"Sign in"` : `"Sign in"`} to agree{" "}
        {`"Medium's"`}{" "}
        <Link href="#" className="underline">
          Terms of Services{" "}
        </Link>
        and acknowledge that {`"Medium's"`}{" "}
        <Link href="#" className="underline">
          Privacy Policy{" "}
        </Link>
        applies to you.
      </div>
    </div>
  );
};

const Buttons = ({ onRegisterPage }: { onRegisterPage: boolean }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        variant="outline"
        className="flex w-[60%] rounded-full border border-black px-4 py-5 text-[1rem]"
      >
        <GoogleIcon />
        <div className="flex-1">
          {onRegisterPage ? "Sign up with Google" : "Sign in with Google"}
        </div>
      </Button>

      <Button
        variant="outline"
        className="flex w-[60%] rounded-full border border-black px-4 py-5 text-[1rem]"
      >
        <MailIcon />
        <div className="flex-1">
          {onRegisterPage ? "Sign up with email" : "Sign in with email"}
        </div>
      </Button>
    </div>
  );
};

const Header = ({ onRegisterPage }: { onRegisterPage: boolean }) => {
  return (
    <h1 className="mb-4 text-center font-[family-name:var(--font-gtsuper-medium)] text-2xl text-[1.8rem] font-bold md:mb-10">
      {onRegisterPage ? "Join Medium." : "Welcome Back."}
    </h1>
  );
};

export default function InterceptedLogin() {
  const [modalState, setModalState] = useState<ModalState>(ModalState.REGISTER);
  const onRegisterPage = modalState == ModalState.REGISTER;
  const router = useRouter();
  return (
    <>
      <div className="fixed inset-0 z-40 bg-[#ffffff] bg-opacity-50 backdrop-blur-sm" />
      <Dialog defaultOpen={true}>
        <DialogContent>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative flex h-full w-full flex-col justify-center gap-10 bg-white md:h-[42rem] md:w-[38rem] md:rounded-lg md:px-14 md:py-16 md:shadow-lg">
              <div className="absolute top-4 right-4">
                <button onClick={() => router.push("/")}>
                  <Cross2Icon className="w-6 h-6" />
                </button>
              </div>
              <Header onRegisterPage={onRegisterPage} />
              <Buttons onRegisterPage={onRegisterPage} />
              <Prompt
                onRegisterPage={onRegisterPage}
                onClick={() => {
                  setModalState(
                    onRegisterPage ? ModalState.LOGIN : ModalState.REGISTER,
                  );
                }}
              />
              <Footer onRegisterPage={onRegisterPage} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
