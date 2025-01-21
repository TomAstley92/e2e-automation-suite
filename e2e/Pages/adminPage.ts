import { Page, Locator, expect } from '@playwright/test';

export class AdminPage {
  private page: Page;

  // Selectors
  private loginButton: Locator;
  private usernameField: Locator;
  private passwordField: Locator;
  private loginHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.locator('#doLogin');
    this.usernameField = page.locator('#username');
    this.passwordField = page.locator('#password');
    this.loginHeader = page.locator('[data-testid="login-header"]');
  }

  async navigateTo(): Promise<void> {
    await this.page.goto('/#/admin');
    await this.page.waitForSelector('#username');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async validateFieldErrorStyles(): Promise<void> {
    await expect(this.usernameField).toHaveCSS('border-color', 'rgb(255, 0, 0)');
    await expect(this.passwordField).toHaveCSS('border-color', 'rgb(255, 0, 0)');
  }

  async validateAccessibility(): Promise<void> {
    const snapshot = await this.page.accessibility.snapshot();
    expect(snapshot?.children).toContainEqual(
      expect.objectContaining({
        name: 'Login Header',
        role: 'heading',
      })
    );
  }
}
