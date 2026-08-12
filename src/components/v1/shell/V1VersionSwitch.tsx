"use client";

import { toV2Route } from "@/lib/portfolio/routes";
import { usePathname } from "next/navigation";

export default function V1VersionSwitch() {
  const pathname = usePathname();
  const modernHref = toV2Route(pathname);

  return (
    <a
      className="v1-version-switch"
      href={modernHref}
      aria-label="Switch to the Modern portfolio"
      title="Switch to Modern"
    >
      <span className="v1-version-track" aria-hidden="true">
        <span />
      </span>
      <span>Modern</span>
    </a>
  );
}
