# Repository Guidelines

## Project Structure & Modules
- `src/app` — Next.js App Router (file‑based routes). Each route uses `page.tsx`; shared layout in `layout.tsx`. Page‑level pieces live in `src/app/components`.
- `src/components/ui` — Reusable UI primitives (shadcn/ui + Radix). Prefer composing from here.
- `src/components` — Higher‑level/FX components (e.g., `gradual-blur.tsx`).
- `src/lib` — Utilities (e.g., `utils.ts`).
- `public` — Static assets.  `e2e/` — reserved for end‑to‑end tests.
- Path alias: `@/*` → `src/*`.

## Build, Test, and Dev
```bash
pnpm install              # install deps (pnpm workspace)
pnpm dev                  # run Next.js (Turbopack)
pnpm build                # production build
pnpm start                # serve built app
pnpm lint                 # ESLint (Next + TS rules)
pnpm format               # Prettier write
pnpm format:check         # Prettier verify
```
- Use Node 20+ locally. Do not commit `.next/`.

## Coding Style & Naming
- TypeScript strict; ESLint extends `next/core-web-vitals` and `next/typescript`.
- Prettier: 2 spaces, no semicolons, double quotes, trailing commas, width 100.
- Components export names: PascalCase. File names: kebab‑case for components (e.g., `src/app/components/feature-card.tsx`, `src/components/ui/shimmer-button.tsx`).
- Next routes must be `page.tsx` / `layout.tsx`. Hooks use `useX`; utilities camelCase. Use `cn()` from `src/lib/utils` for class names.

## Testing Guidelines
- No framework committed yet. Prefer Playwright for E2E (`e2e/`) and Vitest + React Testing Library for unit/components.
- Name tests `*.test.ts`/`*.test.tsx` colocated with source or under `e2e/`.
- Before opening a PR: run `pnpm lint` and `pnpm build`.

## Commit & Pull Requests
- Use Conventional Commits:
  - `feat(web): responsive header`  ·  `chore(prettier): sync config`  ·  `build(next): disable eslint during vercel build`
- Branch naming: `feat/*`, `fix/*`, `chore/*`.
- PRs include: concise description, linked issues, screenshots/GIFs for UI, and review steps. Keep PRs focused (< ~300 changed lines when possible).

## Agent‑Specific Notes
- Use `pnpm`, not `npm`/`yarn`.
- Add new routes under `src/app/<route>/page.tsx` and reuse `src/components/ui` primitives before creating new ones.
- Avoid manual edits to generated artifacts (`.next/`) or lockfile.
