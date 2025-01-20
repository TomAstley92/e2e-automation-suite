import { test, expect } from '@playwright/test';

test('Contact form submission with invalid email', async ({ page }) => {
  await page.goto('/'); // Use relative path instead of full URL
  await page.fill('#name', 'Jane Doe');
  await page.fill('#email', 'invalid-email');
  await page.fill('#message', 'Test message content.');
  await page.click('#submitContact');
  await expect(page.locator('.error')).toBeVisible();
});
