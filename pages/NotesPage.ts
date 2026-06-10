import { Page, Locator, expect } from '@playwright/test';

export class NotesPage {
  readonly page: Page;
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly saveButton: Locator;
  readonly noteItems: Locator;
  readonly editButton: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Update selectors based on actual PassTheNote UI
    this.titleInput = page.locator('input[name="title"]');
    this.descriptionInput = page.locator('textarea[name="description"]');
    this.saveButton = page.locator('button:has-text("Save")');
    this.noteItems = page.locator('.note-item');
    this.editButton = page.locator('button:has-text("Edit")');
    this.deleteButton = page.locator('button:has-text("Delete")');
  }

  async createNote(title: string, description: string) {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.saveButton.click();
  }

  async editFirstNote(newTitle: string, newDescription: string) {
    await this.editButton.first().click();
    await this.titleInput.fill(newTitle);
    await this.descriptionInput.fill(newDescription);
    await this.saveButton.click();
  }

  async deleteFirstNote() {
    await this.deleteButton.first().click();
  }

  async verifyNoteExists(title: string) {
    await expect(this.page.locator('.note-item', { hasText: title })).toBeVisible();
  }

  async verifyNoteNotExists(title: string) {
    await expect(this.page.locator('.note-item', { hasText: title })).toHaveCount(0);
  }
}
