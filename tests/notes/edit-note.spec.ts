import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { NotesPage } from '../../pages/NotesPage';

test.describe('Edit Note - PassTheNote', () => {

  test('User should be able to edit the first note', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const notesPage = new NotesPage(page);

    // Step 1: Login
    await loginPage.goto();
    await loginPage.login('testuser@example.com', 'Password123');

    // Step 2: Ensure dashboard loaded
    await expect(page).toHaveURL(/dashboard/);

    // Step 3: Edit the first note
    const updatedTitle = 'Updated Note Title';
    const updatedDescription = 'Updated Note Description';

    await notesPage.editFirstNote(updatedTitle, updatedDescription);

    // Step 4: Validate updated note exists
    await notesPage.verifyNoteExists(updatedTitle);
  });

});
