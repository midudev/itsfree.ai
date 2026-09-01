# it's free*

Directory of every free way to run an AI model.

## Show every free provider {#providers}
files: [src/data/providers.ts, src/data/provider-about.ts, src/data/resources.ts, src/pages/index.astro, src/pages/provider/[id].astro, src/components/ProviderTable.astro]
links: [models, collections]

## List every free model {#models}
files: [src/data/models.ts, src/pages/models.astro, src/pages/model/[slug].astro]
links: [providers]

## Group by what you need {#collections}
files: [src/data/collections.ts, src/pages/[collection].astro]
links: [providers]

## Chrome, SEO and share cards {#chrome}
files: [src/layouts/Layout.astro, src/lib/seo.ts, src/components/SiteHeader.astro, src/components/SiteFooter.astro, public/og.png, public/og/**, public/favicon.ico, public/favicon.svg, public/favicon-16x16.png, public/favicon-32x32.png, public/apple-touch-icon.png, public/icon-192x192.png, public/icon-512x512.png, public/site.webmanifest, scripts/build-og-image.py, scripts/build-favicons.py]
- [x] Open Graph files for every page {#og-files}
  by: cursor
  from: agent
  tech: 1200×630 PNG per route under public/og, favicon set + site.webmanifest, tags per opengraph.to/articles

## decisions

- 2026-09-01: One 1200×630 PNG per shareable route (`/og.png` for home, `/og/…` for the rest). Titles clamp to 60 characters, descriptions to 110–160, no URLs in `og:description`. Favicon set matches the OpenGraph.to complete setup, including `site.webmanifest`.
