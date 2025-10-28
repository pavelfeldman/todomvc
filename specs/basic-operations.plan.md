# TodoMVC Application - Comprehensive Test Plan

## Application Overview

The TodoMVC application is a React-based todo list manager that provides comprehensive task management functionality with URL routing and localStorage persistence. The application features:

- **Task Management**: Add, edit, complete, and delete individual todos with inline editing support
- **Bulk Operations**: Mark all todos as complete/incomplete and clear all completed todos at once
- **Filtering**: View todos by All, Active, or Completed status with dedicated URL routes
- **URL Routing**: Support for direct navigation to filtered views (`/`, `/active`, `/completed`)
- **Real-time Counter**: Dynamic display of active (incomplete) todo count
- **Input Validation**: Prevents empty or whitespace-only todos from being added or saved during editing
- **Persistence**: Automatic saving to localStorage, maintaining state across browser sessions
- **Inline Editing**: Double-click any todo to edit inline with Enter to save and Escape to cancel
- **Visual Feedback**: CSS classes for completed todos and editing states

## Test Scenarios

### 1. Adding New Todos

**Seed:** `tests/seed.spec.ts`

#### 1.1 Add Single Valid Todo

**File:** `tests/adding-new-todos/add-single-valid-todo.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Click in the "What needs to be done?" input field
3. Type "Buy groceries"
4. Press Enter key

**Expected Results:**
- Todo appears in the list with an unchecked checkbox
- Counter shows "1 item left"
- Input field is cleared and ready for next entry
- Footer section becomes visible with filters and counter
- Main section becomes visible with toggle-all checkbox

#### 1.2 Add Multiple Todos

**File:** `tests/adding-new-todos/add-multiple-todos.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Type "First todo" and press Enter
3. Type "Second todo" and press Enter
4. Type "Third todo" and press Enter

**Expected Results:**
- All three todos appear in the list in the order they were added
- Counter shows "3 items left"
- Input field is empty after each addition
- All todos have unchecked checkboxes

#### 1.3 Attempt to Add Empty Todo

**File:** `tests/adding-new-todos/add-empty-todo.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Click in the input field (leaving it empty)
3. Press Enter key

**Expected Results:**
- No todo is added to the list
- Todo list remains empty
- Main section and footer do not appear
- Input field remains focused and empty

#### 1.4 Attempt to Add Whitespace-Only Todo

**File:** `tests/adding-new-todos/add-whitespace-only-todo.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Type "   " (multiple spaces) in the input field
3. Press Enter key

**Expected Results:**
- No todo is added to the list
- Todo list remains empty
- Main section and footer do not appear
- Input field is cleared

#### 1.5 Add Todo with Leading and Trailing Whitespace

**File:** `tests/adding-new-todos/add-todo-with-whitespace.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Type "  Buy milk  " (with leading and trailing spaces)
3. Press Enter key

**Expected Results:**
- Todo is added with trimmed text: "Buy milk"
- Counter shows "1 item left"
- Input field is cleared
- No leading or trailing whitespace visible in the todo text

#### 1.6 Add Todo with Special Characters

**File:** `tests/adding-new-todos/add-todo-with-special-characters.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Type "Buy @groceries & supplies! #important"
3. Press Enter key

**Expected Results:**
- Todo is added with all special characters preserved
- Text displays correctly: "Buy @groceries & supplies! #important"
- Counter shows "1 item left"

#### 1.7 Add Todo with Long Text

**File:** `tests/adding-new-todos/add-todo-with-long-text.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Type a very long todo text (e.g., 200+ characters)
3. Press Enter key

**Expected Results:**
- Todo is added with complete text
- Text is properly displayed (may wrap or truncate based on CSS)
- Counter shows "1 item left"
- Input field is cleared

### 2. Toggling Todo Completion Status

**Seed:** `tests/seed.spec.ts`

#### 2.1 Mark Single Todo as Complete

**File:** `tests/toggling-todos/mark-single-todo-complete.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add a new todo "Complete this task"
3. Click the checkbox next to the todo

