"use client";

import { toV1Route } from "@/lib/portfolio/routes";
import { usePathname } from "next/navigation";

export default function VersionSwitch() {
  const pathname = usePathname();
  const classicHref = toV1Route(pathname);

  return (
    <a
      className="v2-version-switch"
      href={classicHref}
      aria-label="Switch to the Classic portfolio"
      title="Switch to Classic"
    >
      <span className="v2-version-track" aria-hidden="true">
        <span />
      </span>
      <span>Classic</span>
    </a>
  );
}
