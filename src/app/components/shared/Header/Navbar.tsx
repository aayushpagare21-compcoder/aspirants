"use client";
import { AspirantsLogo } from "@/app/components/shared/Logo/AspirantsLogo";
import { SearchBar } from "@/app/components/shared/Header/SearchBar";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { RefObject, useRef, useState } from "react";
import useOutsideClick from "@/app/hooks/useOutsideClick";
import { aspirantsSignOut } from "@/app/server/actions/auth.actions";

export const Navbar = ({
  userImage,
  onChangeSearchText,
  onSearchIconClick,
  searchText,
}: {
  userImage?: string;
  onSearchIconClick?: () => void;
  onChangeSearchText?: (s: string) => void;
  searchText?: string;
  hideSearchBar?: boolean;
}) => {
  const [showProfileTab, setShowProfileTab] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>();

  useOutsideClick(ref, () => {
    setShowProfileTab(false);
  });

  return (
    <nav className="flex justify-between px-8 py-2">
      <div className="flex items-center gap-4">
        <AspirantsLogo />
        {onChangeSearchText && (
          <SearchBar
            onChangeSearchText={onChangeSearchText}
            onSearchIconClick={onSearchIconClick}
            searchText={searchText}
          />
        )}
      </div>
      {userImage && (
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <div
              className="relative h-10 w-10 overflow-hidden rounded-full"
              onClick={() => setShowProfileTab(!showProfileTab)}
              aria-label="Profile menu"
            >
              <Image
                // TODO: default image
                src={userImage ?? "/default-profile.jpg"}
                alt="Profile Picture"
                layout="fill"
                objectFit="cover"
                className="hover:cursor-pointer"
              />
            </div>
            {showProfileTab && (
              <div className="relative" ref={ref as RefObject<HTMLDivElement>}>
                <div className="absolute -left-3 top-1 rounded-lg shadow-lg">
                  <div className="absolute -top-2 left-8 z-10 h-4 w-4 rotate-[45deg] border-l border-t"></div>
                  <ul>
                    <li>
                      <Button
                        onClick={async () => {
                          await aspirantsSignOut();
                        }}
                      >
                        Logout
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
