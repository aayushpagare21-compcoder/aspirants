export type Provider = "google";
export interface BaseSignInInterface {
  provider: Provider;
}
export interface SignInWithGoogle extends BaseSignInInterface {
  provider: "google";
  redirectTo: string;
}

export type SignInParams = SignInWithGoogle;
