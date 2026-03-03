
# Cloudflare Monorepo Fix

Just add to Cloudflare Pages build command:

```sh
set build command: pnpm --filter sitekit build && pnpm --filter jimbridger-dev build
```
