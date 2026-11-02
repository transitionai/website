# Cloudflare Pages deployment

The website is a Next.js static export. Upload only `out/`; do not upload the source directory, application transcript, or local environment files.

- Project: `transitionai`
- Pages address: `https://transitionai.pages.dev`
- Custom domain: `transitioned.dev`
- Hosting: Cloudflare Pages, static assets only; no Functions, Workers, database, or paid service required.
- Delivery: GitHub Actions builds and uploads to the existing Direct Upload project. Production deployment requires the repository secret described below.

## Release

Use Node 22.13–22.x and the pinned pnpm version, then run `pnpm build`. Its postbuild hook checks exported Markdown and live route behavior. Upload the contents of `out/` through the project's Create deployment form, or with authorized Wrangler credentials:

```sh
wrangler pages deploy out --project-name=transitionai --branch=main
```

Direct Upload projects cannot switch to Cloudflare's built-in Git integration. GitHub Actions can deploy via Wrangler later.

After uploading, verify `/`, `/approach`, `/approach/design-questions`, `/api/search`, `/llms.mdx/approach/index`, `/llms.txt`, `/robots.txt`, and a nonexistent page. Verify the custom domain and HTTPS before announcing launch. Preserve Email Routing MX/TXT records when configuring the website's DNS.

Public indexing is enabled in both page metadata and `robots.txt`; canonicals and sitemap use `transitioned.dev`.

## Current status

Published on November 2, 2026 via Direct Upload (76 files). Cloudflare reports `transitioned.dev` Active with SSL enabled. Public DNS resolves to Cloudflare. HTTPS checks using the published DNS address returned 200 for the homepage, both research pages, search JSON, both Markdown routes, llms.txt, robots.txt, and sitemap.xml; an unknown path returned 404. Search results were verified in the browser on the Pages address. The local system/browser DNS cache still held an earlier negative lookup during verification; ordinary custom-domain browsing may require cache expiry. No paid services were enabled.

## Rollback

Use the Pages deployment history to roll back to a previously successful production deployment. Keep the last known-good release artifact before updating.

## GitHub Actions

Repository: `transitionai/website`. Pushes to `main` and manual workflow runs on `main` run lint, type checking, the static build, and Markdown route checks before deploying. Pull requests run the same checks without deployment credentials. Actions are pinned to commit SHAs.

Configure repository variable `CLOUDFLARE_ACCOUNT_ID` and repository secret `CLOUDFLARE_API_TOKEN`. The token needs Account / Cloudflare Pages / Edit on the hosting account only. Never commit the token. After configuring it, rerun the workflow and verify its production deployment. Builds and deployments run on GitHub-hosted runners; no laptop process is needed.
