import { AspirantsLogo } from "@/app/components/shared/Logo/AspirantsLogo";
import { BellIcon, EditIcon } from "lucide-react";
import { SearchBar } from "@/app/components/shared/Navbar/SearchBar";
import Image from "next/image";
import { SessionUser } from "@/app/lib/types/auth.types";

export const Navbar = ({ user }: { user: SessionUser }) => {
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

        {/* Profile Picture Tab */}
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={user.image} // Replace with the correct image path or dynamic user profile picture
            alt="Profile Picture"
            layout="fill" // This makes the image fill the div
            objectFit="cover" // Ensures the image covers the div without stretching
          />
        </div>
      </div>
    </nav>
  );
};
