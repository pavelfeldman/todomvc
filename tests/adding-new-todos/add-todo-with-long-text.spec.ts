// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Adding New Todos', () => {
  test('Add Todo with Long Text', async ({ page }) => {
    // 1. Navigate to the application root URL (`/`)
    await page.goto('/');

    // 2. Type a very long todo text (e.g., 200+ characters)
    const longText = 'This is a very long todo item that contains more than two hundred characters to test how the application handles lengthy text input. The purpose of this test is to ensure that the application can properly store, display, and manage todos with extended text content without any issues or data loss.';
    await page.fill('.new-todo', longText);

    // 3. Press Enter key
    await page.press('.new-todo', 'Enter');

    // Expected Results:
    // Todo is added with complete text
    const todoItem = page.locator('.todo-list li').first();
    await expect(todoItem).toBeVisible();
    await expect(todoItem.locator('label')).toHaveText(longText);

    // Text is properly displayed (may wrap or truncate based on CSS)
    // Verify the text content is present in the DOM
    await expect(todoItem.locator('label')).toContainText('This is a very long todo item');

    // Counter shows "1 item left"
    await expect(page.locator('.todo-count')).toContainText('1 item left');

    // Input field is cleared
    await expect(page.locator('.new-todo')).toHaveValue('');
  });
});
