// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Toggling Todo Completion Status', () => {
  test('Toggle Multiple Todos', async ({ page }) => {
    // 1. Navigate to the application root URL (`/`)
    await page.goto('/');

    // 2. Add three todos: "First", "Second", "Third"
    await page.fill('.new-todo', 'First');
    await page.press('.new-todo', 'Enter');
    await page.fill('.new-todo', 'Second');
    await page.press('.new-todo', 'Enter');
    await page.fill('.new-todo', 'Third');
    await page.press('.new-todo', 'Enter');

    // 3. Click the checkbox for "First" todo
    const firstTodo = page.locator('.todo-list li').filter({ hasText: 'First' });
    const firstCheckbox = firstTodo.locator('input[type="checkbox"]');
    await firstCheckbox.click();

    // 4. Click the checkbox for "Third" todo
    const thirdTodo = page.locator('.todo-list li').filter({ hasText: 'Third' });
    const thirdCheckbox = thirdTodo.locator('input[type="checkbox"]');
    await thirdCheckbox.click();

    // Expected Results:
    // "First" and "Third" todos are marked as completed with checkboxes checked
    await expect(firstCheckbox).toBeChecked();
    await expect(thirdCheckbox).toBeChecked();

    // "Second" todo remains unchecked
    const secondTodo = page.locator('.todo-list li').filter({ hasText: 'Second' });
    const secondCheckbox = secondTodo.locator('input[type="checkbox"]');
    await expect(secondCheckbox).not.toBeChecked();

    // Counter shows "1 item left"
    await expect(page.locator('.todo-count')).toContainText('1 item left');

    // "Clear completed" button appears
    await expect(page.locator('.clear-completed')).toBeVisible();
  });
});
