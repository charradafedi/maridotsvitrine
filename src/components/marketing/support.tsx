import { GraduationCap, LifeBuoy, RefreshCw } from "lucide-react";

import { SectionHeading } from "@/components/marketing/reveal";
import { Reveal, SpotlightCard } from "@/components/marketing/motion";

const SERVICES = [
  {
    icon: LifeBuoy,
    phase: "Pilot theme",
    title: "Adoption and support models",
    body: "How does a safety management system stay usable after the first month? Pilot partners help define what shore teams need when configurations change, operating units are added, and questions return from the vessel.",
  },
  {
    icon: GraduationCap,
    phase: "Shore & vessel",
    title: "Training format studies",
    body: "Two audiences, two problems: shore users working audits, CAPA, and certificate control, and vessel users capturing hazards, permits, and rest hours at the point of work. Pilot evaluation tests which formats hold up for each.",
  },
  {
    icon: RefreshCw,
    phase: "Longitudinal",
    title: "Competence retention",
    body: "Regulations move, workflows change, and crew rotate through the fleet. Enablement asks how competence stays current over time rather than being assumed at handover.",
  },
];

export function Support() {
  return (
    <section
      id="support"
      className="border-y border-line bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Enablement"
          title="The human half of the problem"
          description="A safety management system only works if the people using it at sea and ashore trust it. Alongside the platform preview, we are refining how that trust is built — the questions below remain open, and practitioner input from pilot partners shapes them."
          align="center"
        />

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute top-14 right-[16%] left-[16%] hidden h-px bg-linear-to-r from-transparent via-ocean-200 to-transparent lg:block"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.09} className="h-full">
                <SpotlightCard className="card card-interactive relative h-full p-7 text-center">
                  <span className="relative z-10 mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-white text-ocean-600 shadow-[0_10px_30px_-16px_rgba(2,132,199,0.8)] ring-1 ring-ocean-100">
                    <service.icon className="size-6" />
                  </span>
                  <p className="mt-5 text-[11px] font-bold tracking-[0.16em] text-ocean-700 uppercase">
                    {service.phase}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-3 leading-7 text-ink-muted">{service.body}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
