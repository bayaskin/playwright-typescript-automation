import { test, expect } from '@playwright/test';
import { setTestMetadata } from '../../src/utils/allure';

test.describe('TodoMVC application', () => {
  test('should allow a user to create a todo item', async ({
    page,
  }, testInfo) => {
    await setTestMetadata({
      epic: 'UI Automation',
      feature: 'Todo Management',
      story: 'Create Todo',
      severity: 'critical',
      tags: ['ui', 'smoke', 'regression'],
    });

    try {
      await test.step('Open TodoMVC application', async () => {
        await page.goto('/todomvc/');
      });

      await test.step('Create a todo item', async () => {
        const todoInput = page.getByPlaceholder(
          'What needs to be done?',
        );

        await todoInput.fill('Learn TypeScript automation');
        await todoInput.press('Enter');
      });

      await test.step('Verify todo item', async () => {
        await expect(
          page.getByTestId('todo-title'),
        ).toHaveText('Learn TypeScript automation');
      });
    } catch (error) {
      // Attach diagnostic information before rethrowing the failure.
      if (!page.isClosed()) {
        await testInfo.attach('failure-screenshot', {
          body: await page.screenshot({ fullPage: true }),
          contentType: 'image/png',
        });

        await testInfo.attach('page-source', {
          body: await page.content(),
          contentType: 'text/html',
        });
      }

      throw error;
    }
  });
});