"use client";
import { AspirantsLogo } from "@/app/components/shared/Logo/AspirantsLogo";
import { SearchBar } from "@/app/components/shared/Header/SearchBar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { RefObject, useRef, useState } from "react";
import useOutsideClick from "@/app/hooks/useOutsideClick";
import { aspirantsSignOut } from "@/app/server/actions/auth.actions";
import { usePathname } from "next/navigation";

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
  const path = usePathname();

  useOutsideClick(ref, () => {
    setShowProfileTab(false);
  });

  return (
    <nav className="flex items-center justify-between bg-gray-50 px-4 py-2 shadow-md lg:px-8">
      <div className="flex items-center gap-4">
        <AspirantsLogo />
        <div className="hidden md:block">
          <Link
            href="/feed"
            className={`text-sm font-medium text-primary-foreground hover:text-gray-900 hover:underline ${path === "/feed" ? "text-green-700" : ""}`}
          >
            Mains PYQs
          </Link>
        </div>
        <div className="hidden md:block">
          <Link
            href="/ai/answer-evaluator"
            className={`text-sm font-medium text-primary-foreground hover:text-gray-900 hover:underline ${path === "/ai/answer-evaluator" ? "text-green-700" : ""}`}
          >
            AI Answer Evaluator
          </Link>
        </div>
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
                <div className="absolute -left-16 top-1 z-50 rounded-lg shadow-lg">
                  <div className="absolute -top-2 left-16 z-10 h-4 w-4 rotate-[45deg] border-l border-t"></div>
                  <ul className="flex flex-col">
                    <li>
                      <Button
                        onClick={async () => {
                          await aspirantsSignOut();
                        }}
                        className="w-full text-sm font-medium hover:underline"
                      >
                        Logout
                      </Button>
                    </li>
                    <li>
                      <Link href="/ai/answer-evaluator">
                        <Button
                          className={`text-sm font-medium hover:underline ${path === "/ai/answer-evaluator" ? "text-green-700" : ""}`}
                        >
                          AI answer writing
                        </Button>
                      </Link>
                    </li>
                    <li>
                      <Link href="/feed">
                        <Button
                          className={`w-full text-sm font-medium hover:underline ${path === "/feed" ? "text-green-700" : ""}`}
                        >
                          Mains PYQs
                        </Button>
                      </Link>
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
