"use client";
import { LoginComponent } from "@/app/client/components/auth/LoginComponent";
import { Dialog, DialogContent } from "@/app/client/components/ui/dialog";
import { useRouter } from "next/navigation";
export default function InterceptedLogin({
  searchParams,
}: {
  searchParams: { redirectTo?: string };
}) {
  const router = useRouter();
  return (
    <>
      <Dialog
        defaultOpen={true}
        onOpenChange={() => {
          router.push("/");
        }}
      >
        <DialogContent> 
          <LoginComponent redirectTo={searchParams?.redirectTo ?? "/feed"} />
        </DialogContent>
      </Dialog>
    </>
  );
}
