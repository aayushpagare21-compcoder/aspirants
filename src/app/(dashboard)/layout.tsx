import type { Metadata } from "next";
import { Navbar } from "@/app/components/shared/Navbar/Navbar";

export const metadata: Metadata = {
  title: "Be an aspirant",
  description: "Created with ❤️ by Aayush Pagare.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
