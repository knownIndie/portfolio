import type { ReactNode } from "react";
import type { V2Props } from "./types";
import Navbar from "./Navbar";
import Footer from "./Footer";
export default function ModernLayout({
  content,
  children,
}: {
  content: V2Props["content"];
  children: ReactNode;
}) {
  return (
    <div className="v2-shell">
      <Navbar content={content} />
      {children}
      <Footer content={content} />
    </div>
  );
}
