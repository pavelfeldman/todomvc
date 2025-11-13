# Basic TodoMVC Test Plan - 10 Tests

## Application Overview

This test plan covers basic todo operations for the TodoMVC application. It includes fundamental user workflows such as creating, completing, editing, and deleting todos, as well as filtering and bulk operations. Each test scenario assumes a fresh application state with no existing todos.

## Test Scenarios

### 1. Basic Todo Operations

**Seed:** `tests/seed.spec.ts`

#### 1.1. Add a single todo item

**File:** `tests/basic-todo-operations/add-single-todo.spec.ts`

**Steps:**
  1. Navigate to the application homepage
  2. Verify the input field with placeholder 'What needs to be done?' is visible
  3. Type 'Buy groceries' into the input field
  4. Press Enter to submit the todo

**Expected Results:**
  - The todo item 'Buy groceries' appears in the todo list
  - The input field is cleared and ready for new input
  - The item counter displays '1 item left'
  - The todo item appears as unchecked/active

#### 1.2. Add multiple todo items

**File:** `tests/basic-todo-operations/add-multiple-todos.spec.ts`

**Steps:**
  1. Navigate to the application homepage
  2. Type 'Buy groceries' into the input field and press Enter
  3. Type 'Write report' into the input field and press Enter
  4. Type 'Call dentist' into the input field and press Enter

**Expected Results:**
  - All three todo items appear in the todo list in the order they were added
  - The item counter displays '3 items left'
  - All todos appear as unchecked/active
  - The input field is cleared after each submission

#### 1.3. Mark a todo item as complete

**File:** `tests/basic-todo-operations/mark-todo-complete.spec.ts`

**Steps:**
  1. Navigate to the application homepage
  2. Add a todo item 'Buy groceries' by typing and pressing Enter
  3. Click the checkbox next to 'Buy groceries'

**Expected Results:**
  - The checkbox for 'Buy groceries' is marked as checked
  - The todo text may appear with strikethrough or different styling
  - The item counter decreases to '0 items left'
  - A 'Clear completed' button appears in the footer

#### 1.4. Unmark a completed todo item

**File:** `tests/basic-todo-operations/unmark-todo.spec.ts`

**Steps:**
  1. Navigate to the application homepage
  2. Add a todo item 'Buy groceries' by typing and pressing Enter
  3. Click the checkbox next to 'Buy groceries' to mark it complete
  4. Click the checkbox again to unmark it

**Expected Results:**
  - The checkbox for 'Buy groceries' becomes unchecked
  - The todo returns to active state styling
  - The item counter increases back to '1 item left'
  - The 'Clear completed' button disappears if no other completed items exist

#### 1.5. Edit an existing todo item

**File:** `tests/basic-todo-operations/edit-todo.spec.ts`

**Steps:**
  1. Navigate to the application homepage
  2. Add a todo item 'Buy groceries' by typing and pressing Enter
  3. Double-click on the text 'Buy groceries'
  4. Clear the existing text and type 'Buy organic groceries'
  5. Press Enter to save the changes

**Expected Results:**
  - An editing textbox appears with the current todo text selected or focused
  - After pressing Enter, the todo text updates to 'Buy organic groceries'
  - The editing mode exits and the todo appears in normal view
  - The todo maintains its completion state (active in this case)

#### 1.6. Delete a todo item

**File:** `tests/basic-todo-operations/delete-todo.spec.ts`

**Steps:**
  1. Navigate to the application homepage
  2. Add a todo item 'Buy groceries' by typing and pressing Enter
  3. Add a second todo item 'Write report' by typing and pressing Enter
  4. Hover over the 'Buy groceries' todo item
  5. Click the delete button (×) that appears on the right side

**Expected Results:**
  - The 'Buy groceries' todo is removed from the list
  - The 'Write report' todo remains in the list
  - The item counter decreases to '1 item left'
  - The delete button appears only when hovering over a todo item

#### 1.7. Filter todos by Active status

**File:** `tests/basic-todo-operations/filter-active.spec.ts`

**Steps:**
  1. Navigate to the application homepage
  2. Add two todos: 'Buy groceries' and 'Write report'
  3. Mark 'Buy groceries' as complete by clicking its checkbox
  4. Click on the 'Active' filter link in the footer

**Expected Results:**
  - The URL changes to include '/active'
  - Only the 'Write report' todo is visible in the list
  - The 'Buy groceries' completed todo is hidden
  - The 'Active' filter link appears with active/selected styling
  - The item counter still displays '1 item left'

#### 1.8. Filter todos by Completed status

**File:** `tests/basic-todo-operations/filter-completed.spec.ts`

**Steps:**
  1. Navigate to the application homepage
  2. Add two todos: 'Buy groceries' and 'Write report'
  3. Mark 'Buy groceries' as complete by clicking its checkbox
  4. Click on the 'Completed' filter link in the footer

**Expected Results:**
  - The URL changes to include '/completed'
  - Only the 'Buy groceries' completed todo is visible in the list
  - The 'Write report' active todo is hidden
  - The 'Completed' filter link appears with active/selected styling
  - The item counter still displays '1 item left' (counting active items)

#### 1.9. Mark all todos as complete

**File:** `tests/basic-todo-operations/mark-all-complete.spec.ts`

**Steps:**
  1. Navigate to the application homepage
  2. Add three todos: 'Buy groceries', 'Write report', and 'Call dentist'
  3. Click the 'Mark all as complete' toggle button (chevron icon at the top)

**Expected Results:**
  - All three todo items are marked as complete with checked checkboxes
  - The item counter displays '0 items left'
  - The 'Clear completed' button appears in the footer
  - The 'Mark all as complete' toggle appears as checked/active

#### 1.10. Clear all completed todos

**File:** `tests/basic-todo-operations/clear-completed.spec.ts`

**Steps:**
  1. Navigate to the application homepage
  2. Add three todos: 'Buy groceries', 'Write report', and 'Call dentist'
  3. Mark 'Buy groceries' and 'Write report' as complete
  4. Click the 'Clear completed' button in the footer

**Expected Results:**
  - The completed todos 'Buy groceries' and 'Write report' are removed from the list
  - The active todo 'Call dentist' remains in the list
  - The item counter displays '1 item left'
  - The 'Clear completed' button disappears after clearing
