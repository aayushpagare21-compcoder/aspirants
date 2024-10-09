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
    <li key={name} className="flex cursor-pointer items-center p-1 text-sm">
      <Image
        height={32}
        width={32}
        src={image}
        alt={name}
        className="mr-2 h-8 w-8 rounded-full"
      />
      <span>{name}</span>
    </li>
  );
};

function SearchResults({ data }: { data: SearchApiResponse[] }) {
  return (
    <div className="absolute top-0 z-20 hidden w-[320px] overflow-y-hidden p-4 shadow-custom md:block">
      {data.map((item) => {
        if (item.searchKey == "USER") {
          return item.data.length > 0 ? (
            <div key={item.searchKey}>
              <div className="p-1 text-[0.8rem] font-normal tracking-wide text-tertiary">
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
              <div className="p-1 text-[0.8rem] font-normal tracking-wide text-tertiary">
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
              <div className="p-1 text-[0.8rem] font-normal tracking-wide text-tertiary">
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
  const ref = useRef<HTMLElement>();
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
      <div className="flex h-8 items-center gap-1 rounded-full bg-primary-foreground px-2 py-5">
        <SearchIcon className="h-[1.5rem] w-[2rem]" strokeWidth={1} />
        <Input
          className="focus-visible:none hidden h-6 border-none bg-primary-foreground p-2 shadow-none md:block"
          placeholder="Search"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </div>
      {combinedFilteredResults.every((result) => result.data.length !== 0) && (
        // @ts-expect-error TODO: Idk how to fix this now. Running outta time.
        <div className="relative" ref={ref}>
          <div className="absolute -top-2 left-8 z-10 h-4 w-4 rotate-[45deg] border-l border-t bg-white"></div>
          <SearchResults data={combinedFilteredResults} />
        </div>
      )}
    </div>
  );
};
