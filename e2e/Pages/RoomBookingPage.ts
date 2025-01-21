import { Page, Locator, expect } from '@playwright/test';

export class RoomBookingPage {
  private page: Page;

  // Locators
  private letMeHackButton: Locator;
  private roomPreviewImage: Locator;
  private singleRoomHeading: Locator;
  private firstIcon: Locator;
  private rootContent: Locator;
  private bookButton: Locator;
  private calendar: Locator;
  private firstNameField: Locator;
  private lastNameField: Locator;
  private emailField: Locator;
  private phoneField: Locator;
  private nextButton: Locator;
  private successHeading: Locator;
  private closeButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.letMeHackButton = page.getByRole('button', { name: 'Let me hack!' });
    this.roomPreviewImage = page.getByRole('img', { name: 'Preview image of room101' });
    this.singleRoomHeading = page.getByRole('heading', { name: 'single', exact: true });
    this.firstIcon = page.locator('.fa').first();
    this.rootContent = page.locator('#root');
    this.bookButton = page.getByRole('button', { name: 'Book', exact: true });
    this.calendar = page.locator('.rbc-calendar');
    this.firstNameField = page.getByPlaceholder('Firstname');
    this.lastNameField = page.getByPlaceholder('Lastname');
    this.emailField = page.locator('input[name="email"]');
    this.phoneField = page.locator('input[name="phone"]');
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.successHeading = page.getByRole('heading', { name: 'Booking Successful!' });
    this.closeButton = page.getByRole('button', { name: 'Close' });
  }

  async navigateToSite(): Promise<void> {
    await this.page.goto('https://automationintesting.online/#/');
  }

  async startBookingProcess(): Promise<void> {
    await this.letMeHackButton.click();
    await expect(this.roomPreviewImage).toBeVisible();
    await this.singleRoomHeading.click();
    await this.firstIcon.click();
    await expect(this.rootContent).toContainText('single');
    await expect(this.rootContent).toContainText('Aenean porttitor mauris sit amet lacinia molestie.');
    await expect(this.rootContent).toContainText('TV');
    await expect(this.rootContent).toContainText('WiFi');
    await expect(this.rootContent).toContainText('Safe');
  }

  async openBookingCalendar(): Promise<void> {
    await this.bookButton.click();
    await expect(this.calendar).toBeVisible();
  }

  async fillBookingForm(
    firstName: string,
    lastName: string,
    email: string,
    phone: string
  ): Promise<void> {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.emailField.fill(email);
    await this.phoneField.fill(phone);
  }

  async validateFormFields(): Promise<void> {
    await expect(this.firstNameField).toBeVisible();
    await expect(this.lastNameField).toBeVisible();
    await expect(this.emailField).toBeVisible();
    await expect(this.phoneField).toBeVisible();
    await expect(this.bookButton).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  }

  async submitBooking(): Promise<void> {
    await this.bookButton.click();
  }

  async validateBookingSuccess(): Promise<void> {
    await expect(this.successHeading).toBeVisible();
    await expect(this.closeButton).toContainText('Close');
  }
}
