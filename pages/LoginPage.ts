import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.fill('input[name="email"]', email);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }
}

test.describe('Login Tests - PassTheNote', () => {

  test('Valid Login should navigate to Dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login('testuser@example.com', 'Password123');

    await expect(page).toHaveURL(/.*dashboard/);
  });

});
