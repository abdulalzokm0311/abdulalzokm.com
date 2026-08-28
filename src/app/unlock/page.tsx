import type { Metadata } from "next";
import Link from "next/link";

import { Icon } from "@/components/Icon";
import { getAllProjects } from "@/lib/projects";
import { lockedSlugForPath, safeNextPath } from "@/lib/case-study-lock";
import { unlock } from "./actions";

export const metadata: Metadata = {
  title: "Protected case study",
  description: "This case study is under NDA and needs a password.",
  robots: { index: false, follow: false },
};

type Search = Promise<{ next?: string; state?: string }>;

export default async function UnlockPage({
  searchParams,
}: {
  searchParams: Search;
}) {
  const { next: rawNext, state } = await searchParams;
  const next = safeNextPath(rawNext);

  const slug = lockedSlugForPath(next);
  const project = slug
    ? getAllProjects().find((item) => item.slug === slug)
    : undefined;

  return (
    <section className="shell flex min-h-[calc(100dvh-14rem)] flex-col justify-center py-20">
      <div className="max-w-xl">
        <Link
          href="/projects"
          className="eyebrow inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-accent"
        >
          <Icon name="arrow" className="h-3.5 w-3.5 rotate-180" />
          All case studies
        </Link>

        <h1 className="text-hero mt-10 font-normal">
          {project ? project.title : "Protected case study"}
        </h1>

        <p className="mt-6 text-sub text-ink">
          This one is behind a password. The work is internal to RBC and has not
          shipped, so the screens are not something I can leave open on a public
          site.
        </p>

        <p className="mt-4 max-w-md text-sm">
          If you are hiring or reviewing my work, email me and I will send you
          the password. It opens both RBC studies for the length of your
          visit, and asks again next time.
        </p>

        {/* Native form post to a server action. The password is checked on the
            server and never reaches the client bundle. */}
        <form action={unlock} className="mt-10 max-w-md">
          <input type="hidden" name="next" value={next} />

          <label htmlFor="password" className="eyebrow block text-muted">
            Password
          </label>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              autoFocus
              aria-describedby={state ? "unlock-state" : undefined}
              className="w-full rounded-full border border-rule bg-paper px-5 py-3.5 text-ink outline-none transition-colors placeholder:text-muted focus-visible:border-accent"
            />

            <button
              type="submit"
              className="eyebrow shrink-0 rounded-full bg-accent px-7 py-3.5 text-paper transition-colors hover:bg-accent-deep"
            >
              Unlock
            </button>
          </div>

          {state === "wrong" ? (
            <p id="unlock-state" role="alert" className="mt-4 text-sm text-accent">
              That password did not work. Check it and try again.
            </p>
          ) : null}

          {state === "unset" ? (
            <p id="unlock-state" role="alert" className="mt-4 text-sm text-accent">
              No password is configured for this site yet, so nothing can be
              unlocked. Set CASE_STUDY_PASSWORD in the environment.
            </p>
          ) : null}
        </form>

        <p className="mt-10 text-sm text-muted">
          <a href="mailto:abdulalzokm@gmail.com" className="underline underline-offset-4 transition-colors hover:text-accent">
            abdulalzokm@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}
