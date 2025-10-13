## Summary

Adds a Vercel Flags Explorer boolean flag `hero-background` to control the animated hero background. Default ON. When flags cannot be evaluated (e.g., no secret), the page safely defaults to showing the background.

## What Changed

- SDK: install `flags@4`
- Flag definition: `src/flags.ts` (`heroBackground` with labeled options and default ON)
- Discovery endpoint: `src/app/.well-known/vercel/flags/route.ts` (Authorization required; `overrideEncryptionMode: "encrypted"`)
- Server evaluation: `src/app/page.tsx` calls `await heroBackground()` with a fallback to `true` on error
- Client render: `src/app/home-content.tsx` mounts background + blur only when enabled

## How to Test (Examples Inline)

1) Install and start dev

```bash
pnpm install
export FLAGS_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))")
pnpm dev
```

2) Discovery endpoint

```bash
# 401 without Authorization
curl -i http://localhost:3000/.well-known/vercel/flags

# Create a one-time access proof and call with Authorization
node -e "process.env.FLAGS_SECRET=process.env.FLAGS_SECRET; import('flags').then(async m=>console.log(await m.createAccessProof()))" \
  | xargs -I{} sh -c 'curl -i -H "Authorization: Bearer {}" http://localhost:3000/.well-known/vercel/flags'
```

3) Toggle behavior

```bash
# OFF default
HERO_BACKGROUND_DEFAULT=false pnpm start
# Visit / → background not rendered

# ON default
HERO_BACKGROUND_DEFAULT=true pnpm start
# Visit / → background rendered
```

## Notes

- Endpoint requires `FLAGS_SECRET` (256‑bit base64url). Toolbar manages the header for you in Vercel.
- Overrides are encrypted (`overrideEncryptionMode: "encrypted"`).
- Safe server fallback defaults to ON when flags are unavailable.

## Checklist

- [ ] Build passes (`pnpm build`)
- [ ] Typecheck passes (`tsc --noEmit`)
- [ ] Verified ON/OFF behavior locally
- [ ] Verified discovery endpoint with Authorization header
