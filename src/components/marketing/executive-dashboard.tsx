"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CircleAlert,
  FlaskConical,
  Info,
  TriangleAlert,
} from "lucide-react";

import { CountUp, Reveal } from "@/components/marketing/motion";
import { SectionHeading } from "@/components/marketing/reveal";
import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "danger";
type TabId = "overview" | "compliance" | "risk" | "audits";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "compliance", label: "Compliance" },
  { id: "risk", label: "Risk" },
  { id: "audits", label: "Audits" },
];

/* All figures below are illustrative demo data, labelled as such in the UI. */

const EXPIRY = [
  {
    band: "Critical",
    window: "30 days",
    count: 6,
    tone: "danger" as Tone,
    note: "Renew before next port call",
  },
  {
    band: "Watch",
    window: "60 days",
    count: 11,
    tone: "warning" as Tone,
    note: "Book surveys and attendances",
  },
  {
    band: "Horizon",
    window: "90 days",
    count: 19,
    tone: "success" as Tone,
    note: "Plan into the maintenance window",
  },
];

const GAUGES = [
  { label: "Fleet compliance", value: 92, tone: "success" as Tone },
  { label: "Crew compliance", value: 87, tone: "warning" as Tone },
  { label: "Audit closure", value: 78, tone: "warning" as Tone },
];

const TREND = {
  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  values: [79, 82, 81, 85, 88, 92],
};

const SEVERITIES = ["Catastrophic", "Major", "Moderate", "Minor"];
const LIKELIHOODS = ["Rare", "Unlikely", "Possible", "Likely", "Frequent"];

/** Open findings per severity (row) and likelihood (column). */
const HEAT: number[][] = [
  [0, 1, 0, 0, 0],
  [1, 2, 3, 1, 0],
  [2, 4, 6, 3, 1],
  [3, 5, 8, 4, 2],
];

const BARRIERS = [
  {
    label: "Mooring integrity",
    value: 64,
    tone: "danger" as Tone,
    spark: [82, 79, 74, 71, 68, 64],
  },
  {
    label: "Enclosed space entry",
    value: 88,
    tone: "success" as Tone,
    spark: [80, 82, 84, 85, 87, 88],
  },
  {
    label: "Bunkering controls",
    value: 76,
    tone: "warning" as Tone,
    spark: [72, 74, 73, 75, 74, 76],
  },
  {
    label: "Navigation watchkeeping",
    value: 91,
    tone: "success" as Tone,
    spark: [86, 87, 89, 90, 90, 91],
  },
];

const AUDIT_PIPELINE = [
  { label: "Closed", value: 42, tone: "success" as Tone },
  { label: "In progress", value: 9, tone: "warning" as Tone },
  { label: "Scheduled", value: 17, tone: "success" as Tone },
  { label: "Overdue", value: 4, tone: "danger" as Tone },
];

const INSIGHTS = [
  {
    severity: "Critical",
    title: "Three certificates expire before a Paris MoU call",
    why: "The vessel is scheduled into a high-inspection-rate port while statutory certificates lapse — the combination is what turns a finding into a detention.",
    evidence: "3 certificates · 1 asset · PSC pre-arrival schedule",
    action:
      "Book renewal surveys before arrival, or re-sequence the port rotation",
  },
  {
    severity: "Watch",
    title: "Mooring barrier health is trending down fleet-wide",
    why: "Barrier condition has fallen across four vessels this quarter. A shared decline points at a fleet procedure rather than four isolated findings.",
    evidence: "4 bowtie models · 11 findings · 6-month trend",
    action: "Raise a Management of Change review on the mooring procedure",
  },
  {
    severity: "Info",
    title: "Audit closure is slipping in one operating unit",
    why: "Closure rate sits 11 points below the fleet average. The delay is in verification evidence, not in the corrective work itself.",
    evidence: "18 audits · 1 operating unit",
    action: "Ask the unit QM to attach closure evidence at verification",
  },
];

const TONE_TEXT: Record<Tone, string> = {
  success: "text-rag-success",
  warning: "text-rag-warning",
  danger: "text-rag-danger",
};

const TONE_STROKE: Record<Tone, string> = {
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
};

const TONE_CHIP: Record<Tone, string> = {
  success: "bg-rag-success/10 text-green-200 ring-rag-success/30",
  warning: "bg-rag-warning/10 text-amber-200 ring-rag-warning/30",
  danger: "bg-rag-danger/10 text-red-200 ring-rag-danger/30",
};

const SEVERITY_CHIP: Record<string, string> = {
  Critical: "bg-rag-danger/15 text-red-200 ring-rag-danger/40",
  Watch: "bg-rag-warning/15 text-amber-200 ring-rag-warning/40",
  Info: "bg-ocean-400/15 text-ocean-200 ring-ocean-400/40",
};

