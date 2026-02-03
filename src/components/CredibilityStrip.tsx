import { cn } from "@/lib/utils";

const items = [
  { label: "Next.js + TypeScript", value: "Full‑stack builds" },
  { label: "Payments & Auth", value: "Stripe + Clerk" },
  { label: "2+ Years", value: "Shipping web products" },
];

export default function CredibilityStrip({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "card rounded-[28px] px-6 py-5 md:px-8 md:py-6",
        className,
      )}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-2">
            <span className="mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--muted)]">
              {item.label}
            </span>
            <span className="text-base font-semibold text-[color:var(--ink)]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
