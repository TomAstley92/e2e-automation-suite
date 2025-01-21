import { Page, Locator, expect } from '@playwright/test';

export class ContactPage {
  private page: Page;
  private nameField: Locator;
  private emailField: Locator;
  private phoneField: Locator;
  private subjectField: Locator;
  private descriptionField: Locator;
  private submitButton: Locator;
  private thankYouHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameField = page.getByTestId('ContactName');
    this.emailField = page.getByTestId('ContactEmail');
    this.phoneField = page.getByTestId('ContactPhone');
    this.subjectField = page.getByTestId('ContactSubject');
    this.descriptionField = page.getByTestId('ContactDescription');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.thankYouHeading = page.getByRole('heading', { name: 'Thanks for getting in touch' });
  }

  async navigateTo(): Promise<void> {
    await this.page.goto('https://automationintesting.online/#/');
  }

  async fillContactForm(
    name: string,
    email: string,
    phone: string,
    subject: string,
    description: string
  ): Promise<void> {
    await this.nameField.fill(name);
    await this.emailField.fill(email);
    await this.phoneField.fill(phone);
    await this.subjectField.fill(subject);
    await this.descriptionField.fill(description);
  }

  async submitForm(): Promise<void> {
    await this.submitButton.click();
  }

  async validateThankYouMessage(name: string): Promise<void> {
    await expect(this.thankYouHeading).toBeVisible();
    await expect(this.page.getByText(`Thanks for getting in touch ${name}!`)).toBeVisible();
  }
}
