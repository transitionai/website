# Deployment

Source: https://github.com/transitionai/website
Website: https://transitioned.dev

## Git-connected Cloudflare Pages

The deployment uses the installed Cloudflare Workers and Pages GitHub app. Cloudflare builds commits pushed to `main`; no laptop process or GitHub API-token secret is required.

Build settings:

- Framework: None (Next.js static export)
- Root directory: repository root
- Build command: `pnpm install --frozen-lockfile && pnpm check`
- Output directory: `out`
- `NODE_VERSION`: `22.23.2`
- `PNPM_VERSION`: `11.11.0`
- `SKIP_DEPENDENCY_INSTALL`: `true`

`pnpm check` runs lint, type checking, a static production build, and the automatic Markdown export/live-route validation hook. GitHub Actions runs the same checks on pushes and pull requests. Only `out/` is published; environment files and generated build output are excluded from Git.

## Production project

- Project: `transition-website`
- Pages hostname: `https://transition-website-c5r.pages.dev`
- Production branch: `main`

The first Git-connected deployment passed on November 3, 2026 (Asia/Karachi), building commit `50c1d56` on Cloudflare. Its main pages, search JSON, Markdown routes, robots, and sitemap returned 200 with the expected content types; an unknown path returned 404. The custom domain has been moved to this project. The original Direct Upload project `transitionai` is retained as a fallback.

Preserve Email Routing MX/TXT records during domain changes. Verify HTTPS, the main and research pages, search, Markdown routes, robots, sitemap, and an unknown-path 404 after cutover.

## Rollback

Use Cloudflare Pages deployment history to roll back to a successful production deployment. The original Direct Upload project is retained during migration.
