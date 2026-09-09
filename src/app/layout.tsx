import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Gluten, Space_Grotesk, Swanky_and_Moo_Moo } from "next/font/google";
import { cn } from "src/lib/utils";
import { Header } from "../components/header";

import "./global.css";

// Site name
const swankyAndMooMoo = Swanky_and_Moo_Moo({
  style: "normal",
  subsets: ["latin"],
  variable: "--font-swanky-and-moo-moo",
  weight: "400",
});

// Titles
const gluten = Gluten({
  style: "normal",
  subsets: ["latin"],
  variable: "--font-gluten",
  weight: ["400", "500"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400"],
});

export const metadata: Metadata = {
  description: "Blog personnel de Thibaut Izard",
  title: "frenchdev",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html
      className={`${spaceGrotesk.variable} ${gluten.variable} ${swankyAndMooMoo.variable}`}
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
        <Analytics />
      </body>
    </html>
  );
}
