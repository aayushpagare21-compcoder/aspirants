import React from "react";
import localFont from "next/font/local";
import "./client/styles/globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gtSuper.variable} ${sohne.variable} bg-background text-foreground`}
      >
        <div>{children}</div>
      </body>
    </html>
  );
}