**Expected Results:**
- Todo checkbox becomes checked
- Todo text has strikethrough styling (completed class applied)
- Counter changes from "1 item left" to "0 items left"
- "Clear completed" button appears in the footer

#### 2.2 Unmark Completed Todo

**File:** `tests/toggling-todos/unmark-completed-todo.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add a new todo "Test todo"
3. Click the checkbox to mark it complete
4. Click the checkbox again to unmark it

**Expected Results:**
- Todo checkbox becomes unchecked
- Strikethrough styling is removed
- Counter changes back to "1 item left"
- "Clear completed" button disappears (if this was the only completed todo)

#### 2.3 Toggle Multiple Todos

**File:** `tests/toggling-todos/toggle-multiple-todos.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add three todos: "First", "Second", "Third"
3. Click the checkbox for "First" todo
4. Click the checkbox for "Third" todo

**Expected Results:**
- "First" and "Third" todos are marked as completed with checkboxes checked
- "Second" todo remains unchecked
- Counter shows "1 item left"
- "Clear completed" button appears

#### 2.4 Mark All Todos as Complete Using Individual Checkboxes

**File:** `tests/toggling-todos/mark-all-individually.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add three todos: "Task 1", "Task 2", "Task 3"
3. Click checkbox for each todo one by one

**Expected Results:**
- All todos are marked as completed
- All checkboxes are checked
- Counter shows "0 items left"
- Toggle-all checkbox becomes checked
- "Clear completed" button appears

### 3. Editing Todos

**Seed:** `tests/seed.spec.ts`

#### 3.1 Edit Todo Text

**File:** `tests/editing-todos/edit-todo-text.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add a todo "Original text"
3. Double-click on the todo text
4. Clear the input and type "Updated text"
5. Press Enter key

**Expected Results:**
- Todo enters edit mode with input field focused
- Todo text is updated to "Updated text"
- Edit mode closes
- Todo is displayed with new text
- Counter remains "1 item left"

#### 3.2 Edit Todo and Save with Enter Key

**File:** `tests/editing-todos/edit-save-with-enter.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add a todo "Buy milk"
3. Double-click on the todo text
4. Modify text to "Buy milk and bread"
5. Press Enter key

**Expected Results:**
- Todo text is saved as "Buy milk and bread"
- Edit mode closes
- Updated text is displayed

#### 3.3 Edit Todo and Save by Clicking Outside (Blur)

**File:** `tests/editing-todos/edit-save-with-blur.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add two todos: "First todo", "Second todo"
3. Double-click on "First todo"
4. Modify text to "Modified first todo"
5. Click outside the edit input (e.g., on the header or second todo)

**Expected Results:**
- Todo text is saved as "Modified first todo"
- Edit mode closes
- Updated text is displayed

#### 3.4 Cancel Edit with Escape Key

**File:** `tests/editing-todos/cancel-edit-with-escape.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add a todo "Original text"
3. Double-click on the todo text
4. Modify text to "This should not be saved"
5. Press Escape key

**Expected Results:**
- Edit mode closes
- Todo text remains "Original text" (changes are discarded)
- No update is saved

#### 3.5 Edit Todo to Empty Text (Delete on Save)

**File:** `tests/editing-todos/edit-to-empty-deletes.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add a todo "Delete me"
3. Double-click on the todo text
4. Clear all text (make it empty)
5. Press Enter key

**Expected Results:**
- Todo is deleted from the list
- Edit mode closes
- Counter returns to "0 items left"
- Main section and footer disappear

#### 3.6 Edit Todo to Whitespace-Only Text (Delete on Save)

**File:** `tests/editing-todos/edit-to-whitespace-deletes.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add a todo "Remove me"
3. Double-click on the todo text
4. Replace text with "   " (only spaces)
5. Press Enter key

**Expected Results:**
- Todo is deleted from the list
- Edit mode closes
- Counter returns to "0 items left"
- Main section and footer disappear

#### 3.7 Edit Todo with Leading and Trailing Whitespace

**File:** `tests/editing-todos/edit-trims-whitespace.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add a todo "Original"
3. Double-click on the todo text
4. Change text to "  Updated text  " (with spaces)
5. Press Enter key

