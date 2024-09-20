import { Button } from "@/app/components/ui/button";

export default function LandingPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-[#F7F4ED]">
      <main className="flex flex-col gap-8 row-start-2 sm">
        <div className="h-[20%]"> </div>
        <div className="flex mx-[70px] h-[90%]">
          <div className="w-[90%] flex flex-col gap-12">
            <div className="font-[family-name:var(--font-gtsuper-medium)]">
              <h1 className="text-[7rem] text-black leading-none">
                {`Aspirant's`}
              </h1>
              <h1 className="text-[7rem] text-black leading-none">
                {`stories & ideas`}
              </h1>
            </div>
            <h3 className="text-[1.5rem]">
              A place to connect with your fellow aspirants
            </h3>
            <Button className="md:w-[18%] px-12 pt-4 pb-3 w-[100%]">
              {" "}
              GET STARTED{" "}
            </Button>
          </div>
          <div className="w-[10%]"></div>
        </div>
        <div></div>
      </main>
    </div>
  );
}
