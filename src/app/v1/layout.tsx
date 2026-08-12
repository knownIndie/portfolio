import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Newsreader } from "next/font/google";
import V1Footer from "@/components/v1/shell/V1Footer";
import V1Navbar from "@/components/v1/shell/V1Navbar";
import { getPortfolioContent } from "@/lib/portfolio/content";
import "@/styles/v1.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Classic portfolio | Aryan Bhardwaj",
    template: "%s | Classic portfolio",
  },
  description: "The archived classic version of Aryan Bhardwaj's portfolio.",
  robots: { index: false, follow: true },
};

export default async function V1RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const content = await getPortfolioContent();

  return (
    <html lang="en">
      <body
        className={`${newsreader.variable} ${archivo.variable} ${plex.variable} v1-body`}
      >
        <a className="v1-skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="v1-site-bg" aria-hidden="true" />
        <div className="v1-shell">
          <V1Navbar content={content} />
          {children}
          <V1Footer content={content} />
        </div>
      </body>
    </html>
  );
}
