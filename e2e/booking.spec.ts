import { test, expect } from '@playwright/test';

test('Book a room successfully', async ({ page }) => {
  await page.goto('https://automationintesting.online/');
  await page.fill('#name', 'John Doe');
  await page.fill('#email', 'john.doe@example.com');
  await page.fill('#phone', '1234567890');
  await page.click('#submit');
  await expect(page.locator('.confirmation')).toBeVisible();
});
