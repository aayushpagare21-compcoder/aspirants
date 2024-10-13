import { AspirantsLogo } from "@/app/components/shared/Logo/AspirantsLogo";
import { BellIcon, EditIcon } from "lucide-react";
import { SearchBar } from "@/app/components/shared/Navbar/SearchBar";
export const Navbar = () => {
  return (
    <nav className="flex justify-between px-8 py-2">
      <div className="flex items-center gap-4">
        <AspirantsLogo />
        <SearchBar />
      </div>
      <div className="flex items-center gap-8">
        <div className="hidden gap-3 md:flex">
          <EditIcon strokeWidth={1} />
          <span className="flex items-center text-sm text-tertiary">Write</span>
        </div>
        <BellIcon className="h-[1.5rem] w-[2rem]" strokeWidth={1} />
      </div>
    </nav>
  );
};
