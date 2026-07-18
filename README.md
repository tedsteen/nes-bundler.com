# nes-bundler.com

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and add your `GITHUB_PAT`.

The token is baked into the server bundle at build time (`$env/static/private`), so no Cloudflare Pages runtime secrets are needed.

## Dev

```bash
npm run dev
```

## Deploy

```bash
npm run build
npx wrangler pages deploy .svelte-kit/cloudflare --branch=main
```

## Logs

```bash
npx wrangler pages deployment tail --project-name nes-bundler
```
