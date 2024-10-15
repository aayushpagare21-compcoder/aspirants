"use server"

import {signIn} from "next-auth/react";
export async function signInWithGoogleAndRedirect(): Promise<void>  {
    return await signIn("google", {
        callbackUrl: "/feed",
    });
}