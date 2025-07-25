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
  await nameInput.click();
  await nameInput.fill('Edited');
  await expect(nameInput).toHaveValue('Edited');
  await page.getByRole('button', { name: 'Apply' }).click();

  const label = await page.evaluate(() => window.sim.bodies[0].data.label);
  expect(label).toBe('Edited');
});

test('edit body velocity', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Pause' }).waitFor();
  await dragSpawn(page);
  const pause = page.getByRole('button', { name: 'Pause' });
  await pause.click();
  await page.waitForTimeout(50);

  const canvas = page.locator('canvas');
  const box = await canvas.boundingBox();
  if (!box) throw new Error('no canvas');
  await page.mouse.click(box.x + 50, box.y + 50);

  const vxInput = page.locator('label:has-text("Vel X") input');
  await vxInput.fill('5e9');
  await page.getByRole('button', { name: 'Apply' }).click();

  const vel = await page.evaluate(() => {
    const v = window.sim.bodies[0].body.velocity;
    return { x: v.x, y: v.y };
  });
  expect(Math.round(vel.x)).toBe(5);
});
