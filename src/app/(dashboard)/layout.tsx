import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Be an aspirant",
  description: "Created with ❤️ by Aayush Pagare.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
