// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Bulk Operations', () => {
  test('Clear Completed While Viewing Completed Filter', async ({ page }) => {
        // Test implementation for: Clear Completed While Viewing Completed Filter
    // Steps from plan:
    // **Steps:**
    // 1. Navigate to the application root URL (`/`)
    // 2. Add three todos: "Active 1", "Completed 1", "Completed 2"
    // 3. Mark "Completed 1" and "Completed 2" as complete
    // 4. Click "Completed" filter
    // 5. Click "Clear completed" button
    // 
    // **Expected Results:**
    // - Completed todos are removed
    // - View becomes empty (no todos in Completed filter)
    // - "Active 1" still exists (verify by switching to All or Active filter)
    // - Counter shows "1 item left"
    
    await page.goto('/');
    // TODO: Implement test steps
    
  });
});
