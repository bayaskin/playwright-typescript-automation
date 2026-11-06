import { test, expect } from '@playwright/test';

test.describe('TodoMVC application', () => {
  test('should allow a user to create a todo item', async ({ page }) => {
    await page.goto('/todomvc/');

    const todoInput = page.getByPlaceholder('What needs to be done?');

    await todoInput.fill('Learn TypeScript automation');
    await todoInput.press('Enter');

    await expect(
      page.getByTestId('todo-title')
    ).toHaveText('Learn TypeScript automation');
  });
});
