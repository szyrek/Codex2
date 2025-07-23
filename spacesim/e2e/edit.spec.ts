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

test('edit body label', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Pause' }).waitFor();
  await dragSpawn(page);
  await page.waitForTimeout(100);

  const canvas = page.locator('canvas');
  const box = await canvas.boundingBox();
  if (!box) throw new Error('no canvas');
  await page.mouse.click(box.x + 50, box.y + 50);

  const nameInput = page.locator('label:has-text("Name") input');
  await nameInput.fill('Edited');
  await page.getByRole('button', { name: 'Apply' }).click();

  const label = await page.evaluate(() => window.sim.bodies[0].data.label);
  expect(label).toBe('Edited');
});
