# nes-bundler.com

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and add your `GITHUB_PAT`.

## Dev

```bash
npm run dev
```

## Deploy

```bash
npm run build
npx wrangler pages deploy .svelte-kit/cloudflare --branch=main
```

## Secrets

```bash
# Prompt for value
npx wrangler pages secret put GITHUB_PAT

# Or pipe it
echo "ghp_xxx" | npx wrangler pages secret put GITHUB_PAT
```
