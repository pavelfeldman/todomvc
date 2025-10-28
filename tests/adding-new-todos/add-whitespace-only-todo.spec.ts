// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Adding New Todos', () => {
  test('Attempt to Add Whitespace-Only Todo', async ({ page }) => {
    // 1. Navigate to the application root URL (`/`)
    await page.goto('/');

    // 2. Type "   " (multiple spaces) in the input field
    await page.fill('.new-todo', '   ');

    // 3. Press Enter key
    await page.press('.new-todo', 'Enter');

    // Expected Results:
    // No todo is added to the list
    const todoList = page.locator('.todo-list li');
    await expect(todoList).toHaveCount(0);

    // Todo list remains empty
    await expect(page.locator('.todo-list')).toBeEmpty();

    // Main section and footer do not appear
    await expect(page.locator('.main')).not.toBeVisible();
    await expect(page.locator('.footer')).not.toBeVisible();

    // Input field is cleared
    await expect(page.locator('.new-todo')).toHaveValue('');
  });
});
