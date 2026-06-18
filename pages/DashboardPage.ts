import { Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    // Navigates to the dashboard route
    await this.page.goto('/dashboard');
  }

  async assertDashboardVisible() {
    // Confirms the dashboard heading is visible
    await this.page.waitForSelector('text=Dashboard');
  }

  async goToNotes() {
    // Clicks the "Go to Notes" button
    await this.page.click('button:has-text("Go to Notes")');
  }

  async logout() {
    // Clicks the logout button
    await this.page.click('button:has-text("Logout")');
  }
}
