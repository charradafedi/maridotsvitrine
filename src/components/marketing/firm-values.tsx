import {
  Gauge,
  ShieldCheck,
  TrendingUp,
  Timer,
  Workflow,
} from "lucide-react";

import { FIRM_VALUES } from "@/lib/firm-values";
import { Reveal, Stagger, StaggerItem } from "@/components/marketing/motion";

const ICONS = {
  revenue: TrendingUp,
  latency: Timer,
  efficiency: Workflow,
  productivity: Gauge,
  security: ShieldCheck,
} as const;

const CAPABILITY_CHIPS = [
  "International revenue assurance",
  "Sophisticated tools for every fleet scale",
  "Lower operational latency",
  "Security by design",
];

export function FirmValues() {
  return (
    <section
      aria-label="What Maridots stands for"
      className="relative z-10 -mt-14 px-4 pb-12 sm:-mt-20 sm:px-6 sm:pb-16 md:-mt-24 md:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <Stagger className="glass-light grid overflow-hidden rounded-2xl bg-white/95 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.75)] sm:grid-cols-2 lg:grid-cols-5">
          {FIRM_VALUES.map((value) => {
            const Icon = ICONS[value.id];
            return (
              <StaggerItem
                key={value.id}
                className="group relative border-b border-line-soft last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(5n)]:border-r-0 lg:last:border-r-0"
              >
                <div className="h-full px-4 py-5 transition-colors group-hover:bg-ocean-50/40 sm:px-6 sm:py-7">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-ocean-500 to-ocean-300 transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-600 ring-1 ring-ocean-100 transition-colors group-hover:bg-ocean-600 group-hover:text-white group-hover:ring-ocean-600">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-[0.95rem] font-semibold text-slate-900 sm:text-base">
                    {value.label}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-6 text-slate-600">
                    {value.detail}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.15}>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {CAPABILITY_CHIPS.map((chip) => (
              <li
                key={chip}
                className="rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-slate-700 ring-1 ring-slate-200 transition-colors hover:text-ocean-700 hover:ring-ocean-200 sm:text-xs"
              >
                {chip}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
