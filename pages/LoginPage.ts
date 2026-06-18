import { Page } from '@playwright/test';

export default class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    // Navigate directly to the login route
    await this.page.goto('http://localhost:3000/login', { waitUntil: 'networkidle' });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async login(email: string, password: string) {
    // Go to login page first
    await this.goto();

    // Wait for login form
    await this.page.waitForSelector('input[name="email"]', { timeout: 60000 });

    // Fill credentials
    await this.page.fill('input[name="email"]', email);
    await this.page.fill('input[name="password"]', password);

    // Click the login button
    await this.page.click('button:has-text("Login")');

    // Wait for dashboard to appear
    await this.page.waitForSelector('text=Dashboard', { timeout: 30000 });
  }
}
