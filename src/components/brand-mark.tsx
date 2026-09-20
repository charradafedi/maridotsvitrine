import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex size-9 items-center justify-center", className)}>
      <span className="absolute inset-0 rounded-full bg-brand-500/25 animate-sonar" />
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="relative size-full"
      >
        <defs>
          <linearGradient id="maridots-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="55%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <circle
          cx="16"
          cy="16"
          r="14.25"
          fill="none"
          stroke="url(#maridots-mark)"
          strokeWidth="1.25"
          opacity="0.35"
        />
        <path
          d="M2.6 19.5c2.6 0 2.6 2.6 5.2 2.6s2.6-2.6 5.2-2.6 2.6 2.6 5.2 2.6 2.6-2.6 5.2-2.6 2.6 2.6 5.2 2.6"
          fill="none"
          stroke="url(#maridots-mark)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.55"
        />
        <circle
          cx="16"
          cy="13"
          r="7.5"
          fill="none"
          stroke="url(#maridots-mark)"
          strokeWidth="1.5"
          opacity="0.75"
        />
        <circle cx="16" cy="13" r="3.4" fill="url(#maridots-mark)" />
      </svg>
    </span>
  );
}

export function BrandWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <BrandMark />
      <span className="text-lg font-semibold tracking-tight text-slate-50">
        Mari<span className="text-gradient">Dots</span>
      </span>
    </span>
  );
}
