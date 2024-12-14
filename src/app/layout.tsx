import React from "react";
import localFont from "next/font/local";
import "./client/styles/globals.css";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>
      <body
        className={`${gtSuper.variable} ${sohne.variable} bg-background text-foreground`}
      >
        <div>{children}</div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