**Expected Results:**
- Todo text is saved as "Updated text" (trimmed)
- No leading or trailing whitespace visible
- Edit mode closes

#### 3.8 Edit Completed Todo

**File:** `tests/editing-todos/edit-completed-todo.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add a todo "Completed task"
3. Click checkbox to mark it complete
4. Double-click on the todo text
5. Change text to "Edited completed task"
6. Press Enter key

**Expected Results:**
- Todo text is updated to "Edited completed task"
- Todo remains in completed state with checkbox checked
- Edit mode closes
- Counter still shows "0 items left"

### 4. Deleting Todos

**Seed:** `tests/seed.spec.ts`

#### 4.1 Delete Single Todo

**File:** `tests/deleting-todos/delete-single-todo.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add a todo "Delete me"
3. Hover over the todo item
4. Click the × (destroy) button

**Expected Results:**
- Todo is removed from the list
- Counter returns to "0 items left"
- Main section and footer disappear
- Only the header with input field remains visible

#### 4.2 Delete One of Multiple Todos

**File:** `tests/deleting-todos/delete-one-of-multiple.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add three todos: "First", "Second", "Third"
3. Hover over "Second" todo
4. Click the × button for "Second" todo

**Expected Results:**
- "Second" todo is removed
- "First" and "Third" todos remain in the list
- Counter shows "2 items left"
- Footer and main section remain visible

#### 4.3 Delete Last Remaining Todo

**File:** `tests/deleting-todos/delete-last-todo.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add a todo "Last one"
3. Hover over the todo
4. Click the × button

**Expected Results:**
- Todo is removed
- Todo list is empty
- Main section and footer disappear
- Application shows only the header

#### 4.4 Delete Completed Todo

**File:** `tests/deleting-todos/delete-completed-todo.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add two todos: "Active task", "Completed task"
3. Mark "Completed task" as complete
4. Hover over "Completed task"
5. Click the × button

**Expected Results:**
- "Completed task" is removed
- "Active task" remains in the list
- Counter shows "1 item left"
- "Clear completed" button disappears

#### 4.5 Delete All Todos One by One

**File:** `tests/deleting-todos/delete-all-one-by-one.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add three todos: "First", "Second", "Third"
3. Delete "First" by clicking its × button
4. Delete "Second" by clicking its × button
5. Delete "Third" by clicking its × button

**Expected Results:**
- After each deletion, the remaining todos are displayed
- After final deletion, todo list is empty
- Main section and footer disappear
- Only header remains visible

### 5. Filtering Todos

**Seed:** `tests/seed.spec.ts`

#### 5.1 Filter to Show Active Todos

**File:** `tests/filtering-todos/filter-active-todos.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add three todos: "Active 1", "Active 2", "Completed 1"
3. Mark "Completed 1" as complete
4. Click the "Active" filter link in the footer

**Expected Results:**
- URL changes to `/active`
- Only "Active 1" and "Active 2" are displayed
- "Completed 1" is not visible
- "Active" filter link has "selected" class
- Counter shows "2 items left"

#### 5.2 Filter to Show Completed Todos

**File:** `tests/filtering-todos/filter-completed-todos.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add three todos: "Active 1", "Completed 1", "Completed 2"
3. Mark "Completed 1" and "Completed 2" as complete
4. Click the "Completed" filter link in the footer

**Expected Results:**
- URL changes to `/completed`
- Only "Completed 1" and "Completed 2" are displayed
- "Active 1" is not visible
- "Completed" filter link has "selected" class
- Counter still shows "1 item left"
- "Clear completed" button is visible

#### 5.3 Filter to Show All Todos

