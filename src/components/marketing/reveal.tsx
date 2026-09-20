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
          "display mt-4 text-[1.75rem] leading-[1.15] tracking-tight text-balance sm:text-[2.25rem] md:text-[2.6rem]",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-[0.95rem] leading-7 sm:mt-5 sm:text-lg sm:leading-8",
            dark ? "text-slate-200" : "text-slate-600",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
