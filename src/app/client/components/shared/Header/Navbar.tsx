"use client";
import Image from "next/image";
import Link from "next/link";
import { aspirantsSignOut } from "@/app/server/actions/auth.actions";
import { usePathname } from "next/navigation";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { SquareMenuIcon } from "lucide-react";
import { Divider } from "../Divider/Divider";
import { AIToolNames, formatToolsName } from "@/app/lib/types/utils.types";
import { AspirantsLogo } from "../Logo/AspirantsLogo";
import { Button } from "../../ui/button";
import { SearchBar } from "./SearchBar";
const menuItems = [
  {
    label: "Mains PYQs",
    href: "/feed",
  },
  {
    label: formatToolsName(AIToolNames.SMARTCHECK),
    href: "/ai/smartcheck",
  },
  {
    label: formatToolsName(AIToolNames.AFFAIRS_QUEST),
    href: "/ai/affairs-quest",
  },
];

const MobileMenu = ({
  onClickCrossIcon,
  path,
  userLoggedIn,
}: {
  onClickCrossIcon: () => void;
  path: string;
  userLoggedIn: boolean;
}) => {
  return (
    <div className="flex h-screen w-screen flex-col gap-4">
      <div className="flex justify-between">
        <AspirantsLogo />
        <Cross2Icon className="h-8 w-4" onClick={onClickCrossIcon} />
      </div>

      <div className="flex flex-col gap-4">
        {menuItems.map((item) => {
          return (
            <>
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium text-primary-foreground hover:text-gray-900 hover:underline ${path === item.href ? "text-tertiary" : ""}`}
              >
                {item.label}
              </Link>
            </>
          );
        })}
      </div>
      <Divider />

      <div className="flex items-center gap-4">
        {userLoggedIn && (
          <Button
            onClick={async () => {
              await aspirantsSignOut();
            }}
            className="h-10 w-24 rounded-full text-sm font-medium hover:underline"
            variant="tertiary"
          >
            Logout
          </Button>
        )}
        {!userLoggedIn && (
          <Button
            className="h-10 w-24 rounded-full text-sm font-medium hover:underline"
            variant="tertiary"
          >
            <Link href="/login"> Login </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

const DesktopMenu = ({
  onChangeSearchText,
  userImage,
  searchText,
  onSearchIconClick,
  path,
  onHamBurgerClick,
  userLoggedIn,
}: {
  path: string;
  userImage?: string;
  onSearchIconClick?: () => void;
  onChangeSearchText?: (s: string) => void;
  searchText?: string;
  onHamBurgerClick: () => void;
  userLoggedIn: boolean;
}) => {
  return (
    <>
      <div className="flex items-center gap-4">
        <AspirantsLogo />
        <div className="hidden gap-4 md:flex">
          {menuItems.map((item) => {
            return (
              <>
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium text-primary-foreground hover:text-gray-900 hover:underline ${path === item.href ? "text-tertiary" : ""}`}
                >
                  {item.label}
                </Link>
              </>
            );
          })}
        </div>

        {onChangeSearchText && (
          <SearchBar
            onChangeSearchText={onChangeSearchText}
            onSearchIconClick={onSearchIconClick}
            searchText={searchText}
          />
        )}
      </div>

      <div className="flex items-center gap-4">
        <SquareMenuIcon onClick={onHamBurgerClick} className="sm:hidden" />

        <div className="flex items-center gap-4">
          {userLoggedIn && (
            <Button
              onClick={async () => {
                await aspirantsSignOut();
              }}
              className="hidden h-10 w-24 rounded-full text-sm font-medium hover:underline md:block"
              variant="tertiary"
            >
              Logout
            </Button>
          )}
          {!userLoggedIn && (
            <Button
              className="hidden h-10 w-24 rounded-full text-sm font-medium hover:underline md:block"
              variant="tertiary"
            >
              <Link href="/login"> Login </Link>
            </Button>
          )}
          {userImage && (
            <div className="flex flex-col">
              <div
                className="relative h-10 w-10 overflow-hidden rounded-full"
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
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const Navbar = ({
  userImage,
  onChangeSearchText,
  onSearchIconClick,
  searchText,
  userLoggedIn,
}: {
  userImage?: string;
  onSearchIconClick?: () => void;
  onChangeSearchText?: (s: string) => void;
  searchText?: string;
  hideSearchBar?: boolean;
  userLoggedIn: boolean;
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const path = usePathname();

  return (
    <nav className="flex items-center justify-between bg-gray-50 px-4 py-2 shadow-md lg:px-8">
      {!showMobileMenu && (
        <DesktopMenu
          path={path}
          onChangeSearchText={onChangeSearchText}
          onSearchIconClick={onSearchIconClick}
          searchText={searchText}
          userImage={userImage}
          onHamBurgerClick={() => setShowMobileMenu(true)}
          userLoggedIn={userLoggedIn}
        />
      )}
      {showMobileMenu && (
        <MobileMenu
          onClickCrossIcon={() => setShowMobileMenu(false)}
          path={path}
          userLoggedIn={userLoggedIn}
        />
      )}
    </nav>
  );
};
