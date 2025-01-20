import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e', // Specify the directory containing tests
  timeout: 30000, // Set a global timeout of 30 seconds for each test
  retries: 1, // Retry tests once upon failure
  reporter: [['list'], ['html', { open: 'on-failure' }]], // Use console and HTML reports
  fullyParallel: true, // Allow tests in different files to run fully in parallel
  workers: 4, // Specify the number of parallel workers (default: number of CPU cores)
  use: {
    baseURL: 'https://automationintesting.online', // Set the base URL
    headless: true, // Run tests in headless mode
    trace: 'on-first-retry', // Collect trace on first retry
    screenshot: 'only-on-failure', // Take screenshots on failure
    video: 'retain-on-failure', // Record video only for failed tests
  },
});
