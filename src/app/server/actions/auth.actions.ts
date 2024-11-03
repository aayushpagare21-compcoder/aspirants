"use server";
import { signIn, signOut } from "@/auth";
import { SignInParams } from "@/app/lib/types/auth.types";

const aspirantsSignIn = async (params: SignInParams): Promise<void> => {
  const { provider, ...rest } = params;
  await signIn(provider, rest);
};

const aspirantsSignOut = async (): Promise<void> => {
  await signOut({
    redirectTo: "/",
  });
};

export { aspirantsSignOut, aspirantsSignIn };
