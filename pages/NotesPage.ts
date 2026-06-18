import { Page, expect } from '@playwright/test';

export class NotesPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/notes');
  }

  async createNote(title: string, description: string) {
    await this.page.click('button:has-text("Add Note")');
    await this.page.fill('input[name="title"]', title);
    await this.page.fill('textarea[name="description"]', description);
    await this.page.click('button:has-text("Save")');
  }

  async editFirstNote(newTitle: string, newDescription: string) {
    await this.page.click('(//button[contains(text(),"Edit")])[1]');
    await this.page.fill('input[name="title"]', newTitle);
    await this.page.fill('textarea[name="description"]', newDescription);
    await this.page.click('button:has-text("Update")');
  }

  async deleteFirstNote() {
    await this.page.click('(//button[contains(text(),"Delete")])[1]');
  }

  async verifyNoteExists(title: string) {
    await expect(this.page.locator(`text=${title}`)).toBeVisible();
  }
}
