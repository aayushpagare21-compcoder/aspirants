import { Button } from "@/app/components/ui/button";
import React from "react";

const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen bg-[#F7F4ED] text-black">
      {children}
    </div>
  );
};

const navitems = [
  { content: "Our Story" },
  { content: "Membership" },
  { content: "Write" },
  { content: "Sign In" },
];
const Navbar = () => {
  return (
    <div className="flex justify-center border border-b-black">
      <nav className="flex justify-between w-[90%] xl:w-[80%] 2xl:w-[60%]">
        <div className="font-bold text-[2rem] font-[family-name:var(--font-gtsuper-medium)] my-3 tracking-normal">
          Aspirant
        </div>
        <div>
          <ul className="flex gap-6 text-[13px] font-[family-name:var(--font-sohneone)]">
            {navitems.map((item, index) => {
              return (
                <li key={index} className="">
                  <a href=""> {item.content} </a>
                </li>
              );
            })}
            <li className="my-5">
              <Button className="px-4 py-2"> Get Started </Button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

const HeroSection = () => {
  return (
    <div className="flex justify-center border border-b-black items-center h-[85%]">
      <div className="flex flex-col gap-12 2xl:w-[60%] xl:w-[80%] w-[90%]">
        <div className="text-[4rem] leading-[4rem] max-w-[200px] sm:leading-[6rem] sm:text-[7rem] sm:max-w-[700px] font-[family-name:var(--font-gtsuper-medium)] m-0 p-0">
          {`Aspirant stories & ideas`}
        </div>
        <div className="text-[22px]">
          {" "}
          A place to read, write and deepen your understanding{" "}
        </div>
        <Button className="w-[196px] h-[46px] text-[1.2rem] bg-[#1A8917] lg:bg-black">
          {" "}
          Start reading{" "}
        </Button>
      </div>
    </div>
  );
};

export default function LandingPage() {
  return (
    <Page>
      <Navbar />
      <HeroSection />
    </Page>
  );
}
