import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";

const inter = Inter({ variable: "--font-sans-var", subsets: ["latin"] });
const newsreader = Newsreader({ variable: "--font-serif-var", subsets: ["latin"], weight: ["400", "500", "600"] });
const jetBrains = JetBrains_Mono({ variable: "--font-mono-var", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RLbook 2020 Explainer",
  description: "A chapter-by-chapter technical and plain-English explainer for Sutton and Barto's Reinforcement Learning textbook.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable} ${jetBrains.variable} scroll-smooth`}>
      <body>{children}</body>
    </html>
  );
}
