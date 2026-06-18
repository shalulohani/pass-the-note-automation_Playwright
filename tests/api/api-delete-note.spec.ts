import { test } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import { NotesPage } from '../../pages/NotesPage';

test('User should be able to delete the first note', async ({ page }) => {
  const login = new LoginPage(page);
  const notes = new NotesPage(page);

  await login.login('test@example.com', 'password123');
  // removed call to login.goto() because LoginPage has no 'goto' method

  await notes.deleteFirstNote();
});
