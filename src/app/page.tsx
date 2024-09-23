import { Button } from "@/app/components/ui/button";
export default function LandingPage() {
  return (
    <main>
      <div className="flex flex-col h-screen">
        <div className="flex justify-center bg-[#F7F4ED] border border-b-black">
          <nav className="flex justify-between w-[90%] xl:w-[80%] 2xl:w-[45%]">
            <div className="text-black font-bold text-[2rem] font-[family-name:var(--font-gtsuper-medium)] my-3 tracking-normal">
              Aspirants
            </div>
            <div>
              <ul className="flex gap-6 text-[13px] font-[family-name:var(--font-sohneone)]">
                <li className="my-7 hidden sm:block"> Our Story</li>
                <li className="my-7 hidden sm:block"> Membership</li>
                <li className="my-7 hidden sm:block"> Write</li>
                <li className="my-7 hidden sm:block"> Sign In</li>
                <li className="my-5">
                  <Button className="px-4 py-2"> Get Started </Button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="flex justify-center bg-[#F7F4ED] border border-b-black items-center h-[60%]">
          <div className="2xl:w-[45%] xl:w-[80%] w-[90%]">
            <div className="sm:leading-[6rem] sm:text-[7rem] sm:w-[720px] sm:h-[200px] font-[family-name:var(--font-gtsuper-medium)] m-0 p-0">
              {`Aspirant's stories & ideas`}{" "}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
