// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Filtering Todos', () => {
  test('Filter to Show All Todos', async ({ page }) => {
        // Test implementation for: Filter to Show All Todos
    // Steps from plan:
    // **Steps:**
    // 1. Navigate to the application root URL (`/`)
    // 2. Add three todos: "Active 1", "Active 2", "Completed 1"
    // 3. Mark "Completed 1" as complete
    // 4. Click the "Completed" filter
    // 5. Click the "All" filter link in the footer
    // 
    // **Expected Results:**
    // - URL changes to `/` or remains at `/`
    // - All three todos are displayed
    // - "All" filter link has "selected" class
    // - Counter shows "2 items left"
    
    await page.goto('/');
    // TODO: Implement test steps
    
  });
});
