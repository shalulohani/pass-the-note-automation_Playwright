import { test, expect, request } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { NotesPage } from '../../pages/NotesPage';

test.describe('API + UI - Delete Note', () => {

  test('User should be able to delete a note via API and verify in UI', async ({ page }) => {

    // -------------------------------
    // Step 1: Login via API
    // -------------------------------
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://passthenote.app/api/login', {
      data: {
        email: 'testuser@example.com',
        password: 'Password123'
      }
    });

    expect(loginResponse.ok()).toBeTruthy();

    const loginData = await loginResponse.json();
    const token = loginData.token;

    // -------------------------------
    // Step 2: Create Note via API
    // -------------------------------
    const noteTitle = 'API Note To Delete';
    const noteDescription = 'This note will be deleted via API';

    const createNoteResponse = await apiContext.post('https://passthenote.app/api/notes', {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        title: noteTitle,
        description: noteDescription
      }
    });

    expect(createNoteResponse.ok()).toBeTruthy();

    const createdNote = await createNoteResponse.json();
    const noteId = createdNote.id;

    // -------------------------------
    // Step 3: Delete Note via API
    // -------------------------------
    const deleteNoteResponse = await apiContext.delete(`https://passthenote.app/api/notes/${noteId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    expect(deleteNoteResponse.ok()).toBeTruthy();

    // -------------------------------
    // Step 4: Verify in UI
    // -------------------------------
    const loginPage = new LoginPage(page);
    const notesPage = new NotesPage(page);

    await loginPage.goto();
    await loginPage.login('testuser@example.com', 'Password123');

    // Validate note does NOT exist
    await notesPage.verifyNoteNotExists(noteTitle);
  });

});
