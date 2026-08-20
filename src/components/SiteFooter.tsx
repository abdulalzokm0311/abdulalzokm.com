import Link from "next/link";

import { externalNav, links, nav, site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-rule md:mt-32">
      <div className="shell py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="label">Get in touch</p>
            <a
              href={links.email}
              className="mt-4 inline-block font-display text-h2 leading-none decoration-rule decoration-1 underline-offset-[0.15em] transition-colors hover:text-accent hover:decoration-accent focus-visible:text-accent"
            >
              {site.email}
            </a>
            <p className="mt-6 max-w-sm text-ink-soft">
              Looking to start a project? Feel free to contact me.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-5">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="label">Site</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-ink-soft transition-colors hover:text-ink"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="label">Elsewhere</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {externalNav.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1 text-sm text-ink-soft transition-colors hover:text-ink"
                      >
                        {item.label}
                        <span aria-hidden className="text-[0.7em]">
                          ↗
                        </span>
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">
            © {year} {site.name}
          </p>
          <p className="label">{site.location}</p>
        </div>
      </div>
    </footer>
  );
}
