// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Adding New Todos', () => {
  test('Add Single Valid Todo', async ({ page }) => {
    // 1. Navigate to the application root URL (`/`)
    await page.goto('/');

    // 2. Click in the "What needs to be done?" input field
    // 3. Type "Buy groceries"
    await page.fill('.new-todo', 'Buy groceries');

    // 4. Press Enter key
    await page.press('.new-todo', 'Enter');

    // Expected Results:
    // Todo appears in the list with an unchecked checkbox
    const todoItem = page.locator('.todo-list li').first();
    await expect(todoItem).toBeVisible();
    const checkbox = todoItem.locator('input[type="checkbox"]');
    await expect(checkbox).not.toBeChecked();
    await expect(todoItem.locator('label')).toHaveText('Buy groceries');

    // Counter shows "1 item left"
    await expect(page.locator('.todo-count')).toContainText('1 item left');

    // Input field is cleared and ready for next entry
    await expect(page.locator('.new-todo')).toHaveValue('');

    // Footer section becomes visible with filters and counter
    await expect(page.locator('.footer')).toBeVisible();

    // Main section becomes visible with toggle-all checkbox
    await expect(page.locator('.main')).toBeVisible();
    await expect(page.locator('.toggle-all')).toBeVisible();
  });
});
