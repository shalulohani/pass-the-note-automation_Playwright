import { test, expect, type Page } from '@playwright/test';

// Minimal in-file page objects to avoid missing module imports.
class LoginPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(email: string, password: string) {
    await this.page.fill('input[name="email"]', email);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button:has-text("Login")');
  }
}

class DashboardPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async verifyDashboardLoaded() {
    await expect(this.page.locator('text=Dashboard')).toBeVisible();
  }

  async openCreateNote() {
    await this.page.click('button:has-text("New Note")').catch(async () => {
      await this.page.click('button:has-text("Create Note")');
    });
  }
}

// Minimal in-file NotesPage to avoid missing module import.
class NotesPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async createNote(title: string, description: string) {
    await this.page.fill('input[name="title"]', title);
    await this.page.fill('textarea[name="description"]', description);
    await this.page.click('button:has-text("Save")');
  }

  async verifyNoteExists(title: string) {
    const locator = this.page.locator(`text=${title}`);
    await expect(locator).toBeVisible();
  }

  async editFirstNote(updatedTitle: string, updatedDescription: string) {
    // Open the first note by title, edit fields and save
    await this.page.click(`text=${updatedTitle}`).catch(async () => {
      // if updated title isn't present yet, click the first note entry
      await this.page.locator('article, .note, .note-item').first().click();
    });
    await this.page.fill('input[name="title"]', updatedTitle);
    await this.page.fill('textarea[name="description"]', updatedDescription);
    await this.page.click('button:has-text("Save")');
  }

  async deleteFirstNote() {
    // Attempt to click a Delete button in the opened note or the first note item
    await this.page.click('button:has-text("Delete")').catch(async () => {
      await this.page.locator('article, .note, .note-item').first().locator('button:has-text("Delete")').click();
    });
  }

  async verifyNoteNotExists(title: string) {
    const locator = this.page.locator(`text=${title}`);
    await expect(locator).toHaveCount(0);
  }
}

test.describe('PassTheNote - Full E2E Workflow', () => {

  test('Login → Create Note → Edit Note → Delete Note', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const notesPage = new NotesPage(page);

    // -------------------------------
    // Step 1: Login
    // -------------------------------
    await loginPage.goto();
    await loginPage.login('testuser@example.com', 'Password123');

    await dashboardPage.verifyDashboardLoaded();

    // -------------------------------
    // Step 2: Create Note
    // -------------------------------
    const title = 'E2E Note Title';
    const description = 'This note was created in E2E test';

    await dashboardPage.openCreateNote();
    await notesPage.createNote(title, description);

    await notesPage.verifyNoteExists(title);

    // -------------------------------
    // Step 3: Edit Note
    // -------------------------------
    const updatedTitle = 'Updated E2E Note Title';
    const updatedDescription = 'Updated E2E note description';

    await notesPage.editFirstNote(updatedTitle, updatedDescription);

    await notesPage.verifyNoteExists(updatedTitle);

    // -------------------------------
    // Step 4: Delete Note
    // -------------------------------
    await notesPage.deleteFirstNote();

    await notesPage.verifyNoteNotExists(updatedTitle);
  });

});