**File:** `tests/filtering-todos/filter-all-todos.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add three todos: "Active 1", "Active 2", "Completed 1"
3. Mark "Completed 1" as complete
4. Click the "Completed" filter
5. Click the "All" filter link in the footer

**Expected Results:**
- URL changes to `/` or remains at `/`
- All three todos are displayed
- "All" filter link has "selected" class
- Counter shows "2 items left"

#### 5.4 Direct Navigation to Active Filter URL

**File:** `tests/filtering-todos/direct-navigate-active.spec.ts`

**Steps:**
1. Navigate directly to `/active`
2. Add a todo "Active task"
3. Verify todo is displayed

**Expected Results:**
- Application loads with Active filter selected
- URL is `/active`
- "Active" filter link has "selected" class
- Added todo is visible
- Counter shows "1 item left"

#### 5.5 Direct Navigation to Completed Filter URL

**File:** `tests/filtering-todos/direct-navigate-completed.spec.ts`

**Steps:**
1. Navigate directly to `/completed`
2. Add a todo "New task"
3. Mark it as complete

**Expected Results:**
- Application loads with Completed filter selected
- URL is `/completed`
- "Completed" filter link has "selected" class
- After marking complete, todo appears in the list
- Counter shows "0 items left"

#### 5.6 Toggle Todo Visibility by Changing Filter

**File:** `tests/filtering-todos/toggle-visibility-with-filter.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add a todo "Test todo"
3. Click "Active" filter (todo should be visible)
4. Mark todo as complete
5. Verify todo disappears from Active view

**Expected Results:**
- Todo is visible in Active filter when unchecked
- After marking complete, todo disappears from Active view
- Counter changes from "1 item left" to "0 items left"
- Todo is still in the list (switch to All or Completed to verify)

#### 5.7 Filter with No Matching Todos

**File:** `tests/filtering-todos/filter-no-matching-todos.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add two todos and mark both as complete
3. Click the "Active" filter

**Expected Results:**
- URL changes to `/active`
- No todos are displayed (empty list)
- Main section remains visible with empty todo list
- Counter shows "0 items left"
- Footer remains visible with filters

### 6. Bulk Operations

**Seed:** `tests/seed.spec.ts`

#### 6.1 Mark All Todos as Complete

**File:** `tests/bulk-operations/mark-all-complete.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add three todos: "Task 1", "Task 2", "Task 3"
3. Click the toggle-all checkbox (chevron down icon)

**Expected Results:**
- All todos are marked as completed
- All individual checkboxes become checked
- Toggle-all checkbox becomes checked
- Counter shows "0 items left"
- "Clear completed" button appears

#### 6.2 Unmark All Completed Todos

**File:** `tests/bulk-operations/unmark-all-complete.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add three todos: "Task 1", "Task 2", "Task 3"
3. Click toggle-all to mark all complete
4. Click toggle-all again to unmark all

**Expected Results:**
- All todos become uncompleted
- All individual checkboxes become unchecked
- Toggle-all checkbox becomes unchecked
- Counter shows "3 items left"
- "Clear completed" button disappears

#### 6.3 Mark All with Some Already Completed

**File:** `tests/bulk-operations/mark-all-some-completed.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add three todos: "Task 1", "Task 2", "Task 3"
3. Mark "Task 2" as complete individually
4. Click toggle-all checkbox

**Expected Results:**
- All todos (including already completed "Task 2") are marked as complete
- All checkboxes are checked
- Toggle-all checkbox is checked
- Counter shows "0 items left"

#### 6.4 Clear Completed Todos

**File:** `tests/bulk-operations/clear-completed.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add four todos: "Active 1", "Completed 1", "Active 2", "Completed 2"
3. Mark "Completed 1" and "Completed 2" as complete
4. Click the "Clear completed" button

**Expected Results:**
- "Completed 1" and "Completed 2" are removed from the list
- "Active 1" and "Active 2" remain in the list
- Counter shows "2 items left"
- "Clear completed" button disappears

#### 6.5 Clear All Todos When All Are Completed

**File:** `tests/bulk-operations/clear-all-when-all-completed.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add three todos: "Task 1", "Task 2", "Task 3"
3. Click toggle-all to mark all complete
4. Click "Clear completed" button

**Expected Results:**
- All todos are removed
- Todo list is empty
- Main section and footer disappear
- Only header remains visible

#### 6.6 Clear Completed While Viewing Completed Filter

