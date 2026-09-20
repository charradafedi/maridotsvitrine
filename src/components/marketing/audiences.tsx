import { Building, Ship } from "lucide-react";

import { SectionHeading } from "@/components/marketing/reveal";
import { Reveal, SpotlightCard } from "@/components/marketing/motion";

const AUDIENCES = [
  {
    icon: Ship,
    title: "Fleet evaluation perspective",
    body: "Technical review from the shore and vessel side: how certificate control, audits, CAPA, and permits would sit in an operator's safety management architecture.",
    roles: [
      "Shipowners",
      "Fleet managers",
      "DPA",
      "Quality & HSE",
      "Masters",
    ],
  },
  {
    icon: Building,
    title: "Bureau evaluation perspective",
    body: "Architectural review from the consultancy and audit side: multi-fleet scoping, templates, calendars, and isolated engagement workspaces across evaluation portfolios.",
    roles: [
      "Bureau directors",
      "Lead auditors",
      "External inspectors",
      "Engagement leads",
    ],
  },
];

export function Audiences() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Who this research is for"
          title="Two evaluation perspectives, one architecture"
          align="center"
        />

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          {AUDIENCES.map((audience, index) => (
            <Reveal key={audience.title} delay={index * 0.08} className="h-full">
              <SpotlightCard className="card card-interactive group h-full overflow-hidden p-7">
                <div
                  aria-hidden="true"
                  className="absolute -top-16 -right-10 size-40 rounded-full bg-ocean-100/60 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-ocean-50 text-ocean-600 ring-1 ring-ocean-100">
                  <audience.icon className="size-5.5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-ink">
                  {audience.title}
                </h3>
                <p className="mt-2.5 leading-7 text-ink-muted">{audience.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2 border-t border-line-soft pt-5">
                  {audience.roles.map((role) => (
                    <li
                      key={role}
                      className="rounded-full bg-canvas px-2.5 py-1 text-xs font-medium text-ink-muted ring-1 ring-line"
                    >
                      {role}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
