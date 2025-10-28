// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Filtering Todos', () => {
  test('Direct Navigation to Active Filter URL', async ({ page }) => {
        // Test implementation for: Direct Navigation to Active Filter URL
    // Steps from plan:
    // **Steps:**
    // 1. Navigate directly to `/active`
    // 2. Add a todo "Active task"
    // 3. Verify todo is displayed
    // 
    // **Expected Results:**
    // - Application loads with Active filter selected
    // - URL is `/active`
    // - "Active" filter link has "selected" class
    // - Added todo is visible
    // - Counter shows "1 item left"
    
    await page.goto('/');
    // TODO: Implement test steps
    
  });
});
