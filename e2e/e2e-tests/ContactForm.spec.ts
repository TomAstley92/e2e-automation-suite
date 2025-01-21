import { test } from '@playwright/test';
import { ContactPage } from '../Pages/ContactPage';

test('Validate contact form submission and thank-you message', async ({ page }) => {
  const contactPage = new ContactPage(page);

  // Navigate to the website
  await contactPage.navigateTo();

  // Fill out the contact form
  const name = 'Automation User 1';
  const email = 'automationUser1@test.com';
  const phone = '01234567890';
  const subject = 'Booking Room Automation';
  const description = 'This is an automation test case that validates the message box.';
  await contactPage.fillContactForm(name, email, phone, subject, description);

  // Submit the form
  await contactPage.submitForm();

  // Validate the thank-you message
  await contactPage.validateThankYouMessage(name);
});
