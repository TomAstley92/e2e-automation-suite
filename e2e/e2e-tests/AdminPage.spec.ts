import { test, expect } from '@playwright/test';
import { AdminPage } from '../Pages/adminPage';

test.describe('Admin Login Tests', () => {
  let adminPage: AdminPage;

  test.beforeEach(async ({ page }) => {
    adminPage = new AdminPage(page);
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
    },
  ];

  scenarios.forEach(({ description, username, password, validate }) => {
    test(description, async () => {
      await adminPage.navigateTo();
      await adminPage.login(username, password);
      await validate();
    });
  });

  test('Login succeeds with correct credentials', async ({ page }) => {
    await adminPage.navigateTo();
    await adminPage.login('admin', 'password');
    await expect(page.getByRole('navigation')).toContainText('Rooms');
    await page.getByRole('link', { name: 'Branding' }).click();
    await expect(page.locator('#brandingLink')).toContainText('Branding');
    await page.getByRole('link', { name: 'B&B Booking Management' }).click();
  });

  test('Accessibility check for login page', async ({ page }) => {
    await adminPage.navigateTo();
    const accessibilitySnapshot = await page.accessibility.snapshot();
    if (accessibilitySnapshot) {
      expect(accessibilitySnapshot.children).toContainEqual(
        expect.objectContaining({
          name: 'Login Header',
          role: 'heading',
        })
      );
    }
  });

  test('Admin page load performance', async ({ page }) => {
    const tracePath = './trace/admin-page-load-performance-trace.zip';
    await page.context().tracing.start({ screenshots: true, snapshots: true });
    await adminPage.navigateTo();
    await page.context().tracing.stop({ path: tracePath });
  });
});
