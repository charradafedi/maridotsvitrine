import { Archive, BookOpen, FileSearch, Library, Recycle } from "lucide-react";

import { SectionHeading } from "@/components/marketing/reveal";
import { Reveal, SpotlightCard } from "@/components/marketing/motion";
import { cn } from "@/lib/utils";

const ENTRIES = [
  {
    icon: BookOpen,
    title: "User Guide",
    body: "In-product operational guidance, so a new superintendent or a relieving Master can work the system correctly on day one instead of waiting for a trainer.",
    className: "lg:col-span-3",
  },
  {
    icon: Recycle,
    title: "Waste Facilities directory",
    body: "Port reception facility reference kept beside the workflows that need it, supporting correct waste delivery decisions and MARPOL record keeping.",
    className: "lg:col-span-3",
  },
  {
    icon: Archive,
    title: "Compliance Archive",
    body: "Historical compliance evidence, searchable and exportable — the file an auditor asks for, retrieved in seconds rather than reconstructed from mailboxes.",
    className: "lg:col-span-2",
  },
  {
    icon: FileSearch,
    title: "Audit Log Archive",
    body: "Traceability of audit and system activity: who did what, to which record, when, and under which revision.",
    className: "lg:col-span-2",
  },
  {
    icon: Library,
    title: "Knowledge & Reference overview",
    body: "One hub tying guidance, reference data, and archives together.",
    className: "lg:col-span-2",
  },
];

export function Knowledge() {
  return (
    <section id="knowledge" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Knowledge & Reference"
          title="Guidance, environmental reference, and archived proof"
          description="Competence walks off the gangway with every crew change. Knowledge & Reference keeps the institutional memory in the system — so the fleet stays audit-ready and onboarding is faster."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-6">
          {ENTRIES.map((entry, index) => (
            <Reveal
              key={entry.title}
              delay={index * 0.06}
              className={cn("h-full", entry.className)}
            >
              <SpotlightCard className="card card-interactive group h-full overflow-hidden p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-ocean-50 text-ocean-600 ring-1 ring-ocean-100 transition-colors group-hover:bg-ocean-600 group-hover:text-white group-hover:ring-ocean-600">
                    <entry.icon className="size-5" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="display text-sm tracking-[0.2em] text-line"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-ink">{entry.title}</h3>
                <p className="mt-2 leading-7 text-ink-muted">{entry.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
