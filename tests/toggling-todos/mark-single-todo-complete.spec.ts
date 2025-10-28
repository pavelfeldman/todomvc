// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Toggling Todo Completion Status', () => {
  test('Mark Single Todo as Complete', async ({ page }) => {
    // 1. Navigate to the application root URL (`/`)
    await page.goto('/');

    // 2. Add a new todo "Complete this task"
    await page.fill('.new-todo', 'Complete this task');
    await page.press('.new-todo', 'Enter');

    // 3. Click the checkbox next to the todo
    const todoItem = page.locator('.todo-list li').first();
    const checkbox = todoItem.locator('input[type="checkbox"]');
    await checkbox.click();

    // Expected Results:
    // Todo checkbox becomes checked
    await expect(checkbox).toBeChecked();

    // Todo text has strikethrough styling (completed class applied)
    await expect(todoItem).toHaveClass(/completed/);

    // Counter changes from "1 item left" to "0 items left"
    await expect(page.locator('.todo-count')).toContainText('0 items left');

    // "Clear completed" button appears in the footer
    await expect(page.locator('.clear-completed')).toBeVisible();
  });
});
