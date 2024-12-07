"use client";
import { SearchIcon } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { Input } from "../../ui/input";

export const SearchBar = ({
  searchText,
  onChangeSearchText,
  onSearchIconClick,
  searchBarStyles,
  searchIconStyles,
  containerClasses,
}: {
  searchText?: string;
  onChangeSearchText?: (searchVal: string) => void;
  onSearchIconClick?: () => void;
  searchBarStyles?: string;
  searchIconStyles?: string;
  containerClasses?: string;
}) => {
  return (
    <div className="relative">
      <div
        className={cn(
          "flex h-8 items-center gap-1 rounded-full px-2 py-5",
          containerClasses,
        )}
      >
        <SearchIcon
          className={cn("h-[1.5rem] w-[2rem] cursor-pointer", searchIconStyles)}
          strokeWidth={1}
          onClick={onSearchIconClick}
        />
        <Input
          className={cn(
            "focus-visible:none hidden h-6 border-none bg-inherit p-2 shadow-none md:block",
            searchBarStyles,
          )}
          placeholder="Search"
          value={searchText ?? ""}
          onChange={(e) => {
            onChangeSearchText?.(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
