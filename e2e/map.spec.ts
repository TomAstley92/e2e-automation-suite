import { test, expect } from '@playwright/test';

test('Map renders successfully', async ({ page }) => {
  await page.goto('/'); // Use relative path instead of full URL
  const map = page.locator('#map');
  await expect(map).toBeVisible();
});
