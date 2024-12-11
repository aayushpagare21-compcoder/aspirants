"use client";
import { AspirantsLogo } from "../shared/Logo/AspirantsLogo";
import { AuthButtons } from "./AuthButtons";
const Header = () => {
  return ( 
    <div className="flex justify-center mb-4"> 
      <AspirantsLogo />
    </div>
  )
};
const Footer = () => {
  return (
    <div className="mt-4 flex flex-col gap-8 px-4 text-center">
      {" "}
      Good to Have You Back, Aspirant! 💪
      {`Let’s make today another productive step toward success.`}
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
