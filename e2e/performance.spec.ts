import { test, expect } from '@playwright/test';

test('Measure page load time', async ({ page }) => {
  const start = performance.now(); // Use high-resolution time measurement
  await page.goto('/'); // Use relative path instead of full URL
  await page.waitForLoadState('load'); // Ensure the page is fully loaded
  const duration = performance.now() - start;
  console.log(`Page load time: ${duration.toFixed(2)}ms`);
  expect(duration).toBeLessThan(3000); // Ensure the page loads within 3 seconds
});
