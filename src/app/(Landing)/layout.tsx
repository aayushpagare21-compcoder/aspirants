import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";

const gtSuper = localFont({
  src: "../public/fonts/GT-Super/GT-Super-Display-Medium-Trial.otf",
  variable: "--font-gtsuper-medium",
  weight: "100 900",
});

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
    <html lang="en">
      <body className={`${gtSuper.variable}`}>{children}</body>
    </html>
  );
}
