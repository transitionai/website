# Deployment

Source: https://github.com/transitionai/website
Website: https://transitioned.dev

## Git-connected Cloudflare Pages

The target deployment uses the installed Cloudflare Workers and Pages GitHub app. Cloudflare builds commits pushed to `main`; no laptop process or GitHub API-token secret is required.

Build settings:

- Framework: None (Next.js static export)
- Root directory: repository root
- Build command: `pnpm install --frozen-lockfile && pnpm check`
- Output directory: `out`
- `NODE_VERSION`: `22.23.2`
- `PNPM_VERSION`: `11.11.0`
- `SKIP_DEPENDENCY_INSTALL`: `true`

`pnpm check` runs lint, type checking, a static production build, and the automatic Markdown export/live-route validation hook. GitHub Actions runs the same checks on pushes and pull requests. Only `out/` is published; environment files and generated build output are excluded from Git.

## Migration status

The original Direct Upload project `transitionai` continues serving the live domain while the Git-connected project is configured and verified. The public repository and GitHub build checks are ready. Domain cutover remains pending.

Preserve Email Routing MX/TXT records during domain changes. Verify HTTPS, the main and research pages, search, Markdown routes, robots, sitemap, and an unknown-path 404 after cutover.

## Rollback

Use Cloudflare Pages deployment history to roll back to a successful production deployment. The original Direct Upload project is retained during migration.
