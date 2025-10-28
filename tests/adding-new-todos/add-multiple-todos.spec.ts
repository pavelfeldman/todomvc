// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Adding New Todos', () => {
  test('Add Multiple Todos', async ({ page }) => {
    // 1. Navigate to the application root URL (`/`)
    await page.goto('/');

    // 2. Type "First todo" and press Enter
    await page.fill('.new-todo', 'First todo');
    await page.press('.new-todo', 'Enter');

    // 3. Type "Second todo" and press Enter
    await page.fill('.new-todo', 'Second todo');
    await page.press('.new-todo', 'Enter');

    // 4. Type "Third todo" and press Enter
    await page.fill('.new-todo', 'Third todo');
    await page.press('.new-todo', 'Enter');

    // Expected Results:
    // All three todos appear in the list in the order they were added
    const todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(3);
    await expect(todoItems.nth(0).locator('label')).toHaveText('First todo');
    await expect(todoItems.nth(1).locator('label')).toHaveText('Second todo');
    await expect(todoItems.nth(2).locator('label')).toHaveText('Third todo');

    // Counter shows "3 items left"
    await expect(page.locator('.todo-count')).toContainText('3 items left');

    // Input field is empty after each addition
    await expect(page.locator('.new-todo')).toHaveValue('');

    // All todos have unchecked checkboxes
    await expect(todoItems.nth(0).locator('input[type="checkbox"]')).not.toBeChecked();
    await expect(todoItems.nth(1).locator('input[type="checkbox"]')).not.toBeChecked();
    await expect(todoItems.nth(2).locator('input[type="checkbox"]')).not.toBeChecked();
  });
});
