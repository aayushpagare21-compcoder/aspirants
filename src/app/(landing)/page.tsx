import { Button } from "@/app/components/ui/button";
import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

type FeaturesCardProps = {
  cardTitle: React.ReactNode;
  cardContent: React.ReactNode;
  btnText?: string;
};

const FeaturesCard = ({ cardTitle, cardContent, btnText }: FeaturesCardProps) => (
  <Card className="max-w-md">
    <CardHeader>
      <CardTitle className="text-bold text-center text-[1.2rem]">
        {cardTitle}
      </CardTitle>
    </CardHeader>
    <CardContent>{cardContent}</CardContent>
    <CardFooter className="flex justify-center">
      <Button>
        <Link href="/login?redirectTo=/ai/answer-evaluator">
          {btnText ?? "Try Now 🚀"}
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

export default function LandingPage() {
  const features = [
    {
      title: (
        <>
          <span className="text-tertiary">AI </span>Answer Writing
        </>
      ),
      content: (
        <ul className="flex flex-col px-4 text-primary-foreground/70">
          <li>Choose a {`main's`} question, or type one.</li>
          <li>Upload handwritten pdf of your answers.</li>
          <li>Get a detailed feedback.</li>
        </ul>
      ),
    },
    {
      title: (
        <>
          Matching<span className="text-tertiary"> Mains {`PYQ's`} </span>
          from any article
        </>
      ),
      content: (
        <ul className="flex flex-col px-4 text-primary-foreground/70">
          <li>Paste link from any article.</li>
          <li>Get matching questions asked in UPSC mains exam.</li>
        </ul>
      ),
    },
    {
      title: (
        <>
          <span className="text-tertiary"> AI </span> tailored search engine for PYQs
        </>
      ),
      content: (
        <ul className="flex flex-col px-4 text-primary-foreground/70">
          <li>Search any mains question by subject, keywords, year or paper.</li>
        </ul>
      ),
      btnText: "Coming soon... 🚀",
    },
    {
      title: (
        <>
          Chat with<span className="text-tertiary"> Notes </span>
        </>
      ),
      content: (
        <ul className="flex flex-col px-4 gap-2 text-primary-foreground/70">
          <li>Upload your handwritten notes.</li>
          <li>Turn your notes into CHAT-GPT. Ask anything from your notes.</li>
        </ul>
      ),
      btnText: "Coming soon... 🚀",
    },
  ];

  return (
    <div className="flex max-w-screen-md flex-col items-center justify-center pt-8 md:pt-16 2xl:max-w-screen-2xl">
      {/* Hero Section */}
      <div id="hero">
        <h1 className="mb-8 text-center text-[2.5rem] leading-[3rem] tracking-tighter md:text-[4rem] md:leading-[4rem]">
          Everything UPSC preparations with{" "}
          <span className="text-tertiary">Aspirant</span>AI
        </h1>
        <p className="mb-8 text-center text-[1rem] text-primary-foreground/70 md:text-[1.3rem]">
          <i>
            Mains PYQs, Mains Evaluation, Search Engine, Article matching PYQs,
            and more...
          </i>
        </p>
        <div className="flex justify-center">
          <Button className="flex w-[12rem] rounded-full bg-[#F4CE14] py-6 text-[1.2rem] text-black hover:bg-[#F4CE14]/80">
            <Link href="/login">Start Free</Link>
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div
        id="stats"
        className="my-8 grid w-[100vw] grid-cols-4 rounded-xl p-8 shadow-xl"
      >
        {/* Add Stats Here */}
      </div>

      {/* Features Section */}
      <div id="features" className="flex flex-col items-center justify-center">
        <h2 className="mb-4 p-4 text-center text-[2rem] leading-[3rem] tracking-tight">
          Our <span className="text-tertiary">Interactive</span> Features
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {features.map((feature, idx) => (
            <FeaturesCard
              key={idx}
              cardTitle={feature.title}
              cardContent={feature.content}
              btnText={feature.btnText}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
