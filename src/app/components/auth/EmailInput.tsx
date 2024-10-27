import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { aspirantsSignIn } from "@/app/server/actions/auth.actions";

export const EmailInput = ({ onBack }: { onBack: () => void }) => {
  const [email, setEmail] = useState<string>("");
  return (
    <div className="-mt-6 flex flex-col items-center justify-center">
      <input
        placeholder="sm@gmail.com"
        className="w-[60%] border-2 border-primary p-2"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="flex justify-between">
        <Button
          className="w-[20%]"
          variant="link"
          onClick={() =>
            aspirantsSignIn({
              provider: "resend",
              email,
            })
          }
        >
          Continue
        </Button>

        <Button className="w-[20%]" variant="link" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
};
