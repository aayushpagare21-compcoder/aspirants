"use server";
import { signIn } from "@/auth";
import { SignInParams } from "@/app/lib/types/auth.types";

export const aspirantsSignIn = async (params: SignInParams): Promise<void> => {
  const { provider, ...rest } = params;
  console.log("=========params=======", params, rest, provider);
  await signIn(provider, rest);
};
