"use client";
import { AspirantsLogo } from "../shared/Logo/AspirantsLogo";
import { AuthButtons } from "./AuthButtons";
const Header = () => {
  return (
    <div className="mb-4 flex justify-center">
      <AspirantsLogo />
    </div>
  );
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
    <section id="login_page">
      <Header />
      <AuthButtons redirectTo={redirectTo} />
      <Footer />
    </section>
  );
};