**File:** `tests/bulk-operations/clear-completed-in-completed-view.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add three todos: "Active 1", "Completed 1", "Completed 2"
3. Mark "Completed 1" and "Completed 2" as complete
4. Click "Completed" filter
5. Click "Clear completed" button

**Expected Results:**
- Completed todos are removed
- View becomes empty (no todos in Completed filter)
- "Active 1" still exists (verify by switching to All or Active filter)
- Counter shows "1 item left"

#### 6.7 Toggle-all State with Mixed Completion Status

**File:** `tests/bulk-operations/toggle-all-mixed-state.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add three todos: "Task 1", "Task 2", "Task 3"
3. Mark "Task 1" and "Task 2" as complete
4. Observe toggle-all checkbox state

**Expected Results:**
- Toggle-all checkbox is NOT checked (not all todos are complete)
- When clicked, all todos become complete
- Counter initially shows "1 item left"

### 7. Real-time Counter

**Seed:** `tests/seed.spec.ts`

#### 7.1 Counter Shows Correct Singular Form

**File:** `tests/counter/counter-singular.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add a todo "Single task"

**Expected Results:**
- Counter displays "1 item left" (singular "item")

#### 7.2 Counter Shows Correct Plural Form

**File:** `tests/counter/counter-plural.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add two todos: "Task 1", "Task 2"

**Expected Results:**
- Counter displays "2 items left" (plural "items")

#### 7.3 Counter Updates When Marking Todo Complete

**File:** `tests/counter/counter-updates-on-complete.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add three todos
3. Mark one todo as complete
4. Verify counter decrements

**Expected Results:**
- Initial counter: "3 items left"
- After marking one complete: "2 items left"

#### 7.4 Counter Updates When Unmarking Todo

**File:** `tests/counter/counter-updates-on-uncomplete.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add two todos and mark both complete
3. Unmark one todo
4. Verify counter increments

**Expected Results:**
- After marking both complete: "0 items left"
- After unmarking one: "1 item left"

#### 7.5 Counter Shows Zero Items Left

**File:** `tests/counter/counter-zero-items.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add two todos
3. Mark both as complete

**Expected Results:**
- Counter displays "0 items left"
- Footer and counter remain visible

#### 7.6 Counter Updates After Deleting Active Todo

**File:** `tests/counter/counter-updates-on-delete-active.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add three todos
3. Delete one active todo

**Expected Results:**
- Initial counter: "3 items left"
- After deletion: "2 items left"

#### 7.7 Counter Remains Same After Deleting Completed Todo

**File:** `tests/counter/counter-same-after-delete-completed.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add three todos
3. Mark one as complete (counter: "2 items left")
4. Delete the completed todo

**Expected Results:**
- Counter remains "2 items left" (completed todos don't affect active count)

### 8. Persistence (localStorage)

**Seed:** `tests/seed.spec.ts`

#### 8.1 Todos Persist After Page Reload

**File:** `tests/persistence/todos-persist-reload.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add three todos: "Persistent 1", "Persistent 2", "Persistent 3"
3. Mark "Persistent 2" as complete
4. Reload the page

**Expected Results:**
- All three todos are still present after reload
- "Persistent 2" is still marked as complete
- "Persistent 1" and "Persistent 3" are still active
- Counter shows "2 items left"

#### 8.2 Edited Todos Persist After Reload

**File:** `tests/persistence/edited-todos-persist.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add a todo "Original text"
3. Edit todo to "Modified text"
4. Reload the page

**Expected Results:**
- Todo shows "Modified text" after reload
- Edit is preserved

#### 8.3 Deleted Todos Don't Reappear After Reload

**File:** `tests/persistence/deleted-todos-gone.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add three todos
3. Delete the second todo
4. Reload the page

**Expected Results:**
- Only two todos remain after reload
- Deleted todo does not reappear

#### 8.4 Cleared Completed Todos Don't Reappear

