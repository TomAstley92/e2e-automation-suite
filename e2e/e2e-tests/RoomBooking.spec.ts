import { test } from '@playwright/test';
import { RoomBookingPage } from '../Pages/RoomBookingPage';

test('Validate the room booking process', async ({ page }) => {
  const roomBookingPage = new RoomBookingPage(page);

  // Navigate to the website
  await roomBookingPage.navigateToSite();

  // Start the booking process
  await roomBookingPage.startBookingProcess();

  // Open the booking calendar
  await roomBookingPage.openBookingCalendar();

  // Validate form fields are visible
  await roomBookingPage.validateFormFields();

  // Fill the booking form
  const firstName = 'Test User 1';
  const lastName = 'Test';
  const email = 'faketestuser1@faketest.com';
  const phone = '01234567890';
  await roomBookingPage.fillBookingForm(firstName, lastName, email, phone);

  // Submit the booking
  await roomBookingPage.submitBooking();

  // Validate booking success
  await roomBookingPage.validateBookingSuccess();
});
