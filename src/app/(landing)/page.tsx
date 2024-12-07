import React from "react";
import { Metadata } from "next";
import { LandingPageFooter } from "../client/components/landing/LandingPageFooter";
import { LandingPageNavBar } from "../client/components/landing/LandingPageNavbar";
import LandingPageContent from "../client/components/landing/LandingPageContent";
export const metadata: Metadata = {
  title: "AspirantsAI | AI-Powered Tools for UPSC Preparation",
  description:
    "AspirantsAI is an all-in-one platform offering AI-driven tools to enhance UPSC preparation. From AffairsQuest for linking current affairs to UPSC Mains PYQs, to SmartCheck for AI-powered answer evaluation, our suite of tools helps aspirants prepare smarter and achieve their goals.",
  abstract:
    "AspirantsAI is an all-in-one platform that leverages artificial intelligence to enhance the preparation process for UPSC Mains aspirants. It features AffairsQuest, an intelligent tool that connects current affairs to relevant PYQs, and SmartCheck, which provides detailed feedback on handwritten answers. Designed to streamline studies, AspirantsAI empowers aspirants with efficient search capabilities, insightful answer reviews, and tools for comprehensive preparation. Whether you're aiming to master current affairs, improve answer-writing skills, or access tailored resources, AspirantsAI is your companion for UPSC success.",
  keywords: [
    "AspirantsAI",
    "UPSC preparation tools",
    "AI for UPSC",
    "UPSC Mains answer evaluation",
    "current affairs UPSC",
    "AffairsQuest",
    "SmartCheck",
    "AI-powered UPSC platform",
    "UPSC study tools",
  ],
  authors: [
    {
      name: "Aayush Pagare",
    },
  ],
  robots: "index, follow",
  publisher: "Aayush Pagare",
  applicationName: "AspirantsAI",
  creator: "Aayush Pagare",
};

export default function LandingPage() {
  return (
    <div className="flex h-[100vh] flex-col items-center gap-8 bg-primary">
      <LandingPageNavBar />
      <LandingPageContent />
      <LandingPageFooter />
    </div>
  );
}
