"use client";

import { toV2Route } from "@/lib/portfolio/routes";
import PortfolioVersionLink from "@/components/PortfolioVersionLink";
import { usePathname } from "next/navigation";

export default function V1VersionSwitch() {
  const pathname = usePathname();
  const v2Href = `${toV2Route(pathname)}?preview=v2`;

  return (
    <PortfolioVersionLink
      ariaLabel="Preview the other portfolio version"
      className="v1-version-switch"
      href={v2Href}
      knobOffset={-12}
      title="Preview other version"
    >
      <span className="v1-version-track" aria-hidden="true">
        <span data-version-knob />
      </span>
    </PortfolioVersionLink>
  );
}
