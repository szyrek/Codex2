import { test, expect } from '@playwright/test';

test('config tab displays default values', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Config' }).click();
  const nameInput = page.locator('label:has-text("Ship Name") input');
  await expect(nameInput).toHaveValue('TestShip-01');
  const volume = page.locator('input[type="range"]');
  await expect(volume).toHaveValue('75');
});
