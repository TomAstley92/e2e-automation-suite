import { test, expect } from '@playwright/test';

// Test: Verify that a non-existent page returns a 404 status
test('Non-existent page should return 404', async ({ page }) => {
  const response = await page.goto('/non-existent-page'); // Use relative path
  expect(response).not.toBeNull(); // Ensure a response was received
  expect(response!.status()).toBe(404); // Check for a 404 status code
});

// Test: Verify failed booking submission due to missing name field
test('Failed booking submission with missing name', async ({ page }) => {
  await page.goto('/'); // Use relative path
  await page.fill('#name', ''); // Leave name field empty
  await page.fill('#email', 'john.doe@example.com');
  await page.fill('#phone', '1234567890');
  await page.click('#submit');
  const errorMessage = page.locator('.error'); // Adjust the selector if needed
  await expect(errorMessage).toBeVisible(); // Verify that the error message is displayed
});
