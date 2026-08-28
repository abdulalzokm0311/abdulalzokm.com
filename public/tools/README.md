# Tool logos

The marquee shows a logo when one exists here, and falls back to the tool's
name as text when it does not. So a missing file degrades to what the strip
used to be rather than to a gap.

Present:
  figma.svg          drawn from the published mark
  photoshop.png      supplied, trimmed to the icon
  illustrator.png    supplied, trimmed to the icon
  jira.png           supplied as the full lockup, cropped to the symbol
  mural.png          supplied as a wordmark, kept whole
  asana.svg          supplied as a lockup, symbol path extracted

Everything except Mural is a symbol shown beside the tool's name. Mural was
supplied as a wordmark with no separable symbol, so its entry is flagged
`wordmark` and drops the label rather than saying the name twice.

The PNGs are exported at 128px tall, which is over 4x what the marquee draws
them at. Replace any of them with an official SVG if you get hold of one.

To add or change one, set its path, `ratio` (width over height) and any flags
in `tools` in src/content/site.ts. The ratio is what stops the row shifting as
the files load.
