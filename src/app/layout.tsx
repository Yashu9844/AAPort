import type { Metadata } from "next";
import "./globals.css";
import ClickSparkles from "@/components/ClickSparkles";
import Preloader, { PRELOADER_SEEN_KEY } from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import { siteUrl } from "@/lib/site";

const title = "Yashavanth R Siddesh | Full Stack Developer";
const description =
  "Full Stack Developer from Bengaluru building production systems with React, Next.js, Django and Node.js — from ISRO drone telemetry at FalconX to clinic software serving 2,000+ daily consultations.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: ["Full Stack Developer", "React Developer", "Next.js", "Django", "Bengaluru", "Yashavanth R Siddesh"],
  authors: [{ name: "Yashavanth R Siddesh" }],
  creator: "Yashavanth R Siddesh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Yashavanth R Siddesh",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
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

// Runs before first paint so returning visitors never see the preloader flash.
const skipPreloaderScript = `try{if(sessionStorage.getItem("${PRELOADER_SEEN_KEY}"))document.documentElement.classList.add("skip-preloader")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: skipPreloaderScript }} />
      </head>
      <body className="antialiased">
        <Preloader />
        <SmoothScroll />
        {children}
        <ClickSparkles />
      </body>
    </html>
  );
}
