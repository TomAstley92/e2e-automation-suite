import { test, expect } from '@playwright/test';

test('Test layout consistency on desktop and mobile views', async ({ page }) => {
  await page.goto('/'); // Use relative path instead of full URL
  await page.setViewportSize({ width: 1920, height: 1080 });
  const desktopScreenshot = await page.screenshot();
  await page.setViewportSize({ width: 375, height: 812 });
  const mobileScreenshot = await page.screenshot();
  expect(desktopScreenshot).not.toEqual(mobileScreenshot);
});
