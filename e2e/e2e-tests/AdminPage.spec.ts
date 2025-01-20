import { test, expect } from '@playwright/test';
import { AdminPage } from '../Pages/adminPage';

test.describe('Admin Login Tests', () => {
  let adminPage: AdminPage;

  test.beforeEach(async ({ page }) => {
    adminPage = new AdminPage(page); // Initialize the POM class
  });

  const scenarios = [
    {
      description: 'Login form validation for empty fields',
      username: '',
      password: '',
      validate: async () => {
        await adminPage.validateFieldErrorStyles();
      },
    },
    {
      description: 'Login fails with invalid credentials',
      username: 'baduser',
      password: 'badpassword',
      validate: async () => {
        await adminPage.validateFieldErrorStyles();
      },
    }
  ];

  scenarios.forEach(({ description, username, password, validate }) => {
    test(description, async () => {
      // Navigate to the admin page
      await adminPage.navigateTo();

      // Attempt login with the given credentials
      await adminPage.login(username, password);

      // Run validation logic
      await validate();
    });
  });

  test('Login succeeds with correct credentials', async ({ page }) => {
    // Navigate to the admin page
    await adminPage.navigateTo();

    // Perform login with valid credentials
    await adminPage.login('admin', 'password');

    // Validate successful login with Admin toolbar
    await expect(page.getByRole('navigation')).toContainText('Rooms');
    await page.getByRole('link', { name: 'Branding' }).click();
    await expect(page.locator('#brandingLink')).toContainText('Branding');
    await page.getByRole('link', { name: 'B&B Booking Management' }).click();
  });
});
