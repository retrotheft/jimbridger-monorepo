# Cloudflare Pages Monorepo Setup Guide

This guide covers how to deploy a SvelteKit site from a pnpm monorepo to Cloudflare Pages.

## Prerequisites

- pnpm 10.x (match Cloudflare's build environment version)
- Node.js 22.x
- Git repository connected to GitHub/GitLab

## Monorepo Structure
```
monorepo-root/
├── package.json              # Root package.json
├── pnpm-workspace.yaml       # Workspace config
├── pnpm-lock.yaml           # Root lockfile
├── sites/
│   └── your-site/
│       ├── package.json
│       ├── wrangler.toml    # Cloudflare config
│       └── svelte.config.js
└── packages/                # Optional shared packages
```

## Step 1: Set Up pnpm Workspace

### Root `package.json`
```json
{
  "name": "your-monorepo",
  "private": true,
  "version": "0.0.0",
  "pnpm": {
    "onlyBuiltDependencies": [
      "esbuild"
    ]
  },
  "scripts": {
    "dev": "pnpm --filter '*' dev",
    "build": "pnpm --filter '*' build"
  }
}
```

### `pnpm-workspace.yaml`
```yaml
packages:
  - 'sites/*'
  - 'packages/*'
```

### Install dependencies
```bash
cd /path/to/monorepo-root
pnpm install
```

## Step 2: Configure SvelteKit Site

### Install Cloudflare adapter
```bash
cd sites/your-site
pnpm add -D @sveltejs/adapter-cloudflare
```

### `svelte.config.js`
```javascript
import adapter from '@sveltejs/adapter-cloudflare';

export default {
  kit: {
    adapter: adapter()
  }
};
```

### `wrangler.toml`
Create this file in `sites/your-site/`:
```toml
name = "your-site-name"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".svelte-kit/cloudflare"
compatibility_date = "2025-01-25"
```

**Important fields:**
- `compatibility_flags = ["nodejs_compat"]` - Required for SvelteKit (enables Node.js APIs like crypto)
- `pages_build_output_dir` - Tells Cloudflare this is a Pages config
- `compatibility_date` - Required for all Cloudflare projects

## Step 3: Create Cloudflare Pages Project

### In Cloudflare Dashboard:

1. Go to **Workers & Pages**
2. Click **Create application**
3. Look for the small link "Looking to deploy Pages? Get started" (below the main options)
4. Click **Connect to Git**
5. Select your repository

### Build Configuration:

- **Framework preset:** SvelteKit
- **Build command:** `pnpm run build` (or `npm run build`)
- **Build output directory:** `.svelte-kit/cloudflare`
- **Root directory (Advanced):** `sites/your-site` (no trailing slash)

### Other Settings:

- **Deploy command:** Leave empty (or it might require `exit 0`)
- **Builds for non-production branches:** Check if you want preview deployments on PRs

## Step 4: Configure Build Watch Paths (Optional but Recommended)

After the project is created, configure Build Watch Paths to prevent unnecessary builds:

1. Go to **Settings → Build → Build watch paths**

### Recommended Configuration:

**Include paths:**
```
sites/your-site/*
packages/*
```

**Exclude paths:**
```
**/README.md
**/*.md
**/tests/**
**/.vscode/**
```

This ensures builds only trigger when your specific site or shared packages change, not when other sites in the monorepo are updated.

## Common Issues & Solutions

### Issue: "Ignoring not compatible lockfile"
**Cause:** Local pnpm version doesn't match Cloudflare's (v10.11.1)

**Solution:**
```bash
# Upgrade pnpm locally
npm install -g pnpm@10.11.1
# or
corepack enable
corepack prepare pnpm@10.11.1 --activate

# Regenerate lockfile
rm pnpm-lock.yaml
pnpm install
```

### Issue: "node:crypto" or "node:async_hooks" warnings
**Cause:** Missing `nodejs_compat` flag

**Solution:** Add to `wrangler.toml`:
```toml
compatibility_flags = ["nodejs_compat"]
```

### Issue: "wrangler.toml file was found but it does not appear to be valid"
**Cause:** Missing required Pages fields

**Solution:** Ensure `wrangler.toml` has:
```toml
pages_build_output_dir = ".svelte-kit/cloudflare"
compatibility_date = "2025-01-25"
```

### Issue: Accidentally created a Worker instead of Pages project
**Symptom:** Settings show "workers.dev" URL and "Deploy command" field

**Solution:** Delete the project and recreate, making sure to click the "Looking to deploy Pages?" link

## Path Syntax Reference

### No Leading Slash
Use relative paths (no leading `/`):
- **Root directory:** `sites/your-site`
- **Build output:** `.svelte-kit/cloudflare`
- **Build watch paths:** `sites/your-site/*`

### Wildcard Patterns
- `sites/your-site/*` - All files in directory
- `**/README.md` - All README files anywhere
- `packages/*` - All files in packages directory
- `sites/!(your-site)/*` - All sites except yours

### When to Use `/*`
- **Root directory:** NO - `sites/your-site`
- **Build watch paths:** YES - `sites/your-site/*`

## Tips

1. **Only one Pages project per site** - Create separate Pages projects for each site in your monorepo
2. **Build Watch Paths save build minutes** - Configure them to avoid unnecessary builds
3. **Version control wrangler.toml** - Commit it to your repo for consistency
4. **Match pnpm versions** - Keep local pnpm version aligned with Cloudflare (currently 10.11.1)
5. **nodejs_compat is essential** - Almost always needed for modern frameworks

## Verifying Success

A successful deployment log should show:
- ✅ No lockfile warnings
- ✅ "Successfully read wrangler.toml file"
- ✅ No "node:crypto" or "node:async_hooks" warnings
- ✅ "✨ Compiled Worker successfully"
- ✅ "Success: Your site was deployed!"

## Additional Sites

To add more sites to the same monorepo:

1. Create new directory in `sites/`
2. Add `wrangler.toml` to the new site
3. Create a new Pages project in Cloudflare dashboard
4. Set **Root directory** to the new site's path
5. Configure Build Watch Paths to include only that site

Each site gets its own Pages project with its own build configuration and watch paths.
