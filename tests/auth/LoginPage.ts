import { Page } from '@playwright/test';

export default class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async resetSession() {
    // Clear all stored tokens and cookies BEFORE navigating to login
    await this.page.goto('http://localhost:3000');
    await this.page.evaluate(() => localStorage.clear());
    await this.page.evaluate(() => sessionStorage.clear());
    await this.page.context().clearCookies();
  }

  async goto() {
    // Navigate directly to login page
    await this.page.goto('http://localhost:3000/login', { waitUntil: 'networkidle' });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async login(email: string, password: string) {
    // Reset session to avoid redirect to Dashboard
    await this.resetSession();

    // Go to login page
    await this.goto();

    // Debug: print current URL
    console.log("Current URL:", await this.page.url());

    // Wait for login form
    await this.page.waitForSelector('input[name="email"]', { timeout: 60000 });

    // Fill credentials
    await this.page.fill('input[name="email"]', email);
    await this.page.fill('input[name="password"]', password);

    // Click login button
    await this.page.click('button:has-text("Login")');

    // Wait for dashboard
    await this.page.waitForSelector('text=Dashboard', { timeout: 30000 });
  }
}
