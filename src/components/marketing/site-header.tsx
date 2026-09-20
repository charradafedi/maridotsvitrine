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

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // Close the drawer if the viewport grows into the desktop nav range.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");
    const onChange = () => {
      if (media.matches) setMenuOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 isolate border-b border-slate-200 bg-white shadow-[0_8px_30px_-24px_rgba(15,23,42,0.45)] transition-shadow duration-300",
        scrolled && "shadow-[0_8px_30px_-20px_rgba(15,23,42,0.55)]",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6 md:h-[4.5rem] md:px-8"
      >
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center"
          aria-label="Maridots home"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/logotype.png"
            alt="Maridots"
            width={280}
            height={280}
            priority
            unoptimized
            className="h-10 w-auto sm:h-12 md:h-14"
          />
        </Link>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {NAV_LINKS.map((link) => {
            const active = activeId === link.id;
            return (
              <li key={link.id} className="relative">
                <a
                  href={anchor(link.id)}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "relative z-10 block rounded-full px-2.5 py-2 text-[13px] font-medium whitespace-nowrap transition-colors 2xl:px-3",
                    active ? "text-ocean-700" : "text-slate-600 hover:text-slate-900",
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

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={anchor("contact")}
            className="group hidden items-center gap-2 rounded-full bg-ocean-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(2,132,199,0.9)] transition-colors hover:bg-ocean-700 md:inline-flex md:px-4"
          >
            <span className="lg:hidden">Contact</span>
            <span className="hidden lg:inline">Write to the research team</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 transition-colors hover:border-ocean-300 hover:bg-ocean-50 xl:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <>
            <motion.button
              key="mobile-nav-backdrop"
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-14 bottom-0 z-40 bg-slate-900/45 sm:top-16 md:top-[4.5rem] xl:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              key="mobile-nav-panel"
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
              className="absolute inset-x-0 top-full z-50 border-b border-slate-200 bg-white shadow-[0_24px_48px_-24px_rgba(15,23,42,0.45)] xl:hidden"
            >
              <div className="mx-auto max-h-[min(78vh,40rem)] max-w-7xl overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5 md:px-8">
                <ul className="grid gap-1 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-1">
                  {NAV_LINKS.map((link) => {
                    const active = activeId === link.id;
                    return (
                      <li key={link.id}>
                        <a
                          href={anchor(link.id)}
                          onClick={() => setMenuOpen(false)}
                          aria-current={active ? "true" : undefined}
                          className={cn(
                            "flex min-h-12 items-center rounded-xl px-3.5 py-3 text-base font-semibold leading-snug transition-colors sm:min-h-14 sm:text-[1.05rem]",
                            active
                              ? "bg-ocean-50 text-ocean-800 ring-1 ring-ocean-100"
                              : "text-slate-900 hover:bg-slate-50",
                          )}
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-4 border-t border-slate-200 pt-4 sm:mt-5 sm:pt-5">
                  <a
                    href={anchor("contact")}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-ocean-600 px-4 py-3.5 text-center text-base font-semibold text-white shadow-[0_12px_28px_-16px_rgba(2,132,199,0.9)] transition-colors hover:bg-ocean-700"
                  >
                    Write to the research team
                    <ArrowRight className="size-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <ScrollProgress />
    </header>
  );
}
