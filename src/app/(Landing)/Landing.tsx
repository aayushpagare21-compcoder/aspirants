import { Button } from "@/app/components/ui/button";
import React from "react";
import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";

export const LandingPage = () => {
  return (
    <section className="w-[90vw] xl:w-[80vw] 2xl:w-[50vw] h-[90vh] flex justify-between">
      <div className="flex flex-col justify-center mt-[6rem] gap-8 md:gap-12">
        <div className="font-[family-name:var(--font-gtsuper-medium)] text-black tracking-normal text-[5rem] leading-[4rem] lg:text-[7rem] lg:leading-[6rem]">
          Human <br /> {"stories & ideas"}
        </div>
        <div className="font-[family-name:var(--font-sohneone)] text-black text-[1.5rem] leading-none">
          A place to read, write and deepen your understanding
        </div>

        <SignInButton>
          <Button className="py-6 text-[1.2rem] w-[12rem] bg-[#1A8917] text-white lg:bg-black rounded-full mb-[1rem]">
            Start reading
          </Button>
        </SignInButton>
      </div>
      <Image
        src={"/images/medium.webp"}
        alt={"medium image here"}
        height={600}
        width={460}
        className="hidden xl:block absolute right-0 xl:bottom-[4vh] 2xl:bottom-[18vh] h-[600px] w-[460px] z-0"
      />
    </section>
  );
};
