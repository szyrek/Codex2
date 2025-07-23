import { test, expect } from '@playwright/test';

const dragSpawn = async (page) => {
  const canvas = page.locator('canvas');
  await canvas.waitFor();
  const box = await canvas.boundingBox();
  if (!box) throw new Error('no canvas');
  await page.mouse.move(box.x + 50, box.y + 50);
  await page.mouse.down();
  await page.mouse.move(box.x + 100, box.y + 50);
  await page.mouse.up();
};

test('pause and reset controls', async ({ page }) => {
  await page.goto('/');
  const pause = page.getByRole('button', { name: 'Pause' });
  const reset = page.getByRole('button', { name: 'Reset' });
  await pause.waitFor();

  await dragSpawn(page);
  await page.waitForTimeout(100);
  let count = await page.evaluate(() => window.sim.bodies.length);
  expect(count).toBe(1);

  await pause.click();
  await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();

  await reset.click();
  count = await page.evaluate(() => window.sim.bodies.length);
  expect(count).toBe(0);
});
