# social-ops-public

Articles about automating the social apps I use: how a screen gets read, why an irreversible action makes the tool stop rather than guess, and how it audits its own results. The engineering repository is private; this site carries the write-ups only.

## How it is built

- Next.js with `output: 'export'`: every page is static HTML, no server features.
- `posts/*.md` is the only content. Front matter and body are rendered at build time (gray-matter + remark).
- Deployed twice from the same `main`:
  - **Vercel**: import the repository, no settings. Serves at the root path.
  - **GitHub Pages**: `.github/workflows/pages.yml` builds with `GITHUB_PAGES=true` so links carry the `/social-ops-public/` prefix. Repository Settings → Pages → Source must be *GitHub Actions*.
- Canonical URLs point at the Vercel deployment (`lib/site.js`). With a custom domain, set `url` there and drop the `basePath` lines in `next.config.mjs`.

## Local

```
npm ci
npm run dev          # http://localhost:3000
npm run build        # static site in out/
GITHUB_PAGES=true npm run build   # the Pages variant
```

Content is published from the private repository with `python scripts/publish.py`; see the `posts/README.md` note.
