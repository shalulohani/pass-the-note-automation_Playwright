import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly createNoteButton: Locator;
  readonly notesList: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createNoteButton = page.locator('button:has-text("Create Note")');
    this.notesList = page.locator('.note-item');
    this.logoutButton = page.locator('button:has-text("Logout")');
  }

  async verifyDashboardLoaded() {
    await expect(this.page).toHaveURL(/.*dashboard/);
    await expect(this.createNoteButton).toBeVisible();
  }

  async openCreateNote() {
    await this.createNoteButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}
