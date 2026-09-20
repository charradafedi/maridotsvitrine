"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

import { ScrollProgress } from "@/components/marketing/motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Solution", id: "solution" },
  { label: "Modules", id: "modules" },
  { label: "Knowledge", id: "knowledge" },
  { label: "Integrations & Migration", id: "integrations" },
  { label: "Security & AI", id: "dashboard" },
  { label: "Enablement", id: "support" },
  { label: "Collaboration", id: "plans" },
  { label: "Contact", id: "contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const pathname = usePathname();
  // Section anchors only exist on the home page; from the legal pages the links
  // have to navigate home first.
  const onHome = pathname === "/";
  const anchor = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Highlight the section occupying the upper third of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.05, 0.2, 0.5] },
    );

    for (const link of NAV_LINKS) {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 isolate border-b border-line bg-white shadow-[0_8px_30px_-24px_rgba(15,23,42,0.45)] backdrop-blur-[12px] transition-shadow duration-300",
        scrolled && "shadow-[0_8px_30px_-20px_rgba(15,23,42,0.55)]",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8"
      >
        <Link href="/" className="flex shrink-0 items-center" aria-label="Maridots home">
          <Image
            src="/logotype.svg"
            alt="Maridots"
            width={168}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <ul className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => {
            const active = activeId === link.id;
            return (
              <li key={link.id} className="relative">
                <a
                  href={anchor(link.id)}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "relative z-10 block rounded-full px-3 py-2 text-[13px] font-medium whitespace-nowrap transition-colors",
                    active ? "text-ocean-700" : "text-ink-muted hover:text-ink",
                  )}
                >
                  {link.label}
                </a>
                {active ? (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-ocean-50 ring-1 ring-ocean-100"
                  />
                ) : null}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={anchor("contact")}
            className="group hidden items-center gap-2 rounded-full bg-ocean-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(2,132,199,0.9)] transition-colors hover:bg-ocean-700 sm:inline-flex"
          >
            Write to the research team
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-xl border border-line bg-white text-ink transition-colors hover:border-ocean-300 xl:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-white xl:hidden"
          >
            <ul className="mx-auto max-w-7xl px-5 py-3 sm:px-8">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={anchor(link.id)}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-line-soft py-3 text-sm font-medium text-ink last:border-0"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3 pb-1">
                <a
                  href={anchor("contact")}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl bg-ocean-600 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Write to the research team
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <ScrollProgress />
    </header>
  );
}
