# Hero Background Feature Flag (Vercel Flags Explorer)

This change adds a boolean feature flag `hero-background` that toggles the animated hero background.

- Default: ON (background visible)
- Flags Explorer: can override per-session via encrypted cookie
- Fallback behavior: if flags can’t be evaluated (e.g., no secret), the background defaults to ON so the site looks good without auth.

## Files

- `src/flags.ts` — flag definition (`heroBackground`)
- `src/app/.well-known/vercel/flags/route.ts` — secure discovery endpoint (required by Flags Explorer)
- `src/app/page.tsx` — evaluates the flag on the server with a safe default fallback
- `src/app/home-content.tsx` — client-side rendering of the background only when ON

## Setup (local)

1) Install deps

```bash
pnpm install
```

2) Generate a 256-bit base64url secret and export it (required for Toolbar auth and encrypted overrides):

```bash
export FLAGS_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))")
```

3) Start dev

```bash
pnpm dev
```

4) Open Vercel Toolbar → Flags Explorer and create/access the project secret if needed.

## Local smoke checks

Discovery endpoint should be protected:

```bash
# 401 without Authorization
curl -i http://localhost:3000/.well-known/vercel/flags

# Create a one-time access proof and call with Authorization
node -e "process.env.FLAGS_SECRET=process.env.FLAGS_SECRET; import('flags').then(async m=>console.log(await m.createAccessProof()))" \
  | xargs -I{} sh -c 'curl -i -H "Authorization: Bearer {}" http://localhost:3000/.well-known/vercel/flags'
```

Flag behavior via env default:

```bash
# OFF by default
HERO_BACKGROUND_DEFAULT=false pnpm start
# Visit / → background is NOT rendered

# ON by default
HERO_BACKGROUND_DEFAULT=true pnpm start
# Visit / → background IS rendered
```

## Using Flags Explorer

1) Ensure `FLAGS_SECRET` is set on your Vercel project (Project → Settings → Environment Variables).
2) Open a preview or production deployment with Vercel Toolbar enabled.
3) Flags Explorer will detect `hero-background`. Toggle ON/OFF to see immediate changes.

Notes:
- We set `overrideEncryptionMode: "encrypted"` so the overrides cookie is encrypted.
- `src/app/page.tsx` catches evaluation errors and defaults to `true` (background visible) to handle unauthenticated contexts.

