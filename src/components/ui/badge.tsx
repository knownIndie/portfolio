import { cn } from "@/lib/utils";
import React from "react";

export default function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "shadow-acternity mx-1 mt-1 inline-flex items-center gap-2 rounded-4xl border-2 border-blue-200 bg-[color:var(--glass)] px-2 py-1 text-xs",
        className,
      )}
    >
      {children}
    </span>
  );
}
