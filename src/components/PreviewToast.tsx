"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PreviewToast() {
  const searchParams = useSearchParams();
  const preview = searchParams.get("preview");
  const version = preview === "v1" ? "V1" : preview === "v2" ? "V2" : null;
  const [dismissedVersion, setDismissedVersion] = useState<string | null>(null);

  useEffect(() => {
    if (!version) return;

    const timeoutId = window.setTimeout(
      () => setDismissedVersion(version),
      4200,
    );

    return () => window.clearTimeout(timeoutId);
  }, [version]);

  if (!version || dismissedVersion === version) return null;

  return (
    <div className="portfolio-preview-toast" role="status" aria-live="polite">
      <span>
        You are previewing the {version} version of the portfolio website.
      </span>
      <button
        type="button"
        onClick={() => setDismissedVersion(version)}
        aria-label="Dismiss preview notice"
      >
        ×
      </button>
    </div>
  );
}
