import { test, expect } from '@playwright/test';
import { MainMenuPage } from '../Pages/MainMenuPage';

test('Validate UI Elements on Load', async ({ page }) => {
  const mainPage = new MainMenuPage(page);

  // Navigate to the website
  await mainPage.navigateTo();

  // Validate the header
  await mainPage.validateHeader();

  // Navigate through the welcome screen
  await mainPage.navigateThroughWelcomeScreen();

  // Validate the rooms section
  await mainPage.validateRoomsSection();

  // Validate the footer section
  await mainPage.validateFooter();

  // Validate the contact details
  await mainPage.validateContactDetails();
});
