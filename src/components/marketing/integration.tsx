"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CircleCheck,
  FileSpreadsheet,
  ScanLine,
  Ship,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/marketing/reveal";
import { Reveal } from "@/components/marketing/motion";
import { cn } from "@/lib/utils";

type Pipeline = {
  id: string;
  icon: LucideIcon;
  title: string;
  body: string;
  tags: string[];
  /** What the staging screen shows for this route. */
  preview: { rows: string; accepted: string; flagged: string; check: string };
};

const PIPELINES: Pipeline[] = [
  {
    id: "fleet",
    icon: Ship,
    title: "Fleet Smart Onboarding",
    body: "Bulk import the fleet from Excel or CSV using the supplied template. Rows are staged, validated, and returned as an error report before anything is committed.",
    tags: ["Excel / CSV template", "Staging area", "Error report"],
    preview: {
      rows: "48 assets",
      accepted: "44 ready to commit",
      flagged: "4 need attention",
      check: "IMO format and duplicate hull check",
    },
  },
  {
    id: "crew",
    icon: UserCheck,
    title: "Crew Directory bulk ingestion",
    body: "Load the crew list from the master CSV template, stage the STCW certificate matrix alongside it, and cross-check entries against IMO numbers and fleet assignments.",
    tags: ["Master crew template", "STCW matrix staging", "IMO / fleet cross-check"],
    preview: {
      rows: "612 seafarers",
      accepted: "598 ready to commit",
      flagged: "14 need attention",
      check: "STCW certificate matrix cross-check",
    },
  },
  {
    id: "sea-service",
    icon: FileSpreadsheet,
    title: "Sea Experience / Sea Service import",
    body: "Bring contracts and their proof documents across together, with each record cross-checked against the crew member and the asset it belongs to.",
    tags: ["Contracts CSV", "Proof documents", "Crew / asset cross-check"],
    preview: {
      rows: "1,340 contracts",
      accepted: "1,301 ready to commit",
      flagged: "39 need attention",
      check: "Crew and asset reference match",
    },
  },
  {
    id: "ocr",
    icon: ScanLine,
    title: "Batch Certificate OCR ingestion",
    body: "Upload certificates in bulk — multi-file or ZIP. OCR extracts the details, correlates them to the right asset or crew member, and waits for review before commit.",
    tags: ["Multi-file / ZIP", "OCR extraction", "Correlate, review, commit"],
    preview: {
      rows: "276 documents",
      accepted: "251 auto-correlated",
      flagged: "25 for manual review",
      check: "Issue and expiry date extraction",
    },
  },
];

const STAGES = ["Upload", "Stage", "Validate", "Review", "Commit"];

