"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import { SectionHeading } from "@/components/marketing/reveal";
import { Reveal, SpotlightCard } from "@/components/marketing/motion";
import { cn } from "@/lib/utils";

const FACTORS = [
  "Fleet profile and vessel types",
  "Prototypes in scope",
  "Shore and vessel workflows reviewed",
  "Depth and length of the exchange",
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
      name: "Focused review",
      summary:
        "A short exchange on one problem area — usually certificate control or the audit cycle.",
      points: [
        "Asset register and certificate matrix",
        "Audit schedules and findings",
        "Snap Hazards and CAPA",
        "Written notes back to you",
      ],
    },
    {
      name: "Full prototype review",
      summary:
        "A longer session across the compliance and risk chain as it currently stands.",
      points: [
        "Everything in a focused review",
        "Crewing, rest hours, and PTW",
        "Bowtie, Fishbone RCA, and MOC",
        "Executive dashboard and alerts",
      ],
      featured: true,
    },
    {
      name: "Architecture discussion",
      summary:
        "A technical exchange for teams interested in the engineering rather than the screens.",
      points: [
        "Everything in a full prototype review",
        "Data model and migration approach",
        "Multi-tenant scoping and RBAC design",
        "Direct exchange with the engineering side",
      ],
    },
  ],
  bureau: [
    {
      name: "Bureau perspective",
      summary:
        "For auditors and consultancy practitioners willing to review the multi-fleet prototype and tell us where it breaks.",
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
          title="No prices, no licences — just research conversations"
          description="Maridots is not sold, licensed, or subscribed to. There is no price list, no checkout, and no commercial offering behind this page. What varies is the shape of the conversation: how much of the prototype is worth reviewing with you, and how deep the technical exchange goes."
        />

        <Reveal>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
            <ul className="flex flex-wrap gap-2">
              {FACTORS.map((factor) => (
                <li
                  key={factor}
                  className="rounded-full bg-white px-3 py-1.5 text-sm text-ink-muted ring-1 ring-line"
                >
                  {factor}
                </li>
              ))}
            </ul>

            <div className="flex gap-1 rounded-full bg-white p-1 ring-1 ring-line">
              {AUDIENCE_TABS.map((tab) => {
                const selected = tab.id === audience;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setAudience(tab.id)}
                    aria-pressed={selected}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
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
                        {tier.wide ? "Bureau track" : "Most requested"}
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
                    No charge · no licence · no obligation
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Reveal>
          <div className="mesh-dark relative mt-12 flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-3xl px-8 py-10">
            <div
              aria-hidden="true"
              className="grid-fine-dark absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_20%_50%,#000,transparent_70%)]"
            />
            <div className="relative max-w-xl">
              <p className="display text-2xl leading-snug text-white sm:text-3xl">
                Tell us how your fleet works — we&apos;ll show you what we
                built and listen
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Write to info@maridots.com and describe the operation you run.
                What follows is a technical conversation about the prototypes,
                not a sales process — nothing is quoted, sold, or contracted
                through this site.
              </p>
            </div>
            <a
              href="mailto:info@maridots.com"
              className="group relative inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-rail-900 transition-transform hover:-translate-y-0.5"
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
