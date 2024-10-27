import { Button } from "@/app/components/ui/button";
import { aspirantsSignIn } from "@/app/server/actions/auth.actions";
import { GoogleIcon } from "@/app/components/shared/Logo/GoogleIcon";
import { MailIcon } from "lucide-react";

export const AuthButtons = ({
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
        onClick={() =>
          aspirantsSignIn({
            provider: "google",
            redirectTo: "/feed",
          })
        }
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