const SEVERITY_ICON: Record<string, typeof CircleAlert> = {
  Critical: CircleAlert,
  Watch: TriangleAlert,
  Info: Info,
};

export function ExecutiveDashboard() {
  const [tab, setTab] = useState<TabId>("overview");

  return (
    <section
      id="dashboard"
      className="mesh-dark relative isolate overflow-hidden py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="grid-fine-dark absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Executive dashboard & AI"
          title="Executive dashboard with AI-assisted insight"
          description="A research prototype exploring how fleet compliance and risk posture read at a glance — the system highlights what needs attention; accountable officers decide."
          tone="dark"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          {/* min-w-0 keeps the tab strip and risk matrix scrollable inside the grid track. */}
          <Reveal className="min-w-0">
            <div className="glass overflow-hidden rounded-2xl shadow-[0_40px_80px_-50px_rgba(2,132,199,0.9)]">
              <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Executive command preview
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Fleet-wide · rolling 90 days
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-ocean-200 ring-1 ring-white/10">
                  <FlaskConical className="size-3" />
                  R&amp;D prototype · illustrative data
                </span>
              </header>

              <div
                role="tablist"
                aria-label="Dashboard view"
                className="flex gap-1 overflow-x-auto border-b border-white/10 px-3 py-2"
              >
                {TABS.map((entry) => {
                  const selected = entry.id === tab;
                  return (
                    <button
                      key={entry.id}
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setTab(entry.id)}
                      className={cn(
                        "relative rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors",
                        selected
                          ? "text-rail-900"
                          : "text-slate-300 hover:text-white",
                      )}
                    >
                      {selected ? (
                        <motion.span
                          layoutId="dashboard-tab"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 34,
                          }}
                          className="absolute inset-0 rounded-full bg-ocean-300"
                        />
                      ) : null}
                      <span className="relative z-10">{entry.label}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                  className="px-5 py-6"
                >
                  {tab === "overview" ? <OverviewPanel /> : null}
                  {tab === "compliance" ? <CompliancePanel /> : null}
                  {tab === "risk" ? <RiskPanel /> : null}
                  {tab === "audits" ? <AuditsPanel /> : null}
                </motion.div>
              </AnimatePresence>

              <footer className="border-t border-white/10 px-5 py-3">
                <RagLegend />
              </footer>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass flex h-full flex-col rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-ocean-500/20 text-ocean-200 ring-1 ring-ocean-400/30">
                  <Bot className="size-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-white">
                    AI-assisted, not AI-decided
                  </h3>
                  <p className="text-xs text-slate-400">
                    Every insight cites the records behind it
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {INSIGHTS.map((insight, index) => {
                  const Icon = SEVERITY_ICON[insight.severity];
                  return (
                    <motion.article
                      key={insight.title}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.45, delay: index * 0.1 }}
                      className="group rounded-xl border border-white/10 bg-rail-900/60 p-4 transition-colors hover:border-ocean-400/40"
                    >
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ring-1",
                          SEVERITY_CHIP[insight.severity],
                        )}
                      >
                        <Icon className="size-3" />
                        {insight.severity}
                      </span>
                      <h4 className="mt-2.5 text-sm leading-6 font-semibold text-white">
                        {insight.title}
                      </h4>
                      <p className="mt-1.5 text-[13px] leading-6 text-slate-300">
                        {insight.why}
                      </p>
                      <p className="mt-3 text-[11px] text-slate-400">
                        Evidence: {insight.evidence}
                      </p>
                      <p className="mt-2 flex items-start gap-1.5 border-t border-white/10 pt-2.5 text-[12px] leading-5 text-ocean-200">
                        <ArrowRight className="mt-0.5 size-3.5 shrink-0" />
                        {insight.action}
                      </p>
                    </motion.article>
                  );
                })}
              </div>

              <p className="mt-5 text-[11px] leading-5 text-slate-400">
                The DPA or Quality Manager accepts, dismisses, or escalates each
                insight. Maridots orders the queue; the accountable officer
                decides.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Panels ------------------------------------------------------------------ */

function OverviewPanel() {
  return (
    <div className="space-y-6">
      <ExpiryHorizon />
      <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
        <GaugeCluster compact />
        <AreaTrend id="overview" />
      </div>
      <OverdueCallout />
    </div>
  );
}

function CompliancePanel() {
  return (
    <div className="space-y-6">
      <ExpiryHorizon detailed />
      <div>
        <PanelLabel
          title="Six-month compliance trend"
          note="Fleet compliance rate, month end"
        />
        <AreaTrend id="compliance" tall />
      </div>
    </div>
  );
}

