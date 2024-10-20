import { Button } from "@/app/components/ui/button";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "@/app/components/shared/Logo/GoogleIcon";
import { MailIcon } from "lucide-react";

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
        placeholder="sm@gmail.com"
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
export const LoginComponent = ({
  showEmailInput,
  setShowEmailInput,
}: {
  showEmailInput: boolean;
  setShowEmailInput: (
    value: ((prevState: boolean) => boolean) | boolean,
  ) => void;
}) => {
  return (
    <>
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
    </>
  );
};
