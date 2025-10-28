// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Toggling Todo Completion Status', () => {
  test('Unmark Completed Todo', async ({ page }) => {
    // 1. Navigate to the application root URL (`/`)
    await page.goto('/');

    // 2. Add a new todo "Test todo"
    await page.fill('.new-todo', 'Test todo');
    await page.press('.new-todo', 'Enter');

    // 3. Click the checkbox to mark it complete
    const todoItem = page.locator('.todo-list li').first();
    const checkbox = todoItem.locator('input[type="checkbox"]');
    await checkbox.click();

    // 4. Click the checkbox again to unmark it
    await checkbox.click();

    // Expected Results:
    // Todo checkbox becomes unchecked
    await expect(checkbox).not.toBeChecked();

    // Strikethrough styling is removed
    await expect(todoItem).not.toHaveClass(/completed/);

    // Counter changes back to "1 item left"
    await expect(page.locator('.todo-count')).toContainText('1 item left');

    // "Clear completed" button disappears (if this was the only completed todo)
    await expect(page.locator('.clear-completed')).not.toBeVisible();
  });
});
