import Image from "next/image";
import { Anchor, Building2, FolderCheck } from "lucide-react";

import { Reveal, SectionHeading } from "@/components/marketing/reveal";
import { SpotlightCard } from "@/components/marketing/motion";

const POINTS = [
  {
    icon: Anchor,
    step: "01",
    title: "The vessel reality",
    body: "Masters and officers record hazards, permits, rest hours, and audit findings where the work happens — on deck and in the engine room. Audits run and complete with limited connectivity, then sync when the vessel is back online.",
  },
  {
    icon: Building2,
    step: "02",
    title: "The shore reality",
    body: "DPAs, quality managers, and superintendents triage what arrives, assign corrective actions, and verify closure against the same evidence the vessel submitted.",
  },
  {
    icon: FolderCheck,
    step: "03",
    title: "One defensible record",
    body: "Every certificate, finding, approval, and signature lands in a single archive with attribution and timestamps, so an audit request is a search rather than a scramble.",
  },
];

export function Solution() {
  return (
    <section id="solution" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The solution"
          title="Shore and vessel working from the same source of truth"
          description="Fleet compliance fails in the gaps: a certificate tracked in a spreadsheet, a near-miss reported by email, a corrective action closed without evidence. Maridots brings those workflows into one controlled system — shared here as a managed preview for evaluation with selective pilot partners."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-linear-to-br from-ocean-200/70 via-transparent to-ocean-100/60 blur-xl"
              />
              <div className="relative overflow-hidden rounded-2xl border border-line shadow-[0_30px_60px_-40px_rgba(15,23,42,0.6)]">
                <Image
                  src="/assets/bridge-operations.png"
                  alt="A deck officer monitoring navigation displays on a ship's bridge"
                  width={1024}
                  height={768}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="h-full w-full object-cover"
                />
                <div className="glass absolute right-4 bottom-4 left-4 rounded-xl px-4 py-3">
                  <p className="text-xs font-semibold tracking-wide text-white">
                    Captured at the point of work
                  </p>
                  <p className="mt-0.5 text-[11px] leading-5 text-slate-300">
                    Geo-tagged, timestamped, routed to the DPA on submission.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <ol className="relative space-y-4 border-l border-line pl-6 lg:pl-8">
            {POINTS.map((point, index) => (
              <Reveal key={point.title} delay={index * 0.08}>
                <li className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-8 -left-[1.9rem] size-3 rounded-full border-2 border-white bg-ocean-500 shadow-[0_0_0_4px_rgba(2,132,199,0.14)] lg:-left-[2.4rem]"
                  />
                  <SpotlightCard className="card card-interactive p-7">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-ocean-50 text-ocean-600 ring-1 ring-ocean-100">
                        <point.icon className="size-5" />
                      </span>
                      <span className="display text-sm font-semibold tracking-[0.2em] text-ocean-600/70">
                        {point.step}
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-ink">
                      {point.title}
                    </h3>
                    <p className="mt-2.5 leading-7 text-ink-muted">{point.body}</p>
                  </SpotlightCard>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
