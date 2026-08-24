import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import GsapMotion from "@/components/v2/GsapMotion";
import PreviewToast from "@/components/PreviewToast";
import V2Footer from "@/components/v2/shell/V2Footer";
import V2Navbar from "@/components/v2/shell/V2Navbar";
import { getPortfolioContent } from "@/lib/portfolio/content";
import "@/styles/v2.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-v2-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-v2-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aryan Bhardwaj | AI Engineering Portfolio",
    template: "%s | Aryan Bhardwaj",
  },
  description:
    "Final-year computer science student building full-stack products and AI-enabled developer tools.",
  openGraph: {
    title: "Aryan Bhardwaj | AI Engineering Portfolio",
    description:
      "Final-year computer science student building full-stack products and AI-enabled developer tools.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Bhardwaj | AI Engineering Portfolio",
    description:
      "Final-year computer science student building full-stack products and AI-enabled developer tools.",
  },
};

export default async function V2RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const content = await getPortfolioContent();

  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} v2-body`}>
        <a className="v2-skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="v2-shell">
          <Suspense fallback={null}>
            <PreviewToast />
          </Suspense>
          <GsapMotion />
          <V2Navbar content={content} />
          {children}
          <V2Footer content={content} />
        </div>
      </body>
    </html>
  );
}
