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

test('dragging spawns a body', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Pause' }).waitFor();
  await dragSpawn(page);
  await page.waitForTimeout(100);
  const count = await page.evaluate(() => window.sim.bodies.length);
  console.log('count', count);
  await expect(count).toBe(1);
});

test('short drag spawns body with zero velocity', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Pause' }).waitFor();
  const canvas = page.locator('canvas');
  await canvas.waitFor();
  const box = await canvas.boundingBox();
  if (!box) throw new Error('no canvas');
  await page.mouse.move(box.x + 50, box.y + 50);
  await page.mouse.down();
  await page.mouse.move(box.x + 52, box.y + 52);
  await page.mouse.up();
  await page.waitForTimeout(100);
  const vel = await page.evaluate(() => {
    const v = window.sim.bodies[0].body.velocity;
    return { x: v.x, y: v.y, count: window.sim.bodies.length };
  });
  expect(vel.count).toBe(1);
  expect(Math.abs(vel.x)).toBeLessThan(0.01);
  expect(Math.abs(vel.y)).toBeLessThan(0.01);
});
