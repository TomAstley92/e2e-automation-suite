import { test, expect } from '@playwright/test';

test('Add a new room successfully', async ({ page }) => {
  await page.goto('/#/admin'); // Use relative path instead of full URL
  await page.click('#addRoom');
  await page.fill('#roomNumber', '101');
  await page.fill('#roomPrice', '150');
  await page.click('#createRoom');
  await expect(page.locator('.room:has-text("101")')).toBeVisible();
});

test('Delete a room successfully', async ({ page }) => {
  await page.goto('/#/admin'); // Use relative path instead of full URL
  await page.click('.delete-room-btn'); // Replace with the actual selector for the delete button
  await expect(page.locator('.room:has-text("101")')).not.toBeVisible();
});
