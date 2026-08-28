import Link from "next/link";

import { Icon } from "@/components/Icon";
import { Wordmark } from "@/components/Wordmark";
import { footerExternal, footerNav, links, site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    /* Full bleed, rounded across the top, so the page ends on a deliberate
       shape rather than running off the bottom of the screen. */
    <footer className="mt-24 rounded-t-hero bg-accent text-paper md:mt-32">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center text-paper transition-opacity hover:opacity-80"
            >
              <Wordmark className="h-10" />
              <span className="sr-only">{site.name}</span>
            </Link>

            <p className="mt-5 max-w-xs text-sm text-accent-pale">
              {site.role} in {site.location}. Currently designing at RBC.
            </p>

            <ul className="mt-7 flex items-center gap-4">
              <li>
                <a
                  href={links.email}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 transition-colors hover:bg-paper/25"
                >
                  <Icon name="mail" className="h-5 w-5" />
                  <span className="sr-only">Email {site.name}</span>
                </a>
              </li>
              <li>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 transition-colors hover:bg-paper/25"
                >
                  <Icon name="linkedin" className="h-5 w-5" />
                  <span className="sr-only">
                    {site.name} on LinkedIn (opens in a new tab)
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="md:col-span-7">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <p className="eyebrow text-accent-pale">Site</p>
                <ul className="mt-5 flex flex-col gap-3">
                  {footerNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-paper/85 transition-colors hover:text-paper"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="eyebrow text-accent-pale">Elsewhere</p>
                <ul className="mt-5 flex flex-col gap-3">
                  {footerExternal.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 text-sm text-paper/85 transition-colors hover:text-paper"
                      >
                        {item.label}
                        <Icon name="external" className="h-3.5 w-3.5" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p className="eyebrow text-accent-pale">Get in touch</p>
                <a
                  href={links.email}
                  className="mt-5 block text-sm text-paper/85 transition-colors hover:text-paper"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-paper/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-accent-pale">
            © {year} {site.name}
          </p>
          <p className="text-xs text-accent-pale">Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
