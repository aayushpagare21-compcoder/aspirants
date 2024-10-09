import React from "react";

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";

const gtSuper = localFont({
  src: "../../public/fonts/GT-Super/GT-Super-Display-Regular-Trial.woff2",
  variable: "--font-gtsuper-medium",
  weight: "100 900",
  display: "swap",
});

const sohne = localFont({
  src: "../../public/fonts/sohne/sohneone.woff2",
  variable: "--font-sohneone",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Be an aspirant",
  description: "Created with ❤️ by Aayush Pagare.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gtSuper.variable} ${sohne.variable}`}>
        <div>{children}</div>
      </body>
    </html>
  );
}
