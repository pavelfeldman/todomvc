// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Deleting Todos', () => {
  test('Delete Completed Todo', async ({ page }) => {
        // Test implementation for: Delete Completed Todo
    // Steps from plan:
    // **Steps:**
    // 1. Navigate to the application root URL (`/`)
    // 2. Add two todos: "Active task", "Completed task"
    // 3. Mark "Completed task" as complete
    // 4. Hover over "Completed task"
    // 5. Click the × button
    // 
    // **Expected Results:**
    // - "Completed task" is removed
    // - "Active task" remains in the list
    // - Counter shows "1 item left"
    // - "Clear completed" button disappears
    
    await page.goto('/');
    // TODO: Implement test steps
    
  });
});
