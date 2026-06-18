import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';

test.describe('Login → Create Note → Edit Note → Delete Note', () => {
  test('Full flow should work', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('test@example.com', 'password123');

    // Create note
    await page.click('text=Go to Notes');
    await page.fill('input[name="title"]', 'My First Note');
    await page.fill('textarea[name="content"]', 'This is a test note.');
    await page.click('button:has-text("Add Note")');
    await expect(page.locator('text=My First Note')).toBeVisible();

    // Edit note
    await page.click('button:has-text("Edit")');
    await page.fill('textarea[name="content"]', 'Updated content.');
    await page.click('button:has-text("Save")');
    await expect(page.locator('text=Updated content.')).toBeVisible();

    // Delete note
    await page.click('button:has-text("Delete")');
    await expect(page.locator('text=My First Note')).toHaveCount(0);
  });
});
