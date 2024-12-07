"use client";
import { AuthButtons } from "./AuthButtons";
const Header = () => {
  return (
    <h1 className="mb-4 text-center font-[family-name:var(--font-gtsuper-medium)] text-2xl text-[1.8rem] font-bold md:mb-10">
      Continue on <span className="font-bold text-green-800"> Aspirants.</span>
    </h1>
  );
};
const Footer = () => {
  return (
    <div className="mt-4 flex flex-col gap-8 px-4 text-center">
      {" "}
      We are glad that you are back 🎉
    </div>
  );
};

export const LoginComponent = ({ redirectTo }: { redirectTo: string }) => {
  return (
    <>
      <Header />
      <AuthButtons redirectTo={redirectTo} />
      <Footer />
    </>
  );
};
