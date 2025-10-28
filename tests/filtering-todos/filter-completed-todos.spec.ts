// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Filtering Todos', () => {
  test('Filter to Show Completed Todos', async ({ page }) => {
        // Test implementation for: Filter to Show Completed Todos
    // Steps from plan:
    // **Steps:**
    // 1. Navigate to the application root URL (`/`)
    // 2. Add three todos: "Active 1", "Completed 1", "Completed 2"
    // 3. Mark "Completed 1" and "Completed 2" as complete
    // 4. Click the "Completed" filter link in the footer
    // 
    // **Expected Results:**
    // - URL changes to `/completed`
    // - Only "Completed 1" and "Completed 2" are displayed
    // - "Active 1" is not visible
    // - "Completed" filter link has "selected" class
    // - Counter still shows "1 item left"
    // - "Clear completed" button is visible
    
    await page.goto('/');
    // TODO: Implement test steps
    
  });
});
