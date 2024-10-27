export type Provider = "google" | "resend";

export interface BaseSignInInterface {
  provider: Provider;
}

export interface SignInWithGoogle extends BaseSignInInterface {
  provider: "google";
  redirectTo: "/feed";
}

export interface SignInWithResend extends BaseSignInInterface {
  provider: "resend";
  email: string;
}

export type SignInParams = SignInWithGoogle | SignInWithResend;
