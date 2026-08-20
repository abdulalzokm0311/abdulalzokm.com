import Link from "next/link";

import { Icon } from "@/components/Icon";

export const metadata = {
  title: "Not found",
};

export default function NotFound() {
  return (
    <section className="shell py-24">
      <div className="rounded-block bg-surface px-6 py-20 text-center">
        <p className="eyebrow text-accent">Error 404</p>

        <h1 className="text-section mx-auto mt-5 max-w-lg text-balance">
          This page does not exist.
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm">
          The link may be old, or the page may have moved during the rebuild.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="eyebrow inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-paper transition-colors hover:bg-accent-deep"
          >
            Back home
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <Link
            href="/projects"
            className="eyebrow inline-flex items-center gap-2 rounded-full bg-paper px-7 py-4 text-ink transition-colors hover:text-accent"
          >
            See the work
          </Link>
        </div>
      </div>
    </section>
  );
}
