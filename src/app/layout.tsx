import type { Metadata } from "next";
import "./globals.css";
import ClickSparkles from "@/components/ClickSparkles";
import Preloader, { PRELOADER_SEEN_KEY } from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import { siteUrl } from "@/lib/site";

const title = "Yashavanth R Siddesh | Software Engineer & Team Lead";
const description =
  "Software Development Engineer and Team Lead in Bengaluru. Leads a team building a distributed satellite telemetry platform tracking 70+ satellites, and builds production agentic AI systems.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: ["Software Engineer", "Team Lead", "Distributed Systems", "Agentic AI", "Satellite Telemetry", "Next.js", "Bengaluru", "Yashavanth R Siddesh"],
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
