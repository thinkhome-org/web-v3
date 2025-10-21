# Repository Guidelines

## Project Structure & Module Organization

- `src/app` — Next.js App Router. Route pages in `page.tsx`; shared UI in `layout.tsx`. Page‑level pieces live in `src/app/components`.
- `src/components/ui` — Reusable UI primitives (shadcn/ui + Radix).
- `src/components` — Higher‑level/FX components (e.g., `gradual-blur.tsx`).
- `src/lib` — Utilities (e.g., `utils.ts`).
- `public` — Static assets. `e2e/` — reserved for end‑to‑end tests.
- Path alias: `@/*` → `src/*`.

## Build, Test, and Development Commands

- `pnpm install` — Install workspace dependencies.
- `pnpm dev` — Run Next.js with Turbopack.
- `pnpm build` — Production build.
- `pnpm start` — Serve the built app.
- `pnpm lint` — ESLint (Next + TS rules).
- `pnpm format` / `pnpm format:check` — Prettier write/verify.

Notes: Use Node 20+. Do not commit `.next/`.

## Coding Style & Naming Conventions

- TypeScript strict; ESLint extends `next/core-web-vitals` and `next/typescript`.
- Prettier: 2 spaces, no semicolons, double quotes, trailing commas, width 100.
- Component exports: PascalCase. File names: kebab‑case (e.g., `src/app/components/feature-card.tsx`, `src/components/ui/shimmer-button.tsx`).
- Next routes must be `page.tsx` / `layout.tsx`. Hooks: `useX`; utilities: camelCase. Use `cn()` from `src/lib/utils` for class names.

## Testing Guidelines

- No framework committed yet. Prefer Playwright for E2E (`e2e/`) and Vitest + React Testing Library for unit/components.
- Name tests `*.test.ts` / `*.test.tsx`, colocated with source or under `e2e/`.
- Before PRs: run `pnpm lint` and `pnpm build`.

## Commit & Pull Request Guidelines

- Conventional Commits; examples: `feat(web): responsive header`, `chore(prettier): sync config`, `build(next): disable eslint during vercel build`.
- Branch names: `feat/*`, `fix/*`, `chore/*`.
- PRs include: concise description, linked issues, screenshots/GIFs for UI, and clear review steps. Keep PRs focused (< ~300 changed lines).

## Agent‑Specific Notes

- Use `pnpm`, not `npm`/`yarn`.
- Add new routes under `src/app/<route>/page.tsx` and reuse `src/components/ui` primitives before creating new ones.
- Avoid manual edits to generated artifacts (`.next/`) or the lockfile.

