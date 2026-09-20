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

      <div className="relative mx-auto flex min-h-[32rem] max-w-7xl items-center px-4 pt-16 pb-14 sm:min-h-[40rem] sm:px-6 sm:pt-24 sm:pb-16 md:px-8 md:pt-28">
        <div className="max-w-3xl">
          <h1 className="display text-[2.15rem] leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">
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
            className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:mt-7 sm:text-lg sm:leading-8"
          >
            Enterprise Fleet Intelligence &amp; Risk Control. Unify compliance
            management, automated risk assessment, and real-time alert
            generation to protect revenue, optimize operational efficiency, and
            drive sustainability—all built on a foundation of uncompromised
            security and architectural flexibility.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
          >
            <a
              href="#contact"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ocean-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-16px_rgba(2,132,199,0.9)] transition-colors hover:bg-ocean-500 sm:w-auto"
            >
              Write to the research team
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#modules"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/10 sm:w-auto"
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
