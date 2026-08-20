import Link from "next/link";

import { SectionLabel } from "@/components/SectionLabel";

export const metadata = {
  title: "Not found",
};

export default function NotFound() {
  return (
    <section className="shell flex min-h-[60vh] flex-col justify-center py-24">
      <SectionLabel index="404" aside="Wrong turn">
        Not found
      </SectionLabel>

      <h1 className="mt-8 max-w-2xl text-h1">
        This page does not exist.
      </h1>

      <p className="mt-6 max-w-md text-ink-soft">
        The link may be old, or the page may have moved during the rebuild.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/"
          className="label rounded-full bg-ink px-6 py-3.5 text-paper transition-colors hover:bg-accent"
        >
          Back home
        </Link>
        <Link
          href="/projects"
          className="label rounded-full border border-rule px-6 py-3.5 text-ink transition-colors hover:border-ink"
        >
          See the work
        </Link>
      </div>
    </section>
  );
}
