import { AuthProvider } from "@/context/AuthProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  preload: false
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  preload: false
});

export const metadata: Metadata = {
  title: "GYM exercises",
  description: "Access 1300+ exercises and professional fitness guidance.",
  keywords: "fitness, exercises, workout, training, gym, health",
};

const RootLayout = ({ children }: { children: ReactNode }) =>  {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/assets/images/Logo.png" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
export default RootLayout;