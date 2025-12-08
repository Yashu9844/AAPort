import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClickSparkles from "@/components/ClickSparkles";
import Preloader from "@/components/Preloader";
import SheryScripts from "@/components/SheryScripts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yashavanth R Siddesh | Full Stack Developer & UI/UX Designer",
  description: "Full Stack Developer from Bengaluru specializing in React, Next.js, and AI/ML. View my portfolio of 50+ projects including e-commerce platforms, AI assistants, and mobile apps.",
  keywords: ["Full Stack Developer", "React Developer", "Next.js", "Bengaluru", "UI/UX Designer"],
  authors: [{ name: "Yashavanth R Siddesh" }],
  creator: "Yashavanth R Siddesh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    siteName: "Yashavanth R Siddesh Portfolio",
    title: "Yashavanth R Siddesh | Full Stack Developer",
    description: "Full Stack Developer from Bengaluru specializing in React, Next.js, and AI/ML.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashavanth R Siddesh | Full Stack Developer",
    description: "Full Stack Developer from Bengaluru specializing in React, Next.js, and AI/ML.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://your-domain.com",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Preloader />
        <SheryScripts />
        {children}
        <ClickSparkles />
      </body>
    </html>
  );
}
