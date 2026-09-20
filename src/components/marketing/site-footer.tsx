import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

import { FIRM_VALUES } from "@/lib/firm-values";

// Section links are absolute so they also work from the legal pages.
const COLUMNS = [
  {
    title: "Research",
    links: [
      { label: "Solution", href: "/#solution" },
      { label: "Modules", href: "/#modules" },
      { label: "Knowledge & Reference", href: "/#knowledge" },
      { label: "Integrations & migration", href: "/#integrations" },
      { label: "Executive dashboard & AI", href: "/#dashboard" },
      { label: "Security & monitoring", href: "/#security" },
    ],
  },
  {
    title: "Initiative",
    links: [
      { label: "Enablement research", href: "/#support" },
      { label: "Collaboration", href: "/#plans" },
      { label: "Write to the research team", href: "/#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy notice", href: "/privacy" },
      { label: "Research notice", href: "/notice" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-rail-900">
      <div className="border-b border-white/10">
        <ul className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-5 py-5 sm:px-8">
          {FIRM_VALUES.map((value) => (
            <li
              key={value.id}
              className="flex items-center gap-2 text-xs font-medium tracking-wide text-slate-400"
            >
              <span aria-hidden="true" className="size-1.5 rounded-full bg-ocean-400" />
              {value.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Image
              src="/logo.png"
              alt="Maridots"
              width={280}
              height={280}
              className="h-28 w-auto rounded-xl bg-white p-2 sm:h-32"
            />
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
              An international cross-border technology research initiative into
              maritime compliance and risk architecture, jointly developed and
              managed with administrative oversight in Tunisia. Inquiries are
              handled by the international team at info@maridots.com.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-ocean-400" />
                <a href="mailto:info@maridots.com" className="hover:text-white">
                  info@maridots.com
                </a>
              </li>
            </ul>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © {year} Maridots. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            International research · Tunisia administrative oversight · not a
            commercial offering.
          </p>
        </div>
      </div>
    </footer>
  );
}
