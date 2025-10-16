# Repository Guidelines

## Project Structure & Module Organization
- `src/app/` — Next.js App Router. Entrypoints: `layout.tsx`, `page.tsx`. Create route folders in lowercase (e.g., `src/app/about/page.tsx`). Route‑scoped pieces live in `src/app/components/`.
- `src/components/` — shared React components; primitives in `src/components/ui/` (shadcn/magicui style).
- `src/lib/` — utilities and helpers (e.g., `src/lib/utils.ts`).
- `public/` — static assets served at the site root.
- Config: `next.config.ts`, `eslint.config.mjs`, `tsconfig.json` (alias `@/*` → `src/*`).

## Build, Test, and Development Commands
- `pnpm install` — install dependencies.
- `pnpm dev` — run the app locally with Turbopack.
- `pnpm build` — production build.
- `pnpm start` — start the built app.
- `pnpm lint` — run ESLint (extends `next/core-web-vitals` + TS rules).
- `pnpm format` / `pnpm format:check` — Prettier write or check.
  Prereqs: Node.js LTS and pnpm. Use `.env.local` for environment variables.

## Coding Style & Naming Conventions
- Language: TypeScript (`strict: true`). Prefer named exports.
- Indentation: 2 spaces; keep lines focused and readable.
- Components: PascalCase filenames (`Button.tsx`); utilities/hooks camelCase.
- Imports: use the `@/*` alias; avoid deep relative paths (`../../../`).
- Styling: Tailwind CSS in JSX; global styles in `src/app/globals.css`.

## Monitoring & Analytics
- Vercel Web Analytics (`@vercel/analytics/next`) and Speed Insights (`@vercel/speed-insights/next`) render in `src/app/layout.tsx`.
- Deploy on Vercel to see metrics; events log automatically in production. Use `@vercel/analytics` `track()` helpers for custom events if needed.

## Testing Guidelines
- This repo does not include a test runner. Validate changes with `pnpm lint`, `pnpm build`, and manual UI checks in the browser.
- If adding tests in the future, keep them colocated with code and document chosen tooling in this README.

## Commit & Pull Request Guidelines
- Commits: concise, imperative subject (“Refactor hero layout for accessibility”). Add a short body when helpful. Link issues (`Closes #123`).
- PRs: describe what/why, include screenshots or GIFs for UI changes, list notable trade‑offs. Ensure `pnpm lint` and `pnpm build` pass.

## Security & Configuration Tips
- Use `.env.local`; never commit secrets. Client‑exposed vars must be prefixed `NEXT_PUBLIC_`.
- Keep changes scoped; avoid new dependencies without rationale. Update imports after moves/renames.

## Agent‑Specific Instructions
- Keep diffs minimal and focused; follow the structure above.
- Reference files explicitly (e.g., `src/app/page.tsx:1`).
- Run `pnpm lint` before proposing changes and update this doc when conventions evolve.

## UI: PillTabs (Sliding Pill Indicator)
- Component: `src/components/ui/pill-tabs.tsx`
- Purpose: Render a horizontal list with a sliding “pill” under the hovered/active item.

Example with Next Link (navbar):

```tsx
import PillTabs from "@/components/ui/pill-tabs";
import Link from "next/link";

<PillTabs
  items={[{ href: "/", label: "Home" }]}
  activeIndex={0}
  renderItem={({ item, ref, onMouseEnter, onFocus, isActive, className }) => (
    <Link ref={ref} href={item.href} onMouseEnter={onMouseEnter} onFocus={onFocus} className={className}>
      {item.label}
    </Link>
  )}
/>;
```

Example with anchors (hero CTAs):

```tsx
<PillTabs
  items={[{ id: "contact", label: "Kontakt" }]}
  activeIndex={0}
  renderItem={({ item, ref, onMouseEnter, onFocus, className }) => (
    <a ref={ref} href={`#${item.id}`} onMouseEnter={onMouseEnter} onFocus={onFocus} className={className}>
      {item.label}
    </a>
  )}
/>;
```
