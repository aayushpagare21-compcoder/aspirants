import { AspirantsLogo } from "@/app/components/shared/AspirantsLogo";
import { UserButton } from "@clerk/nextjs";
import { BellIcon, EditIcon } from "lucide-react";
import { SearchBar } from "@/app/components/shared/SearchBar";

export const Navbar = () => {
  return (
    <nav className="flex justify-between px-8 py-2 ">
      <div className="flex gap-4 items-center">
        <AspirantsLogo />
        <SearchBar />
      </div>
      <div className="flex gap-8 items-center ">
        <div className="hidden md:flex gap-3">
          <EditIcon strokeWidth={1} />
          <span className="text-sm text-tertiary flex items-center">
            {" "}
            Write
          </span>
        </div>
        <BellIcon className="h-[1.5rem] w-[2rem]" strokeWidth={1} />
        <UserButton />
      </div>
    </nav>
  );
};
