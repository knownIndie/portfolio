// src/app/layout.tsx
import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    default: "Aryan Bhardwaj — Full‑Stack Developer",
    template: "%s · Aryan Bhardwaj",
  },
  description:
    "Full‑stack developer focused on product UX, performance, and reliable systems. Building modern Next.js experiences with clarity and speed.",
  openGraph: {
    title: "Aryan Bhardwaj — Full‑Stack Developer",
    description:
      "Full‑stack developer focused on product UX, performance, and reliable systems. Building modern Next.js experiences with clarity and speed.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Bhardwaj — Full‑Stack Developer",
    description:
      "Full‑stack developer focused on product UX, performance, and reliable systems. Building modern Next.js experiences with clarity and speed.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${newsreader.variable} ${archivo.variable} ${plex.variable} site-body`}
      >
        <div className="site-bg" />
        <Navbar className="mx-auto w-full max-w-5xl px-6" />
        <div className="mx-auto w-full max-w-5xl px-6 pb-10">
          {children}
        </div>
        <Footer className="mx-auto w-full max-w-5xl px-6" />
      </body>
    </html>
  );
}
