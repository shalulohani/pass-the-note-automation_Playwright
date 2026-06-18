import { test, expect, request } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';

test('API + UI - Delete Note', async ({ page }) => {
  // API login
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post('http://localhost:4000/login', {
    data: { email: 'test@example.com', password: 'password123' },
    headers: { 'Content-Type': 'application/json' }
  });

  expect(loginResponse.ok()).toBeTruthy();

  const loginData = await loginResponse.json();
  const token = loginData.token;

  // UI login
  const loginPage = new LoginPage(page);
  await loginPage.login('test@example.com', 'password123');

  // Delete note via UI
  await page.click('text=Go to Notes');
  await page.click('button:has-text("Delete")');
  await expect(page.locator('text=Note deleted')).toBeVisible();
});
