"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AIToolNames, formatToolsName } from "@/app/lib/types/utils.types";
import KeywordHighlighter from "../shared/KeywordHighlighter";
import { motion, useInView } from "framer-motion";

// Types
type FeaturesCardProps = {
  cardTitle: React.ReactNode;
  cardContent: React.ReactNode;
  btnText?: string;
  link: string;
  index: number;
};

const featuresData = [
  {
    title: (
      <>
        <span className="text-tertiary">AI </span>
        {formatToolsName(AIToolNames.SMARTCHECK)}
      </>
    ),
    content: `
      Aspirants can upload their PDFs, and SmartCheck's advanced AI analyzes key aspects such as content accuracy, structure, clarity, and depth. The tool offers valuable, actionable feedback to help users improve their answer-writing skills and boost their exam performance.
    `,
    keywords: ["SmartCheck", "answer-writing", "AI", "Aspirants"],
    link: "/login?redirectTo=/ai/smartcheck",
  },
  {
    title: (
      <>
        <span className="text-tertiary">AI </span>
        {formatToolsName(AIToolNames.AFFAIRS_QUEST)}
      </>
    ),
    content: `
      AffairsQuest is an AI-powered tool that connects articles from The Hindu newspaper with UPSC Mains PYQs. It simplifies preparation by linking current affairs to exam-relevant questions, providing aspirants with valuable insights.
    `,
    keywords: [
      "AffairsQuest",
      "AI",
      "The Hindu",
      "UPSC Mains",
      "Aspirants",
      "newspaper",
    ],
    link: "/login?redirectTo=/ai/affairs-quest",
  },
  {
    title: (
      <>
        <span className="text-tertiary">AI </span>
        {formatToolsName(AIToolNames.QUERY_MAINS)}
      </>
    ),
    content: `
      This AI-driven search engine helps UPSC Mains aspirants quickly find relevant questions from past exams. It delivers accurate, topic-specific search results, making exam preparation more efficient.
    `,
    keywords: [
      "Query Mains",
      "AI",
      "Aspirants",
      "UPSC",
      "search engine",
      "accurate",
      "topic-specific",
    ],
    link: "/login?redirectTo=/feed",
    btnText: "Coming soon... 🚀",
  },
  {
    title: (
      <>
        <span className="text-tertiary">AI </span>
        {formatToolsName(AIToolNames.NOTETALK)}
      </>
    ),
    content: `
      Your ultimate UPSC preparation companion transforms how aspirants study and retain information. It turns your handwritten notes into an interactive learning tool, helping you master complex subjects with ease.
    `,
    keywords: ["UPSC", "aspirants", "handwritten", "assistant", "personalized"],
    link: "/login?redirectTo=/feed",
    btnText: "Coming soon... 🚀",
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", damping: 12, stiffness: 100 },
  },
};

const FeaturesCard = ({
  cardTitle,
  cardContent,
  btnText,
  link,
  index,
}: FeaturesCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -100 }}
      transition={{
        duration: 0.5,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
    >
      <Card className="flex h-[23rem] max-w-md flex-col">
        <CardHeader>
          <CardTitle className="text-bold text-center text-[1.2rem]">
            {cardTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <KeywordHighlighter keywords={featuresData[index].keywords}>
            {cardContent}
          </KeywordHighlighter>
        </CardContent>
        <CardFooter className="mt-auto flex justify-center pb-4 pt-4">
          <Button variant="transparentTertiary">
            <Link href={link}>{btnText ?? "Try Now 🚀"}</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const HeroSection = () => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="w-full text-center"
  >
    <motion.h1
      className="mb-8 text-[2.5rem] leading-[3rem] tracking-tighter md:text-[4rem] md:leading-[4rem]"
      variants={itemVariants}
    >
      Everything UPSC preparations with{" "}
      <span className="text-tertiary">Aspirant</span>AI
    </motion.h1>
    <motion.p
      className="mb-8 text-[1rem] text-primary-foreground/70 md:text-[1.3rem]"
      variants={itemVariants}
    >
      <i>
        Mains PYQs, Mains Evaluation, Search Engine, Article matching PYQs, and
        more...
      </i>
    </motion.p>
    <motion.div className="flex justify-center" variants={itemVariants}>
      <Button className="flex w-[12rem] rounded-full bg-[#F4CE14] py-6 text-[1.2rem] text-black hover:bg-[#F4CE14]/80">
        <Link href="/login">Start Free</Link>
      </Button>
    </motion.div>
  </motion.div>
);

const FeaturesSection = () => (
  <div id="features" className="flex flex-col items-center justify-center">
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.h2
        className="mb-4 p-4 text-[1.5rem] leading-[3rem] tracking-tight md:text-[2rem]"
        variants={itemVariants}
      >
        Our <span className="text-tertiary">Interactive</span> Features
      </motion.h2>
    </motion.div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
      {featuresData.map((feature, idx) => (
        <FeaturesCard
          key={idx}
          index={idx}
          cardTitle={feature.title}
          cardContent={feature.content}
          btnText={feature.btnText}
          link={feature.link}
        />
      ))}
    </div>
  </div>
);

const LandingPageContent = () => (
  <div className="flex max-w-screen-md flex-col items-center justify-center pt-8 md:pt-16 2xl:max-w-screen-2xl">
    <HeroSection />
    <div
      id="stats"
      className="my-8 grid w-[100vw] grid-cols-4 rounded-xl p-8 shadow-lg"
    >
      {/* Add Stats Here */}
    </div>
    <FeaturesSection />
  </div>
);

export default LandingPageContent;
