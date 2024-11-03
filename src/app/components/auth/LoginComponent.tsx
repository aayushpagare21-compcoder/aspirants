import { AuthButtons } from "@/app/components/auth/AuthButtons";
const Header = () => {
  return (
    <h1 className="mb-4 text-center font-[family-name:var(--font-gtsuper-medium)] text-2xl text-[1.8rem] font-bold md:mb-10">
      Continue on <span className="font-bold text-green-800"> Aspirants.</span>
    </h1>
  );
};
const Footer = () => {
  return (
    <div className="flex flex-col gap-8 px-4 text-center md:mt-8">
      {" "}
      We are glad that you are back 🎉
    </div>
  );
};

export const LoginComponent = () => {
  return (
    <>
      <Header />
      <AuthButtons />
      <Footer />
    </>
  );
};
