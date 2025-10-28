// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Toggling Todo Completion Status', () => {
  test('Mark All Todos as Complete Using Individual Checkboxes', async ({ page }) => {
    // 1. Navigate to the application root URL (`/`)
    await page.goto('/');

    // 2. Add three todos: "Task 1", "Task 2", "Task 3"
    await page.fill('.new-todo', 'Task 1');
    await page.press('.new-todo', 'Enter');
    await page.fill('.new-todo', 'Task 2');
    await page.press('.new-todo', 'Enter');
    await page.fill('.new-todo', 'Task 3');
    await page.press('.new-todo', 'Enter');

    // 3. Click checkbox for each todo one by one
    const task1 = page.locator('.todo-list li').filter({ hasText: 'Task 1' });
    const task1Checkbox = task1.locator('input[type="checkbox"]');
    await task1Checkbox.click();

    const task2 = page.locator('.todo-list li').filter({ hasText: 'Task 2' });
    const task2Checkbox = task2.locator('input[type="checkbox"]');
    await task2Checkbox.click();

    const task3 = page.locator('.todo-list li').filter({ hasText: 'Task 3' });
    const task3Checkbox = task3.locator('input[type="checkbox"]');
    await task3Checkbox.click();

    // Expected Results:
    // All todos are marked as completed
    await expect(task1).toHaveClass(/completed/);
    await expect(task2).toHaveClass(/completed/);
    await expect(task3).toHaveClass(/completed/);

    // All checkboxes are checked
    await expect(task1Checkbox).toBeChecked();
    await expect(task2Checkbox).toBeChecked();
    await expect(task3Checkbox).toBeChecked();

    // Counter shows "0 items left"
    await expect(page.locator('.todo-count')).toContainText('0 items left');

    // Toggle-all checkbox becomes checked
    const toggleAllCheckbox = page.locator('.toggle-all');
    await expect(toggleAllCheckbox).toBeChecked();

    // "Clear completed" button appears
    await expect(page.locator('.clear-completed')).toBeVisible();
  });
});
