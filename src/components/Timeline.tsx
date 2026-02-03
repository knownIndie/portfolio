"use client";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { educationItems } from "@/lib/data/Education";
import { workItems } from "@/lib/data/Experience";

export default function Timeline({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "card perf-section rounded-[28px] px-6 py-6 md:px-8 md:py-8",
        className,
      )}
    >
      <div className="mb-6">
        <p className="mono text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
          Experience
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-[color:var(--ink)]">
          Work & study timeline
        </h2>
      </div>

      <Tabs defaultValue="experience" className="w-full">
        <TabsList className="flex w-full gap-2 rounded-full border border-[rgba(29,27,22,0.18)] bg-[color:var(--glass)] p-1">
          <TabsTrigger
            value="experience"
            className="flex-1 cursor-pointer rounded-full border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:-translate-y-0.5 hover:border-[rgba(29,27,22,0.35)] hover:bg-[rgba(255,255,255,0.35)] hover:text-[color:var(--ink)] data-[state=active]:border-[rgba(29,27,22,0.18)] data-[state=active]:bg-[color:var(--ink)] data-[state=active]:text-[color:var(--paper)] data-[state=inactive]:bg-transparent data-[state=inactive]:text-[color:var(--muted)]"
          >
            Experience
          </TabsTrigger>
          <TabsTrigger
            value="education"
            className="flex-1 cursor-pointer rounded-full border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:-translate-y-0.5 hover:border-[rgba(29,27,22,0.35)] hover:bg-[rgba(255,255,255,0.35)] hover:text-[color:var(--ink)] data-[state=active]:border-[rgba(29,27,22,0.18)] data-[state=active]:bg-[color:var(--ink)] data-[state=active]:text-[color:var(--paper)] data-[state=inactive]:bg-transparent data-[state=inactive]:text-[color:var(--muted)]"
          >
            Education
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="experience">
            <ol className="relative border-l border-[rgba(29,27,22,0.2)]">
              {workItems.map((item) => (
                <li key={item.id} className="mb-10 ml-6">
                  <span className="absolute -left-1.5 mt-2 h-3 w-3 rounded-full bg-[color:var(--accent)] ring-4 ring-white"></span>
                  <h3 className="text-lg font-semibold text-[color:var(--ink)]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[color:var(--muted)]">
                    {item.role} @ {item.name}
                  </p>
                  <time className="mono block text-xs text-[color:var(--muted)]">
                    {item.start} – {item.end ?? "Present"}
                  </time>
                  {item.bullets && (
                    <ul className="mt-3 list-disc pl-4 text-sm text-[color:var(--muted)]">
                      {item.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </TabsContent>

          <TabsContent value="education">
            <ol className="relative border-l border-[rgba(29,27,22,0.2)]">
              {educationItems.map((item) => (
                <li key={item.id} className="mb-10 ml-6">
                  <span className="absolute -left-1.5 mt-2 h-3 w-3 rounded-full bg-[color:var(--teal)] ring-4 ring-white"></span>
                  <h3 className="text-lg font-semibold text-[color:var(--ink)]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[color:var(--muted)]">
                    {item.name}
                  </p>
                  <time className="mono block text-xs text-[color:var(--muted)]">
                    {item.start ?? ""} – {item.end}
                  </time>
                  {item.bullets && (
                    <ul className="mt-3 list-disc pl-4 text-sm text-[color:var(--muted)]">
                      {item.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
