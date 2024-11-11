"use client";

import { useState } from "react";
import SlidingNavbar from "../../shared/Caraousels/SlidingNavBar";
import { Divider } from "../../shared/Divider/Divider";
import {
  Papers,
  slidingNavBarStaticItems,
  Topics,
} from "@/app/lib/types/feed.types";
import { QuestionsList } from "./QuestionsList";

export const QuestionsContainer = ({ topics }: { topics: Topics[] }) => {
  // Filters which are to be shown on the navbar
  const [paper, setPaper] = useState<Papers | null>(null);
  const [topic, setTopic] = useState<string | null>(null);

  return (
    <>
      <Divider />
      <SlidingNavbar
        navItems={slidingNavBarStaticItems.concat(
          topics.map((topic) => {
            return {
              id: topic.name,
              label: topic.name,
              type: "topic",
            };
          }),
        )}
        onPaperClick={(paper: Papers | null) => {
          setPaper(paper);
        }}
        onTopicClick={(topic: string | null) => {
          setTopic(topic);
        }}
      />
      <QuestionsList paper={paper ?? undefined} topic={topic ?? undefined} />
    </>
  );
};
