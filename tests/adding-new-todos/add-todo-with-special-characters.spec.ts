// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Adding New Todos', () => {
  test('Add Todo with Special Characters', async ({ page }) => {
    // 1. Navigate to the application root URL (`/`)
    await page.goto('/');

    // 2. Type "Buy @groceries & supplies! #important"
    await page.fill('.new-todo', 'Buy @groceries & supplies! #important');

    // 3. Press Enter key
    await page.press('.new-todo', 'Enter');

    // Expected Results:
    // Todo is added with all special characters preserved
    // Text displays correctly: "Buy @groceries & supplies! #important"
    const todoItem = page.locator('.todo-list li').first();
    await expect(todoItem).toBeVisible();
    await expect(todoItem.locator('label')).toHaveText('Buy @groceries & supplies! #important');

    // Counter shows "1 item left"
    await expect(page.locator('.todo-count')).toContainText('1 item left');
  });
});
