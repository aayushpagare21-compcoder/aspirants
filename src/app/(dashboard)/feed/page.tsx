import { SuggestionsBar } from "@/app/components/dashboard/SuggestionsBar";
export default async function WelcomePage() {
  return (
    <div>
      <div className="flex max-w-[100vw] justify-center">
        <SuggestionsBar />
      </div>
    </div>
  );
}
