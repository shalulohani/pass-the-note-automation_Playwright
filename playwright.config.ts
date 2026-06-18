import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000, // 60 seconds per test
  expect: {
    timeout: 10000
  },

  fullyParallel: true,
  forbidOnly: !!((globalThis as any).process?.env?.CI),
  retries: 0,
  workers: 3,

  reporter: [['html', { open: 'never' }]],

  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  webServer: {
    command: 'npm start',
    cwd: 'C:/Projects/-the-note-app',   // ⭐ IMPORTANT FIX
    port: 3000,
    timeout: 120000,
    reuseExistingServer: true
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ]
});
