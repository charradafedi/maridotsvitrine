"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import { SectionHeading } from "@/components/marketing/reveal";
import { Reveal, SpotlightCard } from "@/components/marketing/motion";
import { cn } from "@/lib/utils";

const FACTORS = [
  "Fleet size and operating profile",
  "Modules in the pilot scope",
  "Shore and vessel workflows",
  "Quality and reliability priorities",
];

type Tier = {
  name: string;
  summary: string;
  points: string[];
  featured?: boolean;
  wide?: boolean;
};

const TIERS: Record<"operator" | "bureau", Tier[]> = {
  operator: [
    {
      name: "Focused pilot",
      summary:
        "A contained pilot on one priority area — typically certificate control or the audit cycle — so quality can be proven before the scope widens.",
      points: [
        "Asset register and certificate matrix",
        "Audit schedules and findings",
        "Snap Hazards and CAPA",
        "Structured feedback into the product",
      ],
    },
    {
      name: "Full-scope pilot",
      summary:
        "A broader pilot across the compliance and risk chain, for fleets ready to pressure-test reliability under real operating conditions.",
      points: [
        "Everything in a focused pilot",
        "Crewing, rest hours, and PTW",
        "Bowtie, Fishbone RCA, and MOC",
        "Executive dashboard and alerts",
      ],
      featured: true,
    },
    {
      name: "Architecture partnership",
      summary:
        "For teams that want to co-shape the platform foundations — data model, tenancy, and access control — alongside a live pilot.",
      points: [
        "Everything in a full-scope pilot",
        "Data model and migration approach",
        "Multi-tenant scoping and RBAC design",
        "Direct exchange with the engineering side",
      ],
    },
  ],
  bureau: [
    {
      name: "Bureau pilot",
      summary:
        "For consultancy and audit organisations piloting multi-fleet delivery — proving quality across client engagements before any commercial arrangement.",
      points: [
        "Bureau Dashboard and Clients",
        "Team assignment and Calendar",
        "Bureau Templates for checklists and reports",
        "Online External Audits across client fleets",
        "Isolated workspace per engagement",
        "Bureau Settings and role scoping",
      ],
      featured: true,
      wide: true,
    },
  ],
};

const AUDIENCE_TABS = [
  { id: "operator" as const, label: "Fleet operator" },
  { id: "bureau" as const, label: "Consultancy bureau" },
];

export function Plans() {
  const [audience, setAudience] = useState<"operator" | "bureau">("operator");
  const tiers = TIERS[audience];

  return (
    <section id="plans" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Collaboration"
          title="Pilot first — quality and reliability before any commercial path"
          description="Licences and commercial agreements are not available at this stage. Our priority is a limited set of pilot accounts, so we can prove quality, reliability, and fit under real fleet conditions. Sophisticated compliance and risk control should be within reach of smaller operators as well as larger fleets — a sustainable model only works if it serves the whole market, not only those who can already afford enterprise tooling."
        />

        <Reveal>
          <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
            <ul className="flex flex-wrap gap-2">
              {FACTORS.map((factor) => (
                <li
                  key={factor}
                  className="rounded-full bg-white px-3 py-1.5 text-xs text-ink-muted ring-1 ring-line sm:text-sm"
                >
                  {factor}
                </li>
              ))}
            </ul>

            <div className="flex w-full gap-1 rounded-full bg-white p-1 ring-1 ring-line sm:w-auto">
              {AUDIENCE_TABS.map((tab) => {
                const selected = tab.id === audience;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setAudience(tab.id)}
                    aria-pressed={selected}
                    className={cn(
                      "relative flex-1 rounded-full px-3 py-2 text-sm font-semibold transition-colors sm:flex-none sm:px-4",
                      selected ? "text-white" : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {selected ? (
                      <motion.span
                        layoutId="plan-audience"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                        className="absolute inset-0 rounded-full bg-ocean-600"
                      />
                    ) : null}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {tiers.map((tier, index) => (
              <motion.div
                key={`${audience}-${tier.name}`}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.06,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                className={cn("h-full", tier.wide && "lg:col-span-3")}
              >
                <SpotlightCard
                  className={cn(
                    "card card-interactive flex h-full flex-col p-7",
                    tier.featured && "border-ocean-300 ring-1 ring-ocean-200",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="display text-xl text-ink">{tier.name}</h3>
                    {tier.featured ? (
                      <span className="rounded-full bg-ocean-600 px-2.5 py-1 text-[11px] font-semibold tracking-wider text-white uppercase">
                        {tier.wide ? "Bureau pilot" : "Most requested"}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-ink-muted">
                    {tier.summary}
                  </p>
                  <ul
                    className={cn(
                      "mt-6 flex-1 gap-3 border-t border-line-soft pt-6",
                      tier.wide ? "grid sm:grid-cols-2 lg:grid-cols-3" : "space-y-3",
                    )}
                  >
                    {tier.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-ocean-600" />
                        <span className="text-ink-muted">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm font-medium text-ink">
                    Pilot access · no licence · no commercial commitment
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Reveal>
          <div className="mesh-dark relative mt-12 flex flex-col items-start gap-6 overflow-hidden rounded-2xl px-5 py-8 sm:rounded-3xl sm:px-8 sm:py-10 md:flex-row md:flex-wrap md:items-center md:justify-between">
            <div
              aria-hidden="true"
              className="grid-fine-dark absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_20%_50%,#000,transparent_70%)]"
            />
            <div className="relative max-w-xl">
              <p className="display text-xl leading-snug text-white sm:text-2xl md:text-3xl">
                Tell us about your fleet — we&apos;ll explore a pilot that fits
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Write to info@maridots.com. We will discuss a pilot scoped to
                your operation — quality and reliability first. Licences and
                commercial terms are not on the table yet.
              </p>
            </div>
            <a
              href="mailto:info@maridots.com"
              className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-rail-900 transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              Email the research team
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
