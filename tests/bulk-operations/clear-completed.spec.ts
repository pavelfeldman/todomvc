// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Bulk Operations', () => {
  test('Clear Completed Todos', async ({ page }) => {
        // Test implementation for: Clear Completed Todos
    // Steps from plan:
    // **Steps:**
    // 1. Navigate to the application root URL (`/`)
    // 2. Add four todos: "Active 1", "Completed 1", "Active 2", "Completed 2"
    // 3. Mark "Completed 1" and "Completed 2" as complete
    // 4. Click the "Clear completed" button
    // 
    // **Expected Results:**
    // - "Completed 1" and "Completed 2" are removed from the list
    // - "Active 1" and "Active 2" remain in the list
    // - Counter shows "2 items left"
    // - "Clear completed" button disappears
    
    await page.goto('/');
    // TODO: Implement test steps
    
  });
});
