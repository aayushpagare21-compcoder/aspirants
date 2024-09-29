import { Button } from "@/app/components/ui/button";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";

const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#F7F4ED] h-[100vh] flex flex-col items-center">
      {children}
    </div>
  );
};

const Header = () => {
  return (
    <header>
      <nav className="flex justify-between w-[90vw] xl:w-[80vw] 2xl:w-[50vw] p-4 items-center">
        {/* forcing text black here because need consistent font color even in dark mode*/}
        <div className="font-[family-name:var(--font-gtsuper-medium)] text-[2rem] font-bold text-black">
          Medium
        </div>
        <div className="flex justify-around gap-8">
          <ul className="font-[family-name:var(--font-sohneone)] text-[14px] text-black items-center md:flex gap-6 hidden">
            <Link href="#">
              <li> Our Story</li>
            </Link>
            <Link href="#">
              <li> Membership</li>
            </Link>
            <Link href="#">
              <li> Write</li>
            </Link>
            <Link href="#">
              <li> Sign in</li>
            </Link>
          </ul>
          <div className="flex items-center">
            <SignInButton>
              <Button className="py-5 rounded-full w-[6.5rem] font-bold text-white">
                Get started
              </Button>
            </SignInButton>
          </div>
        </div>
      </nav>
    </header>
  );
};

const Divider = () => {
  return <div className="border border-b-black w-full"></div>;
};

const Hero = () => {
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

const Footer = () => {
  return (
    <footer className="w-full p-4 bg-black text-secondary lg:text-primary lg:bg-inherit z-10">
      <ul className="font-[family-name:var(--font-sohneone)] text-[12px] lg:text-[#6B6B6B] flex items-center justify-start lg:justify-center gap-6">
        <Link href="#">
          <li> Help</li>
        </Link>
        <Link href="#" className="hidden lg:block">
          <li> Status</li>
        </Link>
        <Link href="#">
          <li> About</li>
        </Link>
        <Link href="#" className="hidden lg:block">
          <li> Careers </li>
        </Link>
        <Link href="#" className="hidden lg:block">
          <li> Press </li>
        </Link>
        <Link href="#" className="hidden lg:block">
          <li> Blog </li>
        </Link>
        <Link href="#">
          <li> Privacy</li>
        </Link>
        <Link href="#" className="hidden lg:block">
          <li> Text to speech</li>
        </Link>
        <Link href="#">
          <li> Terms </li>
        </Link>
      </ul>
    </footer>
  );
};

export const LandingPage = () => {
  return (
    <Page>
      <Header />
      <Divider />
      <Hero />
      <Divider />
      <Footer />
    </Page>
  );
};
