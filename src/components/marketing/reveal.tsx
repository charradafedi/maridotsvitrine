"use client";

import { Reveal } from "@/components/marketing/motion";
import { cn } from "@/lib/utils";

export { Reveal };

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <Reveal
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      <p
        className={cn(
          "flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em]",
          align === "center" && "justify-center",
          dark ? "text-ocean-300" : "text-ocean-700",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "h-px w-8",
            dark ? "bg-ocean-400/60" : "bg-ocean-400",
          )}
        />
        {eyebrow}
      </p>
      <h2
        className={cn(
          "display mt-4 text-[2rem] leading-[1.12] tracking-tight sm:text-[2.6rem]",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-lg leading-8",
            dark ? "text-slate-300" : "text-ink-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
