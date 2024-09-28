import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";

const gtSuper = localFont({
  src: "../../../public/fonts/GT-Super/GT-Super-Display-Regular-Trial.woff2",
  variable: "--font-gtsuper-medium",
  weight: "100 900",
  display: "swap",
});

const sohne = localFont({
  src: "../../../public/fonts/sohne/sohneone.woff2",
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
}>) {
  return (
      <html lang="en">
      <head>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link
              rel="preload"
              href="/fonts/GT-Super/GT-Super-Display-Regular-Trial.woff2"
              as="font"
              type="font/woff2"
              crossOrigin="anonymous"
          />
          <link
              rel="preload"
              href="/fonts/sohne/sohneone.woff2"
              as="font"
              type="font/woff2"
              crossOrigin="anonymous"
          />
      </head>

      <body className={`${gtSuper.variable} ${sohne.variable}`}>
      {children}
      </body>
      </html>
  );
}