// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Filtering Todos', () => {
  test('Filter to Show Active Todos', async ({ page }) => {
        // Test implementation for: Filter to Show Active Todos
    // Steps from plan:
    // **Steps:**
    // 1. Navigate to the application root URL (`/`)
    // 2. Add three todos: "Active 1", "Active 2", "Completed 1"
    // 3. Mark "Completed 1" as complete
    // 4. Click the "Active" filter link in the footer
    // 
    // **Expected Results:**
    // - URL changes to `/active`
    // - Only "Active 1" and "Active 2" are displayed
    // - "Completed 1" is not visible
    // - "Active" filter link has "selected" class
    // - Counter shows "2 items left"
    
    await page.goto('/');
    // TODO: Implement test steps
    
  });
});
