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

test('zoom and pan controls change view', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Pause' }).waitFor();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('button', { name: '→' }).click();
  const view = await page.evaluate(() => ({ zoom: window.sim.view.zoom, x: window.sim.view.center.x }));
  expect(view.zoom).toBeCloseTo(1.2);
  expect(view.x).toBeCloseTo(16.67, 1);
  await page.getByRole('button', { name: '-' }).click();
  const zoom = await page.evaluate(() => window.sim.view.zoom);
  expect(zoom).toBeCloseTo(1);
});

test('center button focuses selected body', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Pause' }).waitFor();
  await dragSpawn(page);
  await page.waitForTimeout(100);
  const item = page.locator('li').first();
  await item.click();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('button', { name: 'Center' }).click();
  const pos = await page.evaluate(() => {
    const b = window.sim.bodies[0].body.getPosition();
    return { x: b.x, y: b.y };
  });
  const center = await page.evaluate(() => ({ x: window.sim.view.center.x, y: window.sim.view.center.y, zoom: window.sim.view.zoom }));
  expect(center.zoom).toBe(1);
  expect(center.x).toBeCloseTo(pos.x);
  expect(center.y).toBeCloseTo(pos.y);
});
