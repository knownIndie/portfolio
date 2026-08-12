import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    default: "Aryan Bhardwaj | Full-stack Developer",
    template: "%s | Aryan Bhardwaj",
  },
  description:
    "Full-stack developer building reliable products, backend workflows, and focused user experiences.",
  openGraph: {
    title: "Aryan Bhardwaj | Full-stack Developer",
    description:
      "Full-stack developer building reliable products, backend workflows, and focused user experiences.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Bhardwaj | Full-stack Developer",
    description:
      "Full-stack developer building reliable products, backend workflows, and focused user experiences.",
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
          <V2Navbar content={content} />
          {children}
          <V2Footer content={content} />
        </div>
      </body>
    </html>
  );
}
