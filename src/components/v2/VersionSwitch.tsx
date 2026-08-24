"use client";

import { toV1Route } from "@/lib/portfolio/routes";
import PortfolioVersionLink from "@/components/PortfolioVersionLink";
import { usePathname } from "next/navigation";

export default function VersionSwitch() {
  const pathname = usePathname();
  const v1Href = `${toV1Route(pathname)}?preview=v1`;

  return (
    <PortfolioVersionLink
      ariaLabel="Preview the other portfolio version"
      className="v2-version-switch"
      href={v1Href}
      knobOffset={13}
      title="Preview other version"
    >
      <span className="v2-version-track" aria-hidden="true">
        <span data-version-knob />
      </span>
    </PortfolioVersionLink>
  );
}
