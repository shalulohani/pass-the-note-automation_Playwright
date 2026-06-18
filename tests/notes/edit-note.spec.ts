import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';

test('User should be able to edit the first note', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('test@example.com', 'password123');

  await page.click('text=Go to Notes');
  await page.click('button:has-text("Edit")');
  await page.fill('textarea[name="content"]', 'Edited note content.');
  await page.click('button:has-text("Save")');
  await expect(page.locator('text=Edited note content.')).toBeVisible();
});
