import { test, expect } from '@playwright/test';

test('scenario tab spawns solar system', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Scenario' }).click();
  await page.getByRole('button', { name: 'Pause' }).waitFor();
  await page.waitForTimeout(500);
  const count = await page.evaluate(() => window.sim.bodies.length);
  expect(count).toBeGreaterThan(5);
});

test('switching scenario reloads simulation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Scenario' }).click();
  await page.getByRole('button', { name: 'Pause' }).waitFor();
  await page.getByLabel('Scenario:').selectOption('jupiter');
  await page.waitForTimeout(500);
  const labels = await page.evaluate(() => window.sim.bodies.map(b => b.data.label));
  expect(labels).toContain('Jupiter');
});
