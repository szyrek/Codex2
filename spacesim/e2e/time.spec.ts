import { test, expect } from '@playwright/test';

test('simulation time reflects speed', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Pause' }).waitFor();
  const display = page.locator('.sim-time');
  const getTime = async () => parseFloat((await display.textContent() || '0').replace(/[^0-9.]/g, ''));
  const t1 = await getTime();
  await page.waitForTimeout(200);
  const t2 = await getTime();
  await page.getByRole('button', { name: '>>>' }).click();
  await page.waitForTimeout(200);
  const t3 = await getTime();
  expect(t2 - t1).toBeLessThan(t3 - t2);
});
