# abdulalzokm.com

Personal portfolio for Abdul Alzokm, Product Designer. Next.js App Router,
TypeScript, Tailwind v4, Motion, MDX case studies, deployed on Vercel.

## Running it

```bash
npm install
cp .env.local.example .env.local   # then fill in RESEND_API_KEY
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build locally
npm run typecheck  # tsc --noEmit, no build required
npm run lint
```

## How it's put together

```
content/projects/*.mdx    Case studies. Content lives here, not in components.
public/                   Images, video, favicon, OG assets.
src/app/                  Routes. One folder per page.
src/components/           Reusable UI.
src/content/              Structured data: site config, experience, education.
src/lib/                  Loaders and helpers.
src/app/globals.css       The entire design system, in @theme at the top.
```

### Changing the look

Every colour, typeface and type size is a token in the `@theme` block at the
top of `src/app/globals.css`. Tailwind v4 turns each one into a utility
automatically, so `--color-accent` gives you `text-accent`, `bg-accent`,
`border-accent` and so on. Change the token, the whole site follows.

There is no `tailwind.config.ts`. That is on purpose. Tailwind v4 is
CSS-first, so the design system is one readable file.

### Adding a case study

Create `content/projects/your-slug.mdx`. The filename is the URL. Copy the
frontmatter from an existing file and fill it in. Nothing else needs to change:
the home grid, the projects index, prev/next links and the sitemap all read
from the folder.

Set `published: false` in the frontmatter to keep a draft in the repo but off
the site.

Inside the body you can use `<Figure>` and `<Video>` alongside normal markdown.

### Replacing images

Every image goes through `<ImageSlot>`. A slot with an empty `src` renders a
hatched placeholder that names the image that belongs there, so unfinished
assets are visible on the page rather than silently missing.

To fill one: drop the file in `public/`, then set `src="/path/to/file.jpg"` and
write a real `alt`. Search the repo for `TODO` to find every remaining slot.

## Contact form

The form at `/contact` posts to `src/app/api/contact/route.ts`, which sends
through [Resend](https://resend.com).

1. Create a Resend account and an API key.
2. Put it in `.env.local` as `RESEND_API_KEY`.
3. Add the same variable in Vercel under Project Settings, Environment
   Variables.

Until a domain is verified in Resend, mail sends from the shared
`onboarding@resend.dev` sender, which only delivers to the address on the
Resend account. Verify `abdulalzokm.com` in Resend to send from your own
domain and to any recipient.

## Deploying

Push to GitHub, import the repo at [vercel.com/new](https://vercel.com/new).
Framework preset is detected automatically. Add the environment variables from
`.env.local.example`, then deploy.

For the custom domain: add `abdulalzokm.com` in Vercel under Domains and point
the registrar's nameservers or A/CNAME records where Vercel tells you. Do this
after the new site is live on its `.vercel.app` URL so there is no gap.
