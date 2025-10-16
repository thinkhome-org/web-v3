import { test, expect } from '@playwright/test';

const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:3000';

/**
 * Verifies that:
 * - Hero layer is fixed to viewport
 * - Header stays on top (z-index higher than hero)
 * - Content scrolls over hero (about-section overlays hero after scrolling)
 * - Background has a fixed 5px blur while scrolling
 */

test('fixed hero with overlaying content and sticky header', async ({ page }) => {
  await page.goto(BASE_URL);

  const hero = page.getByTestId('fixed-hero-layer');
  await expect(hero).toBeVisible();

  // Hero should be fixed
  const position = await hero.evaluate((el) => getComputedStyle(el).position);
  expect(position).toBe('fixed');

  // Header should be above hero (z-50 > z-10)
  const header = page.locator('header');
  await expect(header).toBeVisible();
  const [zHeader, zHero] = await Promise.all([
    header.evaluate((el) => parseInt(getComputedStyle(el).zIndex || '0', 10)),
    hero.evaluate((el) => parseInt(getComputedStyle(el).zIndex || '0', 10)),
  ]);
  expect(zHeader).toBeGreaterThan(zHero);

  // Scroll down; about section should overlay hero (z-20 > z-10)
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 0.9 }));
  const about = page.getByTestId('about-section');
  await expect(about).toBeVisible();
  const zAbout = await about.evaluate((el) => parseInt(getComputedStyle(el).zIndex || '0', 10));
  expect(zAbout).toBeGreaterThan(zHero);

  // Ensure background filter remains none before and after scroll
  const bg = page.getByTestId('bg-layer');
  await expect(bg).toBeVisible();
  const filterBefore = await bg.evaluate((el) => getComputedStyle(el).filter);
  expect(filterBefore).toBe('blur(5px)');

  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.8 }));
  const filterAfter = await bg.evaluate((el) => getComputedStyle(el).filter);
  expect(filterAfter).toBe('blur(5px)');
});
