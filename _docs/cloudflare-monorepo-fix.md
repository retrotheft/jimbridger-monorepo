
# Cloudflare Monorepo Fix

Just add to Cloudflare Pages build command:

```sh
set build command: pnpm --filter sitekit build && pnpm --filter jimbridger-dev build
```

---

```
packages:
  - 'packages/*'
  - 'apps/*'
```

**2. Cloudflare Pages build settings**

Set these in your Cloudflare Pages dashboard or `wrangler.toml`:

- **Root directory**: Leave it as `/` (the repo root), *not* your app's subdirectory
- **Build command**: Something like `cd apps/my-site && pnpm build` or use a turbo/nx command from the root
- **Build output directory**: `apps/my-site/dist` (or wherever your output goes)

The most common mistake is setting the root directory to the app subfolder — this strips away the monorepo context and pnpm can't resolve workspace dependencies.

**3. Make sure dependencies are installed from the root**

Your install command should run from the repo root. In the Cloudflare Pages environment variables, you can set:

- `PNPM_VERSION` — to pin a version (e.g., `9`)
- The install happens automatically, but if you need to customize it, prefix your build command: `pnpm install --frozen-lockfile && pnpm --filter my-site build`

**4. Check that the linked package is built before your site**

If your shared package needs to be compiled (e.g., TypeScript), make sure the build command handles that:
```
pnpm --filter @myorg/shared build && pnpm --filter my-site build
```

Or if you're using Turborepo: `pnpm turbo build --filter=my-site...`

**5. `shamefully-hoist` or `public-hoist-pattern`**

Some frameworks (like Nuxt or certain Vite setups) struggle with pnpm's strict node_modules structure. You can add to `.npmrc`:
```
public-hoist-pattern[]=*
