import Image from "next/image";
import { Archive, BellRing, KeyRound, Users } from "lucide-react";

import { SectionHeading } from "@/components/marketing/reveal";
import { Reveal, SpotlightCard } from "@/components/marketing/motion";

const CONTROLS = [
  {
    icon: Users,
    title: "Role-based permissions",
    body: "Crew, Master, DPA, quality manager, superintendent, and external auditor each see the records their role requires and nothing beyond it. Bureau users are scoped to the client engagement they are appointed to.",
  },
  {
    icon: KeyRound,
    title: "PIN-authenticated signatures",
    body: "High-liability workflows — permits to work, audit sign-off, CAPA verification — are approved with an authenticated digital signature binding the approver, the time, and the document version.",
  },
  {
    icon: Archive,
    title: "Traceability and archives",
    body: "Records are append-only. Revisions, approvals, and closures remain retrievable with full attribution, which is what turns a claim of compliance into evidence of it.",
  },
  {
    icon: BellRing,
    title: "Continuous monitoring and alerts",
    body: "Expiry horizons, overdue actions, rest hour breaches, and open permits are monitored continuously, with alerts directed to the role accountable for acting on them.",
  },
];

export function Security() {
  return (
    <section id="security" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-24">
            <Reveal>
              <Image
                src="/assets/maridots-shield.png"
                alt=""
                width={128}
                height={128}
                className="mb-6 size-16 mix-blend-multiply"
              />
            </Reveal>
            <SectionHeading
              eyebrow="Security & monitoring"
              title="Controlled access, signed approvals, provable history"
              description="Compliance data is liability data. Maintaining security — restricted access, attributable approvals, and immutable history — protects both operational integrity and commercial continuity."
            />
            <Reveal delay={0.12}>
              <div className="mt-8 overflow-hidden rounded-2xl border border-line shadow-[0_30px_60px_-45px_rgba(15,23,42,0.7)]">
                <Image
                  src="/assets/audit-evidence.png"
                  alt="An officer reviewing certificates and audit evidence beside a compliance dashboard"
                  width={1024}
                  height={768}
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {CONTROLS.map((control, index) => (
              <Reveal key={control.title} delay={index * 0.07} className="h-full">
                <SpotlightCard className="card card-interactive h-full p-6">
                  <article>
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-rail-900 text-ocean-300">
                      <control.icon className="size-5" />
                    </span>
                    <h3 className="mt-5 font-semibold text-ink">{control.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-muted">
                      {control.body}
                    </p>
                  </article>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
