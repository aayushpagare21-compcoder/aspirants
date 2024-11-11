"use client";
import React, { useState, useRef } from "react";
import { Button } from "../../ui/button";
import { Papers } from "@/app/lib/types/feed.types";

interface NavItem {
  id: string;
  label: string;
  type: string;
}

export const SlidingNavbar = ({
  navItems,
  onPaperClick,
  onTopicClick,
}: {
  navItems: NavItem[];
  onPaperClick: (paper: Papers | null) => void;
  onTopicClick: (topic: string | null) => void;
}) => {
  const [activeTab, setActiveTab] = useState<string>("All");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (itemId: string) => {
    setActiveTab(itemId);

    const container = scrollContainerRef.current;
    if (!container) return;

    const buttonElement = container.querySelector(
      `[data-tab-id="${itemId}"]`,
    ) as HTMLButtonElement;
    if (!buttonElement) return;

    buttonElement.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <div className="shadow-b-lg relative mx-auto my-4 w-[100vw] rounded-lg md:w-[80vw] xl:w-[60vw]">
      <div
        ref={scrollContainerRef}
        className="aspirants-scrollbar flex space-x-2 overflow-x-auto scroll-smooth px-4 py-2"
      >
        {navItems?.map((item) => (
          <Button
            variant={"link"}
            key={item.id}
            data-tab-id={item.id}
            onClick={() => {
              if (item.id === "All") {
                onPaperClick(null);
                onTopicClick(null);
              } else if (item.type === "paper") {
                onPaperClick(item.id as Papers);
                onTopicClick(null);
              } else if (item.type === "topic") {
                onTopicClick(item.id as string);
                onPaperClick(null);
              }
              handleTabClick(item.id);
            }}
            className={`text-center transition-all duration-300 ${
              activeTab === item.id
                ? "scale-105 text-tertiary"
                : "bg-primary text-primary-foreground hover:text-tertiary"
            }`}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SlidingNavbar;
