"use client";
import React, { useState, useEffect } from "react";
import SlidingNavbar from "../../shared/Caraousels/SlidingNavBar";
import { Divider } from "../../shared/Divider/Divider";
import {
  Papers,
  slidingNavBarStaticItems,
  Topics,
} from "@/app/lib/types/feed.types";
import { QuestionsList } from "./QuestionsList";
import { Navbar } from "../header/Navbar";
import { SearchModal } from "./SearchModal";

export const QuestionsContainer = ({
  topics,
  userImage,
}: {
  topics: Topics[];
  userImage?: string;
}) => {
  const [paper, setPaper] = useState<Papers | null>(null);
  const [topic, setTopic] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const updateIsMobileOrTablet = () => {
      setIsMobileOrTablet(window.innerWidth < 768);
    };
    updateIsMobileOrTablet();
    window.addEventListener("resize", updateIsMobileOrTablet);
    return () => window.removeEventListener("resize", updateIsMobileOrTablet);
  }, []);

  return (
    <>
      <SearchModal
        searchText={searchValue ?? ""}
        showSearchModal={showSearchModal}
        setShowSearchModal={setShowSearchModal}
        onChangeSearchText={(val) => setSearchValue(val)}
      />
      <Navbar
        userImage={userImage}
        onChangeSearchText={(val) => setSearchValue(val)}
        searchText={searchValue ?? ""}
        onSearchIconClick={() => {
          if (isMobileOrTablet) setShowSearchModal(true);
        }}
      />
      <Divider />
      <SlidingNavbar
        navItems={slidingNavBarStaticItems.concat(
          topics.map((topic) => ({
            id: topic.name,
            label: topic.name,
            type: "topic",
          })),
        )}
        onPaperClick={(paper: Papers | null) => setPaper(paper)}
        onTopicClick={(topic: string | null) => setTopic(topic)}
      />
      <QuestionsList
        paper={paper ?? undefined}
        topic={topic ?? undefined}
        searchValue={searchValue ?? undefined}
        setTopic={setTopic}
        setSearchValue={setSearchValue}
        setPaper={setPaper}
      />
    </>
  );
};
