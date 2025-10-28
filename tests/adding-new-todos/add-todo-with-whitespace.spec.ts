// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Adding New Todos', () => {
  test('Add Todo with Leading and Trailing Whitespace', async ({ page }) => {
    // 1. Navigate to the application root URL (`/`)
    await page.goto('/');

    // 2. Type "  Buy milk  " (with leading and trailing spaces)
    await page.fill('.new-todo', '  Buy milk  ');

    // 3. Press Enter key
    await page.press('.new-todo', 'Enter');

    // Expected Results:
    // Todo is added with trimmed text: "Buy milk"
    const todoItem = page.locator('.todo-list li').first();
    await expect(todoItem).toBeVisible();
    await expect(todoItem.locator('label')).toHaveText('Buy milk');

    // Counter shows "1 item left"
    await expect(page.locator('.todo-count')).toContainText('1 item left');

    // Input field is cleared
    await expect(page.locator('.new-todo')).toHaveValue('');

    // No leading or trailing whitespace visible in the todo text
    const labelText = await todoItem.locator('label').textContent();
    expect(labelText).toBe('Buy milk');
    expect(labelText).not.toMatch(/^\s/);
    expect(labelText).not.toMatch(/\s$/);
  });
});
