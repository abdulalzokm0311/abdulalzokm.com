# Assets

Everything here is served from the site root, so `public/projects/westjet/cover.jpg`
is referenced as `/projects/westjet/cover.jpg`.

## What still needs replacing

Every image on the site currently renders as a hatched placeholder that names
what belongs there. To find them all:

```bash
grep -rn "TODO" src content
```

### Home and about
- Portrait photograph. Drop it here, then set `portrait` in `src/content/about.ts`.

### Case study covers
Drop a cover in `public/projects/<slug>/`, then set `cover` in that project's
frontmatter in `content/projects/<slug>.mdx`. Covers render at 4:3.

- `westjet` · WestJet booking flow
- `roomin` · Roomin compatibility match
- `pyrtc` · PyRTC dashboard
- `passafund` · Passafund lender view

### In-study images and video
Inside each `.mdx` file, `<Figure src="" ... />` and `<Video src="" ... />` are
the slots. Fill in `src` and write a real `alt`.

Video should be `.mp4` (H.264) for reach, with a `.webm` alongside if you want
smaller files. Keep clips short and muted, they are illustrations rather than
media.

## Favicon

`src/app/icon.svg` is the favicon. Replace that file to change it. Next
generates the link tags automatically.

## Open Graph

`src/app/opengraph-image.tsx` generates the social share card at build time
from your name and role, so there is no static image to maintain. Replace it
with a real `opengraph-image.jpg` in `src/app/` if you would rather art direct it.
