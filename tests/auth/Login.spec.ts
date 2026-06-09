import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('PassTheNote Login Suite', () => {

  test('User should be able to login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to login page
    await loginPage.goto();

    // Perform login
    await loginPage.login('testuser@example.com', 'Password123');

    // Assertion: URL should contain dashboard
    await expect(page).toHaveURL(/.*dashboard/);
  });

});
