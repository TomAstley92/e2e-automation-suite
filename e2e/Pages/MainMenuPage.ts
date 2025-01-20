import { Page, Locator, expect } from '@playwright/test';

export class MainMenuPage {
  private page: Page;
  private logo: Locator;
  private welcomeText: Locator;
  private hackButton: Locator;
  private footerSection: Locator;
  private contactDetails: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole('img', { name: 'Hotel logoUrl' });
    this.welcomeText = page.getByText('Welcome to Shady Meadows, a');
    this.hackButton = page.getByRole('button', { name: 'Let me hack!' });
    this.footerSection = page.locator('footer'); // General footer selector
    this.contactDetails = page.locator('#contact'); // Assume a selector for the contact details section
  }

  async navigateTo(): Promise<void> {
    await this.page.goto('https://automationintesting.online/');
  }

  async navigateThroughWelcomeScreen(): Promise<void> {
    await this.welcomeText.click();
    await this.hackButton.click();
  }

  async validateHeader(): Promise<void> {
    await expect(this.logo).toBeVisible();
  }

  async validateFooter(): Promise<void> {
    await expect(this.footerSection).toBeVisible();
  }

  async validateContactDetails(): Promise<void> {
    await expect(this.contactDetails).toBeVisible();
    // Add any specific assertions for contact details if necessary
  }
}