export function Integration() {
  const [activeId, setActiveId] = useState(PIPELINES[0].id);
  const [stage, setStage] = useState(0);
  const reduce = useReducedMotion();
  const active = PIPELINES.find((entry) => entry.id === activeId) ?? PIPELINES[0];

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => {
      setStage((current) => Math.min(current + 1, STAGES.length - 1));
    }, 900);
    return () => clearInterval(timer);
  }, [activeId, reduce]);

  // With motion disabled the walkthrough has no value, so show the end state.
  const shownStage = reduce ? STAGES.length - 1 : stage;

  function selectPipeline(id: string) {
    setActiveId(id);
    setStage(0);
  }

  return (
    <section
      id="integrations"
      className="border-y border-line bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Smart integration & migration"
          title="Bring fleet, crew, sea service, and certificates across without losing control"
          description="Most operators sit on spreadsheets and third-party tools, and a bad import is worse than no import. This prototype studies controlled migration: every route into Maridots goes through staging, validation, and review before anything becomes a record."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
          <Reveal>
            <div className="flex flex-col gap-3">
              {PIPELINES.map((pipeline) => {
                const selected = pipeline.id === activeId;
                return (
                  <button
                    key={pipeline.id}
                    onClick={() => selectPipeline(pipeline.id)}
                    aria-pressed={selected}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border p-5 text-left transition-all",
                      selected
                        ? "border-ocean-300 bg-ocean-50/60 shadow-[0_18px_40px_-28px_rgba(2,132,199,0.8)]"
                        : "border-line bg-white hover:border-ocean-200",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "inline-flex size-10 items-center justify-center rounded-xl ring-1 transition-colors",
                          selected
                            ? "bg-ocean-600 text-white ring-ocean-600"
                            : "bg-canvas text-ocean-600 ring-line",
                        )}
                      >
                        <pipeline.icon className="size-5" />
                      </span>
                      <h3 className="font-semibold text-ink">{pipeline.title}</h3>
                    </div>

                    <AnimatePresence initial={false}>
                      {selected ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 text-sm leading-6 text-ink-muted">
                            {pipeline.body}
                          </p>
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {pipeline.tags.map((tag) => (
                              <li
                                key={tag}
                                className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-ocean-700 ring-1 ring-ocean-100"
                              >
                                {tag}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card sticky top-28 overflow-hidden">
              <header className="flex items-center justify-between gap-3 border-b border-line bg-rail-900 px-5 py-4">
                <p className="text-sm font-semibold text-white">
                  Migration staging — {active.title}
                </p>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-ocean-200">
                  {active.preview.rows}
                </span>
              </header>

              <div className="px-5 py-6">
                <ol className="flex items-center">
                  {STAGES.map((label, index) => {
                    const done = index <= shownStage;
                    return (
                      <li key={label} className="flex flex-1 items-center last:flex-none">
                        <div className="flex flex-col items-center gap-2">
                          <motion.span
                            animate={{
                              scale: index === shownStage && !reduce ? [1, 1.18, 1] : 1,
                            }}
                            transition={{ duration: 0.5 }}
                            className={cn(
                              "grid size-8 place-items-center rounded-full text-xs font-bold ring-1 transition-colors",
                              done
                                ? "bg-ocean-600 text-white ring-ocean-600"
                                : "bg-white text-ink-subtle ring-line",
                            )}
                          >
                            {done ? (
                              <CircleCheck className="size-4" />
                            ) : (
                              index + 1
                            )}
                          </motion.span>
                          <span
                            className={cn(
                              "text-[11px] font-medium",
                              done ? "text-ink" : "text-ink-subtle",
                            )}
                          >
                            {label}
                          </span>
                        </div>
                        {index < STAGES.length - 1 ? (
                          <div className="mx-1 mb-5 h-0.5 flex-1 overflow-hidden rounded-full bg-line-soft">
                            <motion.div
                              className="h-full bg-ocean-500"
                              initial={false}
                              animate={{ width: index < shownStage ? "100%" : "0%" }}
                              transition={{ duration: reduce ? 0 : 0.5, ease: "easeOut" }}
                            />
                          </div>
                        ) : null}
                      </li>
                    );
                  })}
                </ol>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="mt-7 space-y-3"
                  >
                    <PreviewRow
                      tone="success"
                      label="Accepted"
                      value={active.preview.accepted}
                    />
                    <PreviewRow
                      tone="warning"
                      label="Flagged"
                      value={active.preview.flagged}
                    />
                    <PreviewRow
                      tone="neutral"
                      label="Validation"
                      value={active.preview.check}
                    />
                  </motion.div>
                </AnimatePresence>

                <p className="mt-6 border-t border-line-soft pt-4 text-xs leading-5 text-ink-subtle">
                  Nothing reaches the live register until the flagged rows are
                  resolved and the import is committed by a named user.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PreviewRow({
  tone,
  label,
  value,
}: {
  tone: "success" | "warning" | "neutral";
  label: string;
  value: string;
}) {
  const dot =
    tone === "success"
      ? "bg-rag-success"
      : tone === "warning"
        ? "bg-rag-warning"
        : "bg-ocean-400";

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-canvas/70 px-4 py-3">
      <span className="flex items-center gap-2.5 text-sm text-ink-muted">
        <span className={cn("size-2 rounded-full", dot)} />
        {label}
      </span>
      <span className="text-sm font-semibold text-ink">{value}</span>
    </div>
  );
}
