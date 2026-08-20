"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { externalNav, nav, site } from "@/content/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Hairline under the header appears only once the page has moved. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the mobile menu on navigation. */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* While the menu is open: lock body scroll, close on Escape, move focus in. */
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-paper/85 backdrop-blur-md transition-colors duration-300",
        scrolled ? "border-b border-rule" : "border-b border-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 md:h-20">
        <Link
          href="/"
          className="font-mono text-label uppercase tracking-[0.14em] text-ink transition-opacity hover:opacity-60"
        >
          {site.name}
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "relative py-1 text-sm transition-colors hover:text-ink",
                    isActive(pathname, item.href) ? "text-ink" : "text-ink-soft",
                  )}
                >
                  {item.label}
                  {isActive(pathname, item.href) ? (
                    <span
                      aria-hidden
                      className="absolute -bottom-0.5 left-0 h-px w-full bg-accent"
                    />
                  ) : null}
                </Link>
              </li>
            ))}

            <li aria-hidden className="h-4 w-px bg-rule" />

            {externalNav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-1 text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="translate-y-px text-[0.7em] transition-transform group-hover:-translate-y-0 group-hover:translate-x-px"
                  >
                    ↗
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="label -mr-2 p-2 text-ink md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            tabIndex={-1}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-rule bg-paper outline-none md:hidden"
          >
            <nav aria-label="Mobile" className="shell py-8">
              <ul className="flex flex-col">
                {nav.map((item, index) => (
                  <li key={item.href} className="border-b border-rule">
                    <Link
                      href={item.href}
                      aria-current={
                        isActive(pathname, item.href) ? "page" : undefined
                      }
                      className="flex items-baseline gap-4 py-4 font-display text-h3"
                    >
                      <span className="label w-6 shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={
                          isActive(pathname, item.href)
                            ? "text-accent"
                            : "text-ink"
                        }
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="mt-8 flex flex-col gap-3">
                {externalNav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 text-ink-soft"
                    >
                      {item.label}
                      <span aria-hidden>↗</span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
