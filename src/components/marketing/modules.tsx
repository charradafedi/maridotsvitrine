"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BellRing,
  Boxes,
  Building,
  Check,
  Database,
  LayoutDashboard,
  Library,
  ShieldAlert,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/marketing/reveal";
import { Reveal } from "@/components/marketing/motion";
import { cn } from "@/lib/utils";

type ModuleGroup = {
  id: string;
  icon: LucideIcon;
  name: string;
  summary: string;
  core?: boolean;
  outcome: string;
  sections: { label?: string; items: string[] }[];
};

const GROUPS: ModuleGroup[] = [
  {
    id: "executive",
    icon: LayoutDashboard,
    name: "Executive Dashboard",
    summary: "Fleet-scoped KPIs, trends, and AI insights on the landing screen.",
    outcome: "Leadership sees the fleet position without asking for a report.",
    sections: [
      {
        items: [
          "Fleet-scoped KPI cards and analytics",
          "Compliance and safety KPI views",
          "Filterable date ranges and asset scope",
          "AI Insights panel for leadership",
        ],
      },
    ],
  },
  {
    id: "assets",
    icon: Boxes,
    name: "Asset Management",
    summary: "The register every other module reads from.",
    outcome: "No certificate lapses because nobody owned the spreadsheet.",
    sections: [
      {
        items: [
          "Fleet Assets Overview",
          "Asset Particulars & Certificates",
          "Certificate control and expiry awareness",
        ],
      },
    ],
  },
  {
    id: "crewing",
    icon: Users,
    name: "Crewing Management",
    summary: "Competence and fatigue evidence, kept current.",
    outcome: "Rest hour breaches surface before an inspector finds them.",
    sections: [
      {
        items: [
          "Crew Directory & Roster",
          "Sea Experience Summary",
          "Work & Rest Hours (STCW)",
        ],
      },
    ],
  },
  {
    id: "risk",
    icon: ShieldAlert,
    name: "Risk Management",
    summary: "From the hazard on deck to the verified barrier ashore.",
    core: true,
    outcome: "Every hazard has an owner, a barrier, and a closure record.",
    sections: [
      {
        items: [
          "Snap Hazards",
          "Reports — Incidents & Near-Misses",
          "CAPA Management",
          "Bowtie Barriers",
          "Fishbone RCA",
          "Management of Change (MOC)",
          "PSC Pre-Arrival Readiness",
          "Permit to Work (PTW) with PIN-authenticated signatures",
        ],
      },
    ],
  },
  {
    id: "compliance",
    icon: ShieldCheck,
    name: "Compliance & Safety",
    summary:
      "Audit-ready evidence and controlled documentation, online or with limited connectivity.",
    core: true,
    outcome:
      "Audits run at sea and ashore, and an audit request becomes a search rather than a scramble.",
    sections: [
      {
        label: "Audits & Inspections",
        items: [
          "Online External Audits",
          "Audit Schedules",
          "Audits Catalogue",
          "Online Audits",
        ],
      },
      {
        label: "Document Management",
        items: [
          "Safety & Security Manuals",
          "Crew Documents",
          "Asset Documents",
          "Company Documents",
          "Certificates",
          "Certificate Matrix",
          "Regulatory Updates",
        ],
      },
    ],
  },
  {
    id: "knowledge",
    icon: Library,
    name: "Knowledge & Reference",
    summary: "Institutional memory and archived proof.",
    outcome: "Competence stays with the fleet when crew rotate.",
    sections: [
      {
        items: [
          "Knowledge & Reference overview",
          "User Guide",
          "Waste Facilities directory",
          "Compliance Archive",
          "Audit Log Archive / Archive Database",
        ],
      },
    ],
  },
  {
    id: "bureau",
    icon: Building,
    name: "Consultancy Bureau",
    summary: "For audit and consultancy organisations.",
    outcome: "Many client fleets, one delivery workflow, isolated data.",
    sections: [
      {
        items: [
          "Bureau Dashboard",
          "Clients",
          "Team",
          "Calendar",
          "Bureau Templates",
          "Bureau Settings",
        ],
      },
    ],
  },
  {
    id: "notifications",
    icon: BellRing,
    name: "Notifications & Alerts",
    summary: "The right signal to the accountable role.",
    outcome: "Nothing expires quietly.",
    sections: [
      { items: ["System notifications", "PTW notifications and actionable alerts"] },
    ],
  },
  {
    id: "integrations",
    icon: Database,
    name: "Integrations & Data Hub",
    summary: "Controlled migration from legacy tools.",
    outcome: "Legacy data arrives validated, not pasted in.",
    sections: [
      {
        items: [
          "Fleet Smart Onboarding (Excel/CSV)",
          "Crew Directory bulk CSV ingestion",
          "Sea Experience / Sea Service CSV import",
          "Batch Certificate OCR ingestion",
        ],
      },
    ],
  },
  {
    id: "enterprise",
    icon: ShieldCheck,
    name: "Enterprise Controls",
    summary: "What an enterprise rollout depends on.",
    outcome: "Each role sees exactly the records it is accountable for.",
    sections: [
      {
        items: [
          "Role Management / RBAC",
          "Multi-tenant and enterprise asset scoping",
          "Account settings & digital signature profiles",
          "Team invite and user administration",
        ],
      },
    ],
  },
];