**File:** `tests/persistence/cleared-completed-gone.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add three todos
3. Mark two as complete
4. Click "Clear completed"
5. Reload the page

**Expected Results:**
- Only one active todo remains after reload
- Cleared completed todos do not reappear

#### 8.5 Empty State Persists After Reload

**File:** `tests/persistence/empty-state-persists.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Verify app starts with empty todo list
3. Add a todo "Test"
4. Delete the todo
5. Reload the page

**Expected Results:**
- After reload, app shows empty state
- No todos are present
- Only header is visible

#### 8.6 Filter State Persists After Reload

**File:** `tests/persistence/filter-state-persists.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add two todos: "Active", "Completed"
3. Mark "Completed" as complete
4. Click "Active" filter
5. Reload the page

**Expected Results:**
- After reload, Active filter is still selected
- URL is still `/active`
- Only "Active" todo is visible
- "Active" filter link has "selected" class

### 9. Edge Cases and Complex Scenarios

**Seed:** `tests/seed.spec.ts`

#### 9.1 Rapidly Add Multiple Todos

**File:** `tests/edge-cases/rapid-add-todos.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Type "Task 1" and press Enter
3. Immediately type "Task 2" and press Enter
4. Immediately type "Task 3" and press Enter
5. Immediately type "Task 4" and press Enter

**Expected Results:**
- All four todos are added in order
- Counter shows "4 items left"
- All todos are visible and properly rendered

#### 9.2 Rapidly Toggle Same Todo

**File:** `tests/edge-cases/rapid-toggle-todo.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add a todo "Toggle test"
3. Rapidly click the checkbox 5 times

**Expected Results:**
- Todo ends in uncompleted state (odd number of clicks)
- Counter and UI reflect the final state correctly
- No UI glitches or inconsistencies

#### 9.3 Edit Todo While Filter is Active

**File:** `tests/edge-cases/edit-with-active-filter.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add two todos: "Active task", "Another task"
3. Click "Active" filter
4. Double-click "Active task"
5. Change to "Modified active task"
6. Press Enter

**Expected Results:**
- Todo text is updated to "Modified active task"
- Todo remains visible in Active filter
- Edit completes successfully

#### 9.4 Complete Todo While in Active Filter

**File:** `tests/edge-cases/complete-in-active-filter.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add two todos: "Task 1", "Task 2"
3. Click "Active" filter
4. Mark "Task 1" as complete

**Expected Results:**
- "Task 1" disappears from the Active filter view
- "Task 2" remains visible
- Counter decrements from "2 items left" to "1 item left"
- Todo is still in the list (visible in All or Completed filter)

#### 9.5 Uncomplete Todo While in Completed Filter

**File:** `tests/edge-cases/uncomplete-in-completed-filter.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add two todos and mark both complete
3. Click "Completed" filter
4. Unmark one todo

**Expected Results:**
- Unmarked todo disappears from Completed filter view
- Other todo remains visible in Completed filter
- Counter increments from "0 items left" to "1 item left"

#### 9.6 Delete Last Todo in Filtered View

**File:** `tests/edge-cases/delete-last-in-filter.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add one todo "Single active"
3. Click "Active" filter
4. Delete the todo

**Expected Results:**
- Todo is deleted
- Active filter view becomes empty
- Main section and footer disappear
- URL remains `/active`

#### 9.7 Add Todo While Filter is Active (Non-matching)

**File:** `tests/edge-cases/add-todo-in-completed-filter.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add a todo "First" and mark it complete
3. Click "Completed" filter
4. Add a new todo "Second" (will be active by default)

**Expected Results:**
- New todo "Second" is added but NOT visible in Completed filter
- "First" remains visible
- Counter changes from "0 items left" to "1 item left"
- Switch to Active or All filter to see "Second"

#### 9.8 Large Number of Todos Performance

**File:** `tests/edge-cases/large-number-todos.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add 50 todos (can use a loop in the test)
3. Mark 25 of them as complete
4. Test filtering and operations

**Expected Results:**
- All 50 todos are added successfully
- Counter shows "25 items left"
- Filtering works correctly
- UI remains responsive

#### 9.9 Unicode and Emoji in Todo Text

**File:** `tests/edge-cases/unicode-emoji-text.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add a todo "Buy 🍎🍊🍌 and 日本語"
3. Verify display

