import { defineConfig, devices } from '@playwright/test';

require('dotenv').config({ path: '.env.dev' });

export default defineConfig({
  testDir: './tests',

  globalSetup: './auth/setup-auth.js',
  
  fullyParallel: true,
  
  forbidOnly: !!process.env.CI,
  
  retries: process.env.CI ? 2 : 0,
  
  workers: process.env.CI ? 1 : undefined,
  
  reporter: 'html',
  
  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // ============================
    // AUTHENTICATED
    // ============================
    {
      name: 'authenticated-chromium',
      testDir: './tests/e2e/authenticated',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth/storageState.json',
      },
    },
    {
      name: 'authenticated-firefox',
      testDir: './tests/e2e/authenticated',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'auth/storageState.json',
      },
    },
    {
      name: 'authenticated-webkit',
      testDir: './tests/e2e/authenticated',
      use: {
        ...devices['Desktop Safari'],
        storageState: 'auth/storageState.json',
      },
    },

    // ============================
    // UNAUTHENTICATED
    // ============================
    {
      name: 'unauthenticated-chromium',
      testDir: './tests/e2e/unauthenticated',
      use: {
        ...devices['Desktop Chrome'],
        storageState: undefined,
      },
    },
    {
      name: 'unauthenticated-firefox',
      testDir: './tests/e2e/unauthenticated',
      use: {
        ...devices['Desktop Firefox'],
        storageState: undefined,
      },
    },
    {
      name: 'unauthenticated-webkit',
      testDir: './tests/e2e/unauthenticated',
      use: {
        ...devices['Desktop Safari'],
        storageState: undefined,
      },
    },
  ],
});