function countItems(group: ModuleGroup) {
  return group.sections.reduce((total, section) => total + section.items.length, 0);
}

export function Modules() {
  const [activeId, setActiveId] = useState(GROUPS[3].id);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const active = GROUPS.find((group) => group.id === activeId) ?? GROUPS[0];

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
    const back = event.key === "ArrowUp" || event.key === "ArrowLeft";
    let next = index;
    if (forward) next = (index + 1) % GROUPS.length;
    if (back) next = (index - 1 + GROUPS.length) % GROUPS.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = GROUPS.length - 1;

    setActiveId(GROUPS[next].id);
    tabsRef.current[next]?.focus();
  }

  return (
    <section id="modules" className="border-y border-line bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Modules"
            title="The Maridots platform module map"
            description="Each pillar below is part of the managed preview — architectures and prototypes shared for evaluation with selective pilot partners. Select a pillar to review its scope. Nothing here is offered for open commercial licensing, public purchase, or automated subscription."
          />
          <Reveal delay={0.1}>
            <p className="hidden text-sm text-ink-subtle lg:block">
              {GROUPS.length} module groups ·{" "}
              {GROUPS.reduce((total, group) => total + countItems(group), 0)} modules
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[22rem_1fr] lg:gap-8">
          {/* min-w-0 lets the horizontal tab strip scroll instead of stretching the grid. */}
          <Reveal className="min-w-0">
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label="Module groups"
              className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
            >
              {GROUPS.map((group, index) => {
                const selected = group.id === activeId;
                return (
                  <button
                    key={group.id}
                    ref={(node) => {
                      tabsRef.current[index] = node;
                    }}
                    role="tab"
                    id={`module-tab-${group.id}`}
                    aria-selected={selected}
                    aria-controls={`module-panel-${group.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveId(group.id)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    className={cn(
                      "relative flex min-h-12 shrink-0 items-center gap-3 rounded-xl px-3.5 py-3 text-left transition-colors sm:px-4 lg:w-full",
                      selected ? "text-slate-900" : "text-slate-600 hover:text-slate-900",
                    )}
                  >
                    {selected ? (
                      <motion.span
                        layoutId="module-tab"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                        className="absolute inset-0 rounded-xl border border-ocean-200 bg-ocean-50"
                      />
                    ) : null}
                    <span
                      className={cn(
                        "relative z-10 inline-flex size-9 shrink-0 items-center justify-center rounded-lg ring-1 transition-colors",
                        selected
                          ? "bg-ocean-600 text-white ring-ocean-600"
                          : "bg-canvas text-ocean-600 ring-line",
                      )}
                    >
                      <group.icon className="size-4.5" />
                    </span>
                    <span className="relative z-10 flex-1">
                      <span className="block text-sm font-semibold whitespace-nowrap lg:whitespace-normal">
                        {group.name}
                      </span>
                      <span className="mt-0.5 hidden text-xs text-ink-subtle lg:block">
                        {countItems(group)} modules
                      </span>
                    </span>
                    {group.core ? (
                      <span className="relative z-10 hidden rounded-full bg-ocean-600/10 px-2 py-0.5 text-[10px] font-bold tracking-wide text-ocean-700 uppercase lg:inline">
                        Core
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                role="tabpanel"
                id={`module-panel-${active.id}`}
                aria-labelledby={`module-tab-${active.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                className="card relative h-full overflow-hidden p-5 sm:p-8"
              >
                <div
                  aria-hidden="true"
                  className="absolute -top-24 -right-16 size-64 rounded-full bg-ocean-100/60 blur-3xl"
                />

                <div className="relative flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="display text-xl text-slate-900 sm:text-2xl">
                      {active.name}
                    </h3>
                    <p className="mt-2 max-w-xl text-[0.95rem] leading-7 text-slate-600">
                      {active.summary}
                    </p>
                  </div>
                  {active.core ? (
                    <span className="rounded-full bg-ocean-600 px-3 py-1 text-[11px] font-semibold tracking-wider text-white uppercase">
                      Core pillar
                    </span>
                  ) : null}
                </div>

                <div className="relative mt-7 space-y-7">
                  {active.sections.map((section, sectionIndex) => (
                    <div key={section.label ?? sectionIndex}>
                      {section.label ? (
                        <p className="mb-3 text-[11px] font-bold tracking-[0.16em] text-ocean-700 uppercase">
                          {section.label}
                        </p>
                      ) : null}
                      <ul className="grid gap-2.5 sm:grid-cols-2">
                        {section.items.map((item, itemIndex) => (
                          <motion.li
                            key={item}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.06 + itemIndex * 0.035,
                            }}
                            className="group flex items-start gap-2.5 rounded-lg border border-transparent px-3 py-2 transition-colors hover:border-line-soft hover:bg-canvas/70"
                          >
                            <Check className="mt-0.5 size-4 shrink-0 text-ocean-600" />
                            <span className="text-sm leading-6 text-ink-muted group-hover:text-ink">
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="relative mt-8 flex items-start gap-3 rounded-xl bg-rail-900 px-5 py-4">
                  <span className="mt-0.5 size-2 shrink-0 rounded-full bg-ocean-400" />
                  <p className="text-sm leading-6 text-slate-300">
                    <span className="font-semibold text-white">Outcome — </span>
                    {active.outcome}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