**Expected Results:**
- Todo displays with emoji and unicode characters correctly
- Text is properly rendered: "Buy 🍎🍊🍌 and 日本語"

#### 9.10 Toggle-all with Rapidly Changing Todos

**File:** `tests/edge-cases/toggle-all-dynamic-list.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add three todos
3. Click toggle-all to mark all complete
4. Add a new todo (should be active)
5. Check toggle-all state

**Expected Results:**
- First three todos are complete
- New todo is active
- Toggle-all checkbox is unchecked (not all todos complete)
- Counter shows "1 item left"

### 10. Visual State and CSS Classes

**Seed:** `tests/seed.spec.ts`

#### 10.1 Completed Todo Has Correct CSS Class

**File:** `tests/visual-state/completed-class.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add a todo "Test todo"
3. Mark it as complete
4. Inspect the todo item element

**Expected Results:**
- Todo item has "completed" CSS class applied
- Visual styling indicates completion (strikethrough)

#### 10.2 Editing Todo Has Correct CSS Class

**File:** `tests/visual-state/editing-class.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add a todo "Test todo"
3. Double-click to enter edit mode
4. Inspect the todo item element

**Expected Results:**
- Todo item has "editing" CSS class applied
- Edit input is visible and focused

#### 10.3 Active Filter Has Selected Class

**File:** `tests/visual-state/selected-filter-class.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add a todo
3. Click "Active" filter
4. Inspect the Active filter link

**Expected Results:**
- Active filter link has "selected" CSS class
- All and Completed links do not have "selected" class

#### 10.4 Clear Completed Button Visibility

**File:** `tests/visual-state/clear-completed-visibility.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Add a todo (no completed todos exist)
3. Verify "Clear completed" button is not visible
4. Mark todo as complete
5. Verify button becomes visible

**Expected Results:**
- Button is hidden when no completed todos exist
- Button appears when at least one completed todo exists

#### 10.5 Main Section Visibility

**File:** `tests/visual-state/main-section-visibility.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Verify main section is not visible (no todos)
3. Add a todo
4. Verify main section becomes visible
5. Delete the todo
6. Verify main section disappears

**Expected Results:**
- Main section (with toggle-all and todo list) is only visible when todos exist

#### 10.6 Footer Visibility

**File:** `tests/visual-state/footer-visibility.spec.ts`

**Steps:**
1. Navigate to the application root URL (`/`)
2. Verify footer is not visible (no todos)
3. Add a todo
4. Verify footer becomes visible
5. Delete the todo
6. Verify footer disappears

**Expected Results:**
- Footer (with counter, filters, and clear completed) is only visible when todos exist

## Summary

This comprehensive test plan covers **100 test scenarios** across 10 major categories:

1. **Adding New Todos** (7 scenarios) - Validates todo creation with various input types
2. **Toggling Todo Completion** (4 scenarios) - Tests completion status changes
3. **Editing Todos** (8 scenarios) - Covers inline editing with different save/cancel methods
4. **Deleting Todos** (5 scenarios) - Tests individual todo deletion
5. **Filtering Todos** (7 scenarios) - Validates URL routing and filtered views
6. **Bulk Operations** (7 scenarios) - Tests mark-all and clear-completed functionality
7. **Real-time Counter** (7 scenarios) - Validates counter accuracy and updates
8. **Persistence** (6 scenarios) - Tests localStorage integration
9. **Edge Cases** (10 scenarios) - Covers complex interactions and boundary conditions
10. **Visual State** (6 scenarios) - Validates CSS classes and UI visibility

Each test scenario is designed to be:
- **Independent**: Can be run in any order without dependencies
- **Comprehensive**: Covers both happy path and edge cases
- **Specific**: Provides clear steps and expected outcomes
- **Maintainable**: Uses consistent naming and organization

The test plan ensures thorough coverage of all TodoMVC features including task management, filtering, bulk operations, real-time updates, input validation, and persistence.
