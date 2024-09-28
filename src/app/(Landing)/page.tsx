import { Button } from "@/app/components/ui/button";
import React from "react";
export default function LandingPage() {
  return (
    <div className="bg-[#F7F4ED] h-[100vh] flex flex-col items-center">
      <header>
        <nav className="flex justify-between w-[90vw] xl:w-[80vw] 2xl:w-[50vw] p-4 items-center">
          <div className="font-[family-name:var(--font-gtsuper-medium)] text-[2rem] font-bold">
            Medium
          </div>
          <div className="flex justify-around gap-8">
            <ul className="font-[family-name:var(--font-sohneone)] text-[14px] items-center md:flex gap-6 hidden">
              <li> Our Story</li>
              <li> Membership</li>
              <li> Write</li>
              <li> Sign in</li>
            </ul>
            <div className="flex items-center">
              <Button className="py-5 rounded-full w-[6.5rem] font-bold">
                {" "}
                Get started{" "}
              </Button>
            </div>
          </div>
        </nav>
      </header>
      <div className="border border-b-black w-full"></div>
      <section className="w-[90vw] xl:w-[80vw] 2xl:w-[50vw] h-[90vh] flex justify-between">
        <div className="flex flex-col justify-center mt-[6rem] gap-8 md:gap-12">
          <div className="font-[family-name:var(--font-gtsuper-medium)] tracking-normal text-[5rem] leading-[4rem] lg:text-[7rem] lg:leading-[6rem]">
            Human <br /> {"stories & ideas"}
          </div>
          <div className="font-[family-name:var(--font-sohneone)] text-[1.5rem] leading-none">
            A place to read, write and deepen your understanding
          </div>
          <Button className="py-6 text-[1.2rem] w-[12rem] bg-[#1A8917] lg:bg-black rounded-full mb-[1rem]">
            Start reading
          </Button>
        </div>
      </section>
      <div className="border border-b-black w-full"></div>
      <footer className="w-full lg:w-[90vw] p-4 bg-black text-secondary lg:text-primary lg:bg-inherit">
        <ul className="font-[family-name:var(--font-sohneone)] text-[12px] lg:text-[#6B6B6B] flex items-center justify-start lg:justify-center gap-6">
          <li> Help</li>
          <li className="hidden lg:block"> Status</li>
          <li> About</li>
          <li className="hidden lg:block"> Careers</li>
          <li className="hidden lg:block"> Press</li>
          <li className="hidden lg:block"> Blog</li>
          <li> Privacy</li>
          <li className="hidden lg:block"> Text to speech</li>
          <li> Terms</li>
        </ul>
      </footer>
    </div>
  );
}