function RiskPanel() {
  return (
    <div className="space-y-6">
      <div>
        <PanelLabel
          title="Fleet risk matrix"
          note="Open findings by severity and likelihood"
        />
        <HeatMatrix />
      </div>
      <div>
        <PanelLabel
          title="Barrier health pulse"
          note="Bowtie barrier condition, last six months"
        />
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {BARRIERS.map((barrier) => (
            <div
              key={barrier.label}
              className="flex items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-[13px] text-slate-200">
                  {barrier.label}
                </p>
                <p
                  className={cn(
                    "text-lg font-semibold tabular-nums",
                    TONE_TEXT[barrier.tone],
                  )}
                >
                  <CountUp value={barrier.value} suffix="%" duration={1} />
                </p>
              </div>
              <Sparkline points={barrier.spark} tone={barrier.tone} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AuditsPanel() {
  const total = AUDIT_PIPELINE.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="space-y-6">
      <OverdueCallout />
      <div>
        <PanelLabel
          title="Audit pipeline"
          note={`${total} audits in the rolling window`}
        />
        <div className="mt-3 space-y-3">
          {AUDIT_PIPELINE.map((entry, index) => (
            <div key={entry.label}>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-slate-300">{entry.label}</span>
                <span className="font-semibold text-white tabular-nums">
                  <CountUp value={entry.value} duration={0.9} />
                </span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: TONE_STROKE[entry.tone] }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(entry.value / total) * 100}%` }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid place-items-center">
        <RingGauge label="Audit closure" value={78} tone="warning" />
      </div>
    </div>
  );
}

/* Building blocks --------------------------------------------------------- */

function PanelLabel({ title, note }: { title: string; note: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <p className="text-[11px] font-bold tracking-[0.16em] text-slate-300 uppercase">
        {title}
      </p>
      <p className="text-[11px] text-slate-400">{note}</p>
    </div>
  );
}

function ExpiryHorizon({ detailed = false }: { detailed?: boolean }) {
  return (
    <div>
      <PanelLabel
        title="Certificate expiry horizon"
        note="Statutory and class certificates, fleet-wide"
      />
      <div className="mt-3 grid grid-cols-3 gap-1.5 sm:gap-2.5">
        {EXPIRY.map((entry) => (
          <div
            key={entry.window}
            className={cn(
              "min-w-0 rounded-xl px-2 py-2.5 ring-1 transition-transform hover:-translate-y-0.5 sm:px-3 sm:py-3.5",
              TONE_CHIP[entry.tone],
            )}
          >
            <p className="text-[9px] font-bold tracking-wider uppercase sm:text-[10px]">
              {entry.band} · {entry.window}
            </p>
            <p className="display mt-1 text-2xl text-white tabular-nums sm:text-3xl">
              <CountUp value={entry.count} duration={1} />
            </p>
            {detailed ? (
              <p className="mt-1 text-[10px] leading-4 opacity-90 sm:text-[11px]">
                {entry.note}
              </p>
            ) : null}
          </div>
        ))}
      </div>
      <p className="mt-2.5 text-[11px] leading-5 text-slate-400">
        Counts are certificates falling due inside each window — the 60 and 90
        day bands are planning horizons, the 30 day band needs action now.
      </p>
    </div>
  );
}

function GaugeCluster({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {GAUGES.map((gauge) => (
        <RingGauge
          key={gauge.label}
          label={gauge.label}
          value={gauge.value}
          tone={gauge.tone}
          size={compact ? 104 : 128}
        />
      ))}
    </div>
  );
}

function RingGauge({
  label,
  value,
  tone,
  size = 128,
}: {
  label: string;
  value: number;
  tone: Tone;
  size?: number;
}) {
  const reduce = useReducedMotion();
  const radius = 52;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex shrink-0 flex-col items-center gap-2">
      <div
        className="relative grid place-items-center"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 128 128" className="size-full -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            strokeWidth="9"
            className="stroke-white/10"
          />
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            strokeWidth="9"
            strokeLinecap="round"
            stroke={TONE_STROKE[tone]}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{
              strokeDashoffset: circumference * (1 - value / 100),
            }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 1.1, ease: "easeOut" }}
          />
        </svg>
        <p className="display absolute text-2xl text-white tabular-nums">
          <CountUp value={value} suffix="%" />
        </p>
      </div>
      <p className="max-w-28 text-center text-[11px] leading-4 text-slate-400">
        {label}
      </p>
    </div>
  );
}

function AreaTrend({ id, tall = false }: { id: string; tall?: boolean }) {
  const reduce = useReducedMotion();
  const width = 320;
  const height = tall ? 132 : 104;
  const values = TREND.values;
  const min = Math.min(...values) - 8;
  const max = Math.max(...values) + 4;
  const x = (index: number) => (index / (values.length - 1)) * width;
  const y = (value: number) =>
    height - 14 - ((value - min) / (max - min)) * (height - 28);

  const line = values
    .map(
      (value, index) =>
        `${index === 0 ? "M" : "L"}${x(index).toFixed(1)},${y(value).toFixed(1)}`,
    )
    .join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;

  return (
    <div className="mt-3">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ height }}
        preserveAspectRatio="none"
        role="img"
        aria-label="Six-month fleet compliance trend, rising from 79 to 92 percent"
      >
        <defs>
          <linearGradient id={`area-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((ratio) => (
          <line
            key={ratio}
            x1="0"
            x2={width}
            y1={height * ratio}
            y2={height * ratio}
            stroke="rgba(148,197,235,0.12)"
            strokeWidth="1"
          />
        ))}
        <motion.path
          d={area}
          fill={`url(#area-${id})`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 0.9, delay: 0.25 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: reduce ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 1.2, ease: "easeInOut" }}
        />
        <circle
          cx={x(values.length - 1)}
          cy={y(values[values.length - 1])}
          r="4"
          fill="#38bdf8"
        />
      </svg>
      <div className="mt-1 flex justify-between text-[10px] text-slate-400">
        {TREND.labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function HeatMatrix() {
  const reduce = useReducedMotion();

  return (
    <div className="mt-3 overflow-x-auto">
      <div className="min-w-[24rem]">
        <div className="grid grid-cols-[6.5rem_repeat(5,1fr)] gap-1">
          {SEVERITIES.map((severity, rowIndex) => (
            <div key={severity} className="contents">
              <div className="flex items-center pr-2 text-[11px] text-slate-400">
                {severity}
              </div>
              {HEAT[rowIndex].map((count, columnIndex) => {
                // Conventional severity × likelihood score; severity rises up the rows.
                const score =
                  (SEVERITIES.length - rowIndex) * (columnIndex + 1);
                const tone: Tone =
                  score >= 8 ? "danger" : score >= 4 ? "warning" : "success";
                return (
                  <motion.div
                    key={`${severity}-${LIKELIHOODS[columnIndex]}`}
                    title={`${severity} · ${LIKELIHOODS[columnIndex]} — ${count} open findings`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: reduce ? 0 : 0.3,
                      delay: reduce ? 0 : (rowIndex * 5 + columnIndex) * 0.015,
                    }}
                    className="grid h-10 place-items-center rounded-md text-xs font-semibold text-white/90 ring-1 ring-inset transition-transform hover:scale-105"
                    style={{
                      backgroundColor: `${TONE_STROKE[tone]}${count === 0 ? "12" : "2e"}`,
                      borderColor: "transparent",
                      boxShadow: `inset 0 0 0 1px ${TONE_STROKE[tone]}55`,
                    }}
                  >
                    {count || "—"}
                  </motion.div>
                );
              })}
            </div>
          ))}
          <div />
          {LIKELIHOODS.map((likelihood) => (
            <div
              key={likelihood}
              className="pt-1 text-center text-[10px] text-slate-400"
            >
              {likelihood}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Sparkline({ points, tone }: { points: number[]; tone: Tone }) {
  const reduce = useReducedMotion();
  const min = Math.min(...points) - 4;
  const max = Math.max(...points) + 4;
  const path = points
    .map((value, index) => {
      const x = (index / (points.length - 1)) * 72;
      const y = 28 - ((value - min) / (max - min)) * 24;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 72 30" className="h-8 w-20 shrink-0" aria-hidden="true">
      <motion.path
        d={path}
        fill="none"
        stroke={TONE_STROKE[tone]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 1, ease: "easeInOut" }}
      />
    </svg>
  );
}

function OverdueCallout() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-rag-danger/10 px-4 py-3.5 ring-1 ring-rag-danger/30">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-rag-danger/20 text-red-200">
          <TriangleAlert className="size-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-white">
            4 audits overdue across 3 vessels
          </p>
          <p className="text-[11px] text-slate-300">
            Highest severity: annual internal ISM audit, 21 days past schedule
          </p>
        </div>
      </div>
      <span className="rounded-full bg-rag-danger/20 px-2.5 py-1 text-[10px] font-bold tracking-wider text-red-200 uppercase">
        Action required
      </span>
    </div>
  );
}

function RagLegend() {
  const items: { tone: Tone; label: string }[] = [
    { tone: "success", label: "On track" },
    { tone: "warning", label: "Watch" },
    { tone: "danger", label: "Action required" },
  ];

  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
      {items.map((item) => (
        <li
          key={item.label}
          className="flex items-center gap-1.5 text-[11px] text-slate-400"
        >
          <span
            className="size-2 rounded-full"
            style={{ backgroundColor: TONE_STROKE[item.tone] }}
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
}
