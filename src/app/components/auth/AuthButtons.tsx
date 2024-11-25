import { Button } from "@/app/components/ui/button";
import { aspirantsSignIn } from "@/app/server/actions/auth.actions";
import { GoogleIcon } from "@/app/components/shared/Logo/GoogleIcon";
export const AuthButtons = ({ redirectTo }: { redirectTo: string }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        variant="outline"
        className="flex w-[80%] rounded-full px-4 py-5 text-[1rem] sm:w-[60%]"
        onClick={() =>
          aspirantsSignIn({
            provider: "google",
            redirectTo: redirectTo,
          })
        }
      >
        <GoogleIcon />
        <div className="flex-1">Continue with Google</div>
      </Button>
    </div>
  );
};
