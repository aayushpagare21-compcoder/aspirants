"use client";
import { SearchIcon } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { useRef, useState } from "react";
import { Divider } from "@/app/components/shared/Divider/Divider";
import { SearchApiResponse } from "@/app/lib/types/searchAPI.types";
import {
  mockPublicationSearchApiResponse,
  mockTopicSearchApiResponse,
  mockUserSearchApiResponse,
} from "@/app/lib/mocks/searchAPI.mock";
import useOutsideClick from "@/app/hooks/useOutsideClick";
import Image from "next/image";

const SearchResultsSection = ({
  name,
  image,
}: {
  name: string;
  image: string;
}) => {
  return (
    <li key={name} className="flex items-center p-1 cursor-pointer text-sm">
      <Image
        height={32}
        width={32}
        src={image}
        alt={name}
        className="w-8 h-8 rounded-full mr-2"
      />
      <span>{name}</span>
    </li>
  );
};

function SearchResults({ data }: { data: SearchApiResponse[] }) {
  return (
    <div className="p-4 hidden md:block top-0 absolute w-[320px] overflow-y-hidden z-20 shadow-custom">
      {data.map((item) => {
        if (item.searchKey == "USER") {
          return item.data.length > 0 ? (
            <div key={item.searchKey}>
              <div className="text-tertiary text-[0.8rem] font-normal tracking-wide p-1">
                PEOPLE
              </div>
              <Divider />
              <ul>
                {item.data.map((user) => {
                  return (
                    <SearchResultsSection
                      key={`${user.firstName}-${user.lastName}`}
                      name={`${user.firstName}-${user.lastName}`}
                      image={user.image}
                    />
                  );
                })}
              </ul>
            </div>
          ) : (
            <> </>
          );
        } else if (item.searchKey === "PUBLICATION") {
          return item.data.length > 0 ? (
            <div key={item.searchKey}>
              <div className="text-tertiary text-[0.8rem] font-normal tracking-wide p-1">
                PUBLICATIONS
              </div>
              <Divider />
              <ul>
                {item.data.map((publication) => {
                  return (
                    <SearchResultsSection
                      key={publication.name}
                      name={publication.name}
                      image={publication.image}
                    />
                  );
                })}
              </ul>
            </div>
          ) : (
            <> </>
          );
        } else {
          return item.data.length > 0 ? (
            <div key={item.searchKey}>
              <div className="text-tertiary text-[0.8rem] font-normal tracking-wide p-1">
                TOPICS
              </div>
              <Divider />
              <ul>
                {item.data.map((topic) => {
                  return (
                    <SearchResultsSection
                      key={topic.name}
                      name={topic.name}
                      image={topic.image}
                    />
                  );
                })}
              </ul>
            </div>
          ) : (
            <> </>
          );
        }
      })}
    </div>
  );
}

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const ref = useRef();
  useOutsideClick(ref, () => {
    setSearchValue("");
  });

  const filteredUsers = mockUserSearchApiResponse.data.filter(
    (user) =>
      searchValue &&
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchValue.toLowerCase()),
  );

  const filteredPublications = mockPublicationSearchApiResponse.data.filter(
    (pub) =>
      searchValue && pub.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const filteredTopics = mockTopicSearchApiResponse.data.filter(
    (topic) =>
      searchValue &&
      topic.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const combinedFilteredResults: SearchApiResponse[] = [
    { searchKey: "USER", data: filteredUsers },
    { searchKey: "PUBLICATION", data: filteredPublications },
    { searchKey: "TOPIC", data: filteredTopics },
  ];

  return (
    <div className="relative">
      <div className="flex items-center gap-1 rounded-full h-8 py-5 px-2 bg-primary-foreground">
        <SearchIcon className="h-[1.5rem] w-[2rem]" strokeWidth={1} />
        <Input
          className="border-none p-2 h-6 hidden md:block focus-visible:none bg-primary-foreground shadow-none"
          placeholder="Search"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </div>
      {combinedFilteredResults.every((result) => result.data.length !== 0) && (
        <div className="relative" ref={ref}>
          <div className="w-4 h-4 absolute left-8 -top-2 rotate-[45deg] border-t border-l z-10 bg-white"></div>
          <SearchResults data={combinedFilteredResults} />
        </div>
      )}
    </div>
  );
};
