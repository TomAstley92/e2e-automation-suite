import { Page, Locator, expect } from '@playwright/test';

export class AdminPage {
  private page: Page;

  // Selectors
  private loginButton: Locator;
  private usernameField: Locator;
  private passwordField: Locator;
  private loginHeader: Locator;
  private errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.loginButton = page.locator('#doLogin');
    this.usernameField = page.locator('#username');
    this.passwordField = page.locator('#password');
    this.loginHeader = page.locator('[data-testid="login-header"]');
    this.errorMessage = page.locator('.alert-danger');
  }

  /**
   * Navigate to the admin page
   */
  async navigateTo(): Promise<void> {
    await this.page.goto('/#/admin'); // Navigate using hash-based routing
    await this.page.waitForSelector('#username'); // Wait for username field to ensure page has loaded
  }

  /**
   * Perform login with the given username and password
   * @param username - The username to input
   * @param password - The password to input
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  /**
   * Validate red borders are applied to input fields (visual error feedback)
   */
  async validateFieldErrorStyles(): Promise<void> {
    await expect(this.usernameField).toHaveCSS('border-color', 'rgb(255, 0, 0)');
    await expect(this.passwordField).toHaveCSS('border-color', 'rgb(255, 0, 0)');
  }

  /**
   * Validate the fields are reset after an incorrect login attempt
   */
  async validateFieldResets(): Promise<void> {
    await expect(this.usernameField).toHaveValue('');
    await expect(this.passwordField).toHaveValue('');
  }
}
