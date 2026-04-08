import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { cn } from "@/lib/utils";

const instrumentSansHeading = Instrument_Sans({subsets:['latin'],variable:'--font-heading'});

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Promsg",
  description:
    "A simple and anonymous messaging service built with Next.js, MongoDB, and NextAuth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable, instrumentSansHeading.variable)}
    >
      <AuthProvider>
        <body className="min-h-full flex flex-col">{children}</body>
      </AuthProvider>
    </html>
  );
}
