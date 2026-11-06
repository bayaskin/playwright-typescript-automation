import { defineConfig, devices } from '@playwright/test';
import * as os from 'node:os';
import { config } from './src/utils/config';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,

  outputDir: 'test-results',

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    [
      'allure-playwright',
      {
        resultsDir: 'allure-results',
        detail: true,
        suiteTitle: true,
        environmentInfo: {
          environment: config.environment,
          os_platform: os.platform(),
          os_release: os.release(),
          node_version: process.version,
          playwright_version: '1.64.1',
        },
        globalLabels: [
          { name: 'framework', value: 'playwright' },
          { name: 'language', value: 'typescript' },
        ],
      },
    ],
  ],

  use: {
    baseURL: config.uiBaseUrl,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
