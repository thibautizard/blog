import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Gluten, Space_Grotesk, Swanky_and_Moo_Moo } from "next/font/google";
import { site } from "src/lib/site";
import { cn } from "src/lib/utils";
import { Header } from "../components/header";

import "./global.css";
import { TailwindLandmark } from "src/components/tailwind-landmark";

export const metadata: Metadata = {
  alternates: {
    types: {
      "application/rss+xml": [{ title: site.title, url: "/feed.xml" }],
    },
  },
  description: site.description,
  metadataBase: new URL(site.url),
  title: site.title,
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html
      className={`${spaceGrotesk.variable} ${gluten.variable} ${swankyAndMooMoo.variable}`}
      data-scroll-behavior="smooth"
      lang="fr"
    >
      <body
        className={cn(
          "mx-auto min-h-screen",
          "w-[90vw] max-w-[72ch]",
          "space-y-12",
          "py-4 sm:py-8"
        )}
      >
        <Header />
        <main>{children}</main>

        {/* 🔧 */}
        <Helpers />
        {/* 📊 */}
        <Analytics />
      </body>
    </html>
  );
}

/* 🔧 */
function Helpers() {
  return <TailwindLandmark />;
}

// 🖊️
const swankyAndMooMoo = Swanky_and_Moo_Moo({
  fallback: ["cursive"],
  style: "normal",
  subsets: ["latin"],
  variable: "--font-swanky-and-moo-moo",
  weight: "400",
});

const gluten = Gluten({
  style: "normal",
  subsets: ["latin"],
  variable: "--font-gluten",
  weight: ["400", "500"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "600"],
});
