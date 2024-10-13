import { SuggestionsBar } from "@/app/components/shared/SuggestionsBar";
export default async function WelcomePage() {
  return (
    <div>
      <div className="flex max-w-[100vw] justify-center">
        <SuggestionsBar />
      </div>
    </div>
  );
}
