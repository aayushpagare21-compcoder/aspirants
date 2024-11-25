import { LoginComponent } from "@/app/components/auth/LoginComponent";
export default async function LoginPage(searchParams: { redirectTo?: string }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col gap-4 p-8 pt-12 md:h-[20rem] md:w-[30rem] md:rounded-lg md:shadow-lg">
        <LoginComponent redirectTo={searchParams?.redirectTo} />
      </div>
    </div>
  );
}
