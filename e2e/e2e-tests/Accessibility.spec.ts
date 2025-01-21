import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Accessibility Tests', () => {
  test('Validate login page accessibility', async ({ page }) => {
    await page.goto('/#/admin');

    // Inject Axe into the page
    await injectAxe(page);

    // Run Axe accessibility checks
    await checkA11y(page, {
      detailedReport: true,
      detailedReportOptions: { html: true }, // Generates a detailed HTML report
    });
  });
});
