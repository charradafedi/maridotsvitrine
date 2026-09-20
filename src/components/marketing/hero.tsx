"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Play } from "lucide-react";

import { WordReveal } from "@/components/marketing/motion";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="mesh-dark relative isolate overflow-hidden pb-36">
      <Image
        src="/assets/hero-fleet.png"
        alt="A bulk carrier underway on open sea"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-55"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-rail-900 via-rail-900/88 to-rail-900/25"
      />
      <div
        aria-hidden="true"
        className="grid-fine-dark absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_20%_30%,#000,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="animate-drift absolute -top-40 -left-32 size-[34rem] rounded-full bg-ocean-500/25 blur-[140px]"
      />

      <div className="relative mx-auto flex min-h-[40rem] max-w-7xl items-center px-5 pt-24 pb-16 sm:px-8 sm:pt-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2"
          >
            <span className="relative flex size-2.5">
              {!reduce ? (
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-ocean-400 opacity-70" />
              ) : null}
              <span className="relative inline-flex size-2.5 rounded-full bg-ocean-400" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-slate-200">
              International R&amp;D · Tunisia administrative oversight
            </span>
          </motion.div>

          <h1 className="display mt-7 text-[2.6rem] leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]">
            <WordReveal text="Streamline Compliance." delay={0.1} />
            <br />
            <WordReveal
              text="Safeguard Your Assets."
              delay={0.35}
              highlight={["Safeguard", "Your", "Assets."]}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-7 max-w-xl text-lg leading-8 text-slate-300"
          >
            A research initiative into one controlled record of fleet
            compliance and risk — certificates, audits, CAPA, and permits, with
            the guidance and archived evidence behind them. The prototypes shown
            here are internal R&amp;D, published for technical discussion with
            maritime practitioners.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ocean-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-16px_rgba(2,132,199,0.9)] transition-colors hover:bg-ocean-500"
            >
              Write to the research team
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#modules"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/10"
            >
              <Play className="size-3.5 fill-current" />
              See the research prototypes
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-12 flex items-center gap-3 text-xs tracking-wide text-slate-400"
          >
            <ChevronDown
              className={reduce ? "size-4" : "size-4 animate-bounce"}
              aria-hidden="true"
            />
            Built around ISM, STCW, MARPOL, MLC and ISPS workflows
          </motion.div>
        </div>
      </div>

    </section>
  );
}
