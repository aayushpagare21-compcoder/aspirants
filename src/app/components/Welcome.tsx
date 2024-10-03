import { Navbar } from "@/app/components/shared/Navbar";
import { SuggestionsBar } from "@/app/components/shared/SuggestionsBar";
export const Welcome = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-[100vw] flex justify-center">
        <SuggestionsBar />
      </div>
    </div>
  );
};
