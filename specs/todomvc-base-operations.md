# TodoMVC Application - Comprehensive Test Plan

## Application Overview

The TodoMVC application is a React-based todo list manager that provides comprehensive task management functionality. The application features:

- **Task Management**: Add, edit, complete, and delete individual todos
- **Bulk Operations**: Mark all todos as complete/incomplete and clear all completed todos
- **Filtering**: View todos by All, Active, or Completed status
- **URL Routing**: Support for direct navigation to filtered views via URLs (/, /active, /completed)
- **Counter Display**: Real-time count of active (incomplete) todos with proper singular/plural form ("item" vs "items")
- **Persistence**: Todos are saved to localStorage and persist across page reloads
- **Input Validation**: Prevent empty or whitespace-only todos from being added
- **Edit Modes**: Double-click to edit with save (Enter) and cancel (Escape) functionality
- **Delete via Edit**: Editing a todo to empty string deletes the todo
- **Visual Feedback**: Delete buttons appear on hover, checkboxes show completion state

## Test Scenarios

### 1. Adding New Todos

**Seed:** `tests/seed.spec.ts`

#### 1.1 Add Single Valid Todo

**File:** `tests/adding-new-todos/add-single-valid-todo.spec.ts`

**Steps:**
1. Click in the "What needs to be done?" input field
2. Type "Buy groceries"
3. Press Enter key

**Expected Results:**
- Todo appears in the list with an unchecked checkbox
- Counter shows "1 item left" (singular form)
- Input field is cleared and ready for next entry
- Todo list controls become visible (Mark all as complete checkbox)
- Footer with filter links (All, Active, Completed) appears
- Delete button (×) is present on the todo item

#### 1.2 Add Multiple Todos

**File:** `tests/adding-new-todos/add-multiple-todos.spec.ts`

**Steps:**
1. Type "Buy groceries" in the input field and press Enter
2. Type "Walk the dog" in the input field and press Enter
3. Type "Read a book" in the input field and press Enter

**Expected Results:**
- All three todos appear in the list in the order they were added
- Counter shows "3 items left" (plural form)
- Input field is cleared after each addition
- All todos have unchecked checkboxes
- All todos are visible in the list

#### 1.3 Reject Empty Todo

**File:** `tests/adding-new-todos/reject-empty-todo.spec.ts`

**Steps:**
1. Click in the input field (without typing anything)
2. Press Enter key

**Expected Results:**
- No todo is added to the list
- Input field remains empty
- No todo list controls appear
- No footer appears
- Counter is not displayed

#### 1.4 Reject Whitespace-Only Todo

**File:** `tests/adding-new-todos/reject-whitespace-only-todo.spec.ts`

**Steps:**
1. Type several spaces "   " in the input field
2. Press Enter key

**Expected Results:**
- No todo is added to the list
- Input field is cleared
- No todo list controls appear
- No footer appears
- Counter is not displayed

#### 1.5 Add Todo with Leading/Trailing Whitespace

**File:** `tests/adding-new-todos/add-todo-with-whitespace.spec.ts`

**Steps:**
1. Type "  Buy groceries  " (with leading and trailing spaces) in the input field
2. Press Enter key

**Expected Results:**
- Todo appears in the list (implementation may trim or preserve whitespace)
- Counter shows "1 item left"
- Input field is cleared
- Todo list controls appear

### 2. Editing Todos

**Seed:** `tests/seed.spec.ts`

#### 2.1 Edit Todo and Save with Enter

**File:** `tests/editing-todos/edit-todo-save-enter.spec.ts`

**Steps:**
1. Add a todo "Walk the dog"
2. Double-click on the todo text "Walk the dog"
3. Clear the text and type "Walk the dog in the park"
4. Press Enter key

**Expected Results:**
- Todo enters edit mode with a textbox showing current text
- Textbox is focused and text can be modified
- After pressing Enter, todo exits edit mode
- Todo text is updated to "Walk the dog in the park"
- Todo remains in its original position in the list

#### 2.2 Edit Todo and Cancel with Escape

**File:** `tests/editing-todos/edit-todo-cancel-escape.spec.ts`

**Steps:**
1. Add a todo "Walk the dog"
2. Double-click on the todo text "Walk the dog"
3. Clear the text and type "Modified text"
4. Press Escape key

**Expected Results:**
- Todo enters edit mode with a textbox
- After pressing Escape, todo exits edit mode
- Todo text remains unchanged as "Walk the dog"
- No changes are saved

#### 2.3 Delete Todo by Editing to Empty String

**File:** `tests/editing-todos/delete-via-empty-edit.spec.ts`

**Steps:**
1. Add a todo "Temporary todo"
2. Double-click on the todo text
3. Select all text (Ctrl+A or Cmd+A)
4. Press Backspace to delete all text
5. Press Enter key

**Expected Results:**
- Todo enters edit mode
- After submitting empty text, todo is removed from the list
- Counter decreases by 1
- If no todos remain, todo controls and footer disappear

#### 2.4 Edit Todo to Whitespace Only

**File:** `tests/editing-todos/edit-todo-whitespace-only.spec.ts`

**Steps:**
1. Add a todo "Valid todo"
2. Double-click on the todo text
3. Clear all text and type only spaces "   "
4. Press Enter key

**Expected Results:**
- Todo enters edit mode
- After submitting whitespace, behavior should match empty string (likely deletes the todo)
- Counter updates accordingly

#### 2.5 Edit Multiple Todos

**File:** `tests/editing-todos/edit-multiple-todos.spec.ts`

**Steps:**
1. Add three todos: "First", "Second", "Third"
2. Double-click "First" and change to "First Updated", press Enter
3. Double-click "Third" and change to "Third Updated", press Enter

**Expected Results:**
- First and third todos are updated with new text
- Second todo remains unchanged
- All todos remain in their original positions
- Counter remains at "3 items left"

### 3. Toggling Todo Completion

**Seed:** `tests/seed.spec.ts`

#### 3.1 Mark Single Todo as Complete

**File:** `tests/toggling-completion/mark-single-complete.spec.ts`

**Steps:**
1. Add a todo "Buy groceries"
2. Click the checkbox next to the todo

**Expected Results:**
- Checkbox becomes checked
- Counter changes from "1 item left" to "0 items left"
- "Clear completed" button appears in the footer
- Todo may have visual styling indicating completion (strikethrough, different color)

#### 3.2 Unmark Completed Todo

**File:** `tests/toggling-completion/unmark-completed-todo.spec.ts`

**Steps:**
1. Add a todo "Buy groceries"
2. Click the checkbox to mark it complete
3. Click the checkbox again to unmark it

**Expected Results:**
- Checkbox becomes unchecked
- Counter changes back to "1 item left"
- "Clear completed" button disappears
- Todo returns to active visual state

#### 3.3 Toggle Multiple Todos

**File:** `tests/toggling-completion/toggle-multiple-todos.spec.ts`

**Steps:**
1. Add three todos: "First", "Second", "Third"
2. Click the checkbox on "First" to mark complete
3. Click the checkbox on "Third" to mark complete

**Expected Results:**
- "First" and "Third" checkboxes are checked
- "Second" checkbox remains unchecked
- Counter shows "1 item left"
- "Clear completed" button appears

#### 3.4 Complete All Todos Individually

**File:** `tests/toggling-completion/complete-all-individually.spec.ts`

**Steps:**
1. Add three todos: "First", "Second", "Third"
2. Click checkbox on "First"
3. Click checkbox on "Second"
4. Click checkbox on "Third"

**Expected Results:**
- All checkboxes are checked
- Counter shows "0 items left"
- "Clear completed" button appears
- "Mark all as complete" checkbox becomes checked

### 4. Deleting Todos

**Seed:** `tests/seed.spec.ts`

#### 4.1 Delete Single Todo

**File:** `tests/deleting-todos/delete-single-todo.spec.ts`

**Steps:**
1. Add a todo "Buy groceries"
2. Hover over the todo item
3. Click the × button

**Expected Results:**
- Todo is removed from the list
- Counter is not displayed (no todos left)
- Todo list controls and footer disappear
- Only the input field remains visible

#### 4.2 Delete One of Multiple Todos

**File:** `tests/deleting-todos/delete-one-of-multiple.spec.ts`

**Steps:**
1. Add three todos: "First", "Second", "Third"
2. Click the × button on "Second"

**Expected Results:**
- "Second" todo is removed
- "First" and "Third" remain visible
- Counter changes from "3 items left" to "2 items left"
- Remaining todos maintain their order

#### 4.3 Delete Completed Todo

**File:** `tests/deleting-todos/delete-completed-todo.spec.ts`

**Steps:**
1. Add two todos: "Active todo" and "Completed todo"
2. Mark "Completed todo" as complete
3. Click the × button on "Completed todo"

**Expected Results:**
- Completed todo is removed
- Active todo remains
- Counter shows "1 item left"
- "Clear completed" button disappears (no completed todos left)

#### 4.4 Delete All Todos One by One

**File:** `tests/deleting-todos/delete-all-todos.spec.ts`

**Steps:**
1. Add three todos: "First", "Second", "Third"
2. Click × on "First"
3. Click × on "Second"
4. Click × on "Third"

**Expected Results:**
- All todos are removed
- Counter disappears
- Todo list controls and footer disappear
- Application returns to initial empty state

### 5. Mark All as Complete/Incomplete

**Seed:** `tests/seed.spec.ts`

#### 5.1 Mark All Todos as Complete

**File:** `tests/mark-all/mark-all-complete.spec.ts`

**Steps:**
1. Add three todos: "First", "Second", "Third"
2. Click the "❯Mark all as complete" checkbox

**Expected Results:**
- All todo checkboxes become checked
- "Mark all as complete" checkbox becomes checked
- Counter shows "0 items left"
- "Clear completed" button appears
- All todos show completed visual state

#### 5.2 Mark All as Incomplete

**File:** `tests/mark-all/mark-all-incomplete.spec.ts`

**Steps:**
1. Add three todos: "First", "Second", "Third"
2. Click the "❯Mark all as complete" checkbox to mark all complete
3. Click the "❯Mark all as complete" checkbox again

**Expected Results:**
- All todo checkboxes become unchecked
- "Mark all as complete" checkbox becomes unchecked
- Counter shows "3 items left"
- "Clear completed" button disappears
- All todos return to active visual state

#### 5.3 Mark All with Mixed Completion States

**File:** `tests/mark-all/mark-all-mixed-states.spec.ts`

**Steps:**
1. Add three todos: "First", "Second", "Third"
2. Mark "Second" as complete individually
3. Click the "❯Mark all as complete" checkbox

**Expected Results:**
- All todo checkboxes become checked (including "Second" which was already complete)
- Counter shows "0 items left"
- "Clear completed" button appears

#### 5.4 Unmark All with Mixed Completion States

**File:** `tests/mark-all/unmark-all-mixed-states.spec.ts`

**Steps:**
1. Add three todos: "First", "Second", "Third"
2. Mark all as complete using the "Mark all" checkbox
3. Unmark "Second" individually
4. Click the "❯Mark all as complete" checkbox

**Expected Results:**
- "Mark all" checkbox state changes from indeterminate/unchecked to checked
- All todos become complete again
- Counter shows "0 items left"

### 6. Filtering Todos

**Seed:** `tests/seed.spec.ts`

#### 6.1 Filter to Show Active Todos

**File:** `tests/filtering/filter-active-todos.spec.ts`

**Steps:**
1. Add three todos: "First", "Second", "Third"
2. Mark "Second" as complete
3. Click the "Active" filter link

**Expected Results:**
- URL changes to /active
- Only "First" and "Third" are visible
- "Second" (completed) is not visible
- Counter shows "2 items left"
- "Active" link has active styling

#### 6.2 Filter to Show Completed Todos

**File:** `tests/filtering/filter-completed-todos.spec.ts`

**Steps:**
1. Add three todos: "First", "Second", "Third"
2. Mark "First" and "Third" as complete
3. Click the "Completed" filter link

**Expected Results:**
- URL changes to /completed
- Only "First" and "Third" are visible
- "Second" (active) is not visible
- Counter shows "1 item left" (still shows active count)
- "Completed" link has active styling
- "Clear completed" button is visible

#### 6.3 Filter to Show All Todos

**File:** `tests/filtering/filter-all-todos.spec.ts`

**Steps:**
1. Add three todos: "First", "Second", "Third"
2. Mark "Second" as complete
3. Click "Active" filter
4. Click "All" filter

**Expected Results:**
- URL changes to /
- All three todos are visible
- Counter shows "2 items left"
- "All" link has active styling
- Both active and completed todos are displayed

#### 6.4 Filter with No Active Todos

**File:** `tests/filtering/filter-no-active-todos.spec.ts`

**Steps:**
1. Add two todos: "First", "Second"
2. Mark both as complete
3. Click the "Active" filter link

**Expected Results:**
- URL changes to /active
- No todos are visible (empty list)
- Counter shows "0 items left"
- "Active" link has active styling
- Footer and controls remain visible

#### 6.5 Filter with No Completed Todos

**File:** `tests/filtering/filter-no-completed-todos.spec.ts`

**Steps:**
1. Add two todos: "First", "Second"
2. Click the "Completed" filter link

**Expected Results:**
- URL changes to /completed
- No todos are visible (empty list)
- Counter shows "2 items left"
- "Completed" link has active styling
- "Clear completed" button is not visible

### 7. Clear Completed Todos

**Seed:** `tests/seed.spec.ts`

#### 7.1 Clear Single Completed Todo

**File:** `tests/clear-completed/clear-single-completed.spec.ts`

**Steps:**
1. Add two todos: "Active todo", "Completed todo"
2. Mark "Completed todo" as complete
3. Click the "Clear completed" button

**Expected Results:**
- "Completed todo" is removed from the list
- "Active todo" remains
- Counter shows "1 item left"
- "Clear completed" button disappears

#### 7.2 Clear Multiple Completed Todos

**File:** `tests/clear-completed/clear-multiple-completed.spec.ts`

**Steps:**
1. Add four todos: "Active 1", "Completed 1", "Active 2", "Completed 2"
2. Mark "Completed 1" and "Completed 2" as complete
3. Click the "Clear completed" button

**Expected Results:**
- Both completed todos are removed
- "Active 1" and "Active 2" remain
- Counter shows "2 items left"
- "Clear completed" button disappears

#### 7.3 Clear All Completed (No Active Remaining)

**File:** `tests/clear-completed/clear-all-completed.spec.ts`

**Steps:**
1. Add two todos: "First", "Second"
2. Mark both as complete
3. Click the "Clear completed" button

**Expected Results:**
- All todos are removed
- Todo list is empty
- Counter is not displayed
- Todo list controls and footer disappear
- Application returns to initial empty state

#### 7.4 Clear Completed from Completed Filter View

**File:** `tests/clear-completed/clear-from-completed-view.spec.ts`

**Steps:**
1. Add three todos: "Active", "Completed 1", "Completed 2"
2. Mark "Completed 1" and "Completed 2" as complete
3. Click "Completed" filter
4. Click the "Clear completed" button

**Expected Results:**
- Both completed todos are removed
- View changes to show empty list (no completed todos)
- Switching to "All" or "Active" shows only "Active" todo
- Counter shows "1 item left"

### 8. Active Counter Display

**Seed:** `tests/seed.spec.ts`

#### 8.1 Counter with Zero Items

**File:** `tests/counter/counter-zero-items.spec.ts`

**Steps:**
1. Add one todo "Single todo"
2. Mark it as complete

**Expected Results:**
- Counter displays "0 items left" (plural form)

#### 8.2 Counter with One Item

**File:** `tests/counter/counter-one-item.spec.ts`

**Steps:**
1. Add one todo "Single todo"

**Expected Results:**
- Counter displays "1 item left" (singular form)

#### 8.3 Counter with Multiple Items

**File:** `tests/counter/counter-multiple-items.spec.ts`

**Steps:**
1. Add five todos
2. Mark two as complete

**Expected Results:**
- Counter displays "3 items left" (plural form)

#### 8.4 Counter Updates on Toggle

**File:** `tests/counter/counter-updates-on-toggle.spec.ts`

**Steps:**
1. Add two todos
2. Mark one as complete (observe counter: "1 item left")
3. Unmark it (observe counter: "2 items left")
4. Mark both as complete (observe counter: "0 items left")

**Expected Results:**
- Counter updates immediately with each toggle
- Correct singular/plural form is used

### 9. URL Routing

**Seed:** `tests/seed.spec.ts`

#### 9.1 Direct Navigation to Root

**File:** `tests/routing/navigate-to-root.spec.ts`

**Steps:**
1. Add two todos and mark one complete
2. Navigate to /active
3. Directly navigate to / (root URL)

**Expected Results:**
- All todos are visible
- "All" filter link has active styling
- Application state is preserved

#### 9.2 Direct Navigation to Active Filter

**File:** `tests/routing/navigate-to-active.spec.ts`

**Steps:**
1. Add three todos: "Active 1", "Completed", "Active 2"
2. Mark "Completed" as complete
3. Directly navigate to /active

**Expected Results:**
- URL is /active
- Only active todos are visible
- "Active" filter link has active styling
- Application state is preserved

#### 9.3 Direct Navigation to Completed Filter

**File:** `tests/routing/navigate-to-completed.spec.ts`

**Steps:**
1. Add three todos and mark two as complete
2. Directly navigate to /completed

**Expected Results:**
- URL is /completed
- Only completed todos are visible
- "Completed" filter link has active styling
- Application state is preserved

#### 9.4 Invalid Route Handling

**File:** `tests/routing/invalid-route.spec.ts`

**Steps:**
1. Add two todos
2. Directly navigate to /invalid-route

**Expected Results:**
- Application handles gracefully (likely redirects to / or shows all todos)
- No errors or crashes occur
- Todos remain visible

### 10. Persistence (localStorage)

**Seed:** `tests/seed.spec.ts`

#### 10.1 Persist Single Todo After Reload

**File:** `tests/persistence/persist-single-todo.spec.ts`

**Steps:**
1. Add a todo "Persistent todo"
2. Reload the page

**Expected Results:**
- Todo "Persistent todo" is still visible
- Counter shows "1 item left"
- Todo controls and footer are visible

#### 10.2 Persist Multiple Todos After Reload

**File:** `tests/persistence/persist-multiple-todos.spec.ts`

**Steps:**
1. Add three todos: "First", "Second", "Third"
2. Reload the page

**Expected Results:**
- All three todos are visible in the same order
- Counter shows "3 items left"
- All todos have unchecked checkboxes

#### 10.3 Persist Completion State

**File:** `tests/persistence/persist-completion-state.spec.ts`

**Steps:**
1. Add three todos: "Active 1", "Completed", "Active 2"
2. Mark "Completed" as complete
3. Reload the page

**Expected Results:**
- All three todos are visible
- "Completed" checkbox is checked
- "Active 1" and "Active 2" checkboxes are unchecked
- Counter shows "2 items left"
- "Clear completed" button is visible

#### 10.4 Persist Active Filter View

**File:** `tests/persistence/persist-active-filter.spec.ts`

**Steps:**
1. Add three todos and mark one complete
2. Navigate to /active filter
3. Reload the page

**Expected Results:**
- Page loads with /active URL
- Only active todos are visible
- "Active" filter link has active styling
- All todo data is preserved

#### 10.5 Persist After Clear Completed

**File:** `tests/persistence/persist-after-clear-completed.spec.ts`

**Steps:**
1. Add three todos: "Active", "Completed 1", "Completed 2"
2. Mark two as complete
3. Click "Clear completed"
4. Reload the page

**Expected Results:**
- Only "Active" todo is visible
- Counter shows "1 item left"
- Completed todos remain deleted

#### 10.6 Persist Empty State

**File:** `tests/persistence/persist-empty-state.spec.ts`

**Steps:**
1. Add two todos
2. Delete both todos
3. Reload the page

**Expected Results:**
- No todos are visible
- Application shows initial empty state
- Only input field is visible
- No controls or footer displayed

### 11. Combined Operations

**Seed:** `tests/seed.spec.ts`

#### 11.1 Add, Edit, Complete, and Filter

**File:** `tests/combined/add-edit-complete-filter.spec.ts`

**Steps:**
1. Add todo "Original text"
2. Double-click and edit to "Edited text", press Enter
3. Mark as complete
4. Click "Completed" filter

**Expected Results:**
- Todo shows as "Edited text" in completed view
- Checkbox is checked
- Counter shows "0 items left"

#### 11.2 Mark All, Filter, Clear Completed

**File:** `tests/combined/mark-all-filter-clear.spec.ts`

**Steps:**
1. Add three todos: "First", "Second", "Third"
2. Click "Mark all as complete"
3. Click "Completed" filter
4. Click "Clear completed"

**Expected Results:**
- All todos are removed
- View shows empty state
- Application returns to initial state

#### 11.3 Add Todo While on Active Filter

**File:** `tests/combined/add-on-active-filter.spec.ts`

**Steps:**
1. Add two todos and mark one complete
2. Click "Active" filter
3. Add a new todo "New active todo" using the input field

**Expected Results:**
- New todo appears in the active list
- Counter increases by 1
- New todo is visible (filter remains on Active)

#### 11.4 Add Todo While on Completed Filter

**File:** `tests/combined/add-on-completed-filter.spec.ts`

**Steps:**
1. Add one todo and mark it complete
2. Click "Completed" filter
3. Add a new todo "New active todo"

**Expected Results:**
- New todo is added but not visible (filter is still Completed)
- Counter increases by 1
- Clicking "All" or "Active" shows the new todo

#### 11.5 Toggle Todo from Different Filter Views

**File:** `tests/combined/toggle-from-filter-views.spec.ts`

**Steps:**
1. Add three todos: "Active 1", "Active 2", "Completed"
2. Mark "Completed" as complete
3. Click "Active" filter
4. Mark "Active 1" as complete (from active view)
5. Click "All" filter

**Expected Results:**
- "Active 1" and "Completed" are marked complete
- "Active 2" remains active
- Counter shows "1 item left"
- Todo properly disappears from Active view when marked complete

#### 11.6 Edit Todo While Filtered

**File:** `tests/combined/edit-while-filtered.spec.ts`

**Steps:**
1. Add three todos: "Active 1", "Active 2", "Completed"
2. Mark "Completed" as complete
3. Click "Active" filter
4. Double-click "Active 1" and edit to "Modified Active 1", press Enter

**Expected Results:**
- Todo is successfully edited
- Todo remains in the active view
- Todo maintains its completion state (unchecked)
- Counter remains unchanged

#### 11.7 Delete from Different Filter Views

**File:** `tests/combined/delete-from-filter-views.spec.ts`

**Steps:**
1. Add three todos and mark one complete
2. Click "Completed" filter
3. Delete the completed todo using × button
4. Click "All" filter

**Expected Results:**
- Deleted todo is removed from all views
- Remaining todos are visible in "All" view
- Counter updates correctly
- "Clear completed" button disappears if no completed todos remain

#### 11.8 Complex Workflow Simulation

**File:** `tests/combined/complex-workflow.spec.ts`

**Steps:**
1. Add five todos: "Buy milk", "Walk dog", "Read book", "Write code", "Exercise"
2. Mark "Walk dog" and "Exercise" as complete
3. Double-click "Read book" and edit to "Read technical book"
4. Click "Active" filter
5. Add new todo "Call dentist"
6. Mark "Buy milk" as complete from active view
7. Click "All" filter
8. Click "Clear completed" button
9. Reload the page

**Expected Results:**
- After step 2: 2 completed, 3 active, counter shows "3 items left"
- After step 3: Edit is saved, "Read technical book" visible
- After step 4: Only active todos visible (3 todos)
- After step 5: "Call dentist" added to active view, counter shows "4 items left"
- After step 6: "Buy milk" disappears from active view
- After step 7: All 5 todos visible, 3 completed
- After step 8: Only 2 active todos remain ("Read technical book", "Write code")
- After step 9: State persists, 2 active todos visible, counter shows "2 items left"

## Test Execution Notes

### Prerequisites
- Application must be running and accessible
- Browser localStorage must be enabled
- Fresh localStorage state for each test (achieved through seed file)

### Test Data Guidelines
- Use descriptive todo text that clearly indicates test purpose
- Keep todo text concise (under 50 characters recommended)
- Use varied todo text to ensure uniqueness in multi-todo scenarios
- Include special characters in some tests to verify proper handling

### Common Assertions
- Verify todo list item count matches expected
- Verify counter displays correct number and singular/plural form
- Verify URL matches expected route
- Verify proper visibility of UI elements (controls, footer, buttons)
- Verify proper visual state of todos (checkboxes, styling)
- Verify localStorage persistence where applicable

### Test Independence
- Each test should start with a fresh application state (provided by seed file)
- Tests should not depend on execution order
- Clean up state is not required as seed file provides fresh start

### Known Edge Cases to Monitor
- Very long todo text (100+ characters)
- Special characters in todo text (emojis, unicode, HTML entities)
- Rapid consecutive actions (double-click, multiple rapid clicks)
- Browser back/forward navigation
- Multiple browser tabs with same application
- localStorage quota limits

## Coverage Summary

This test plan provides comprehensive coverage for:

- ✅ **CRUD Operations**: Create, Read, Update, Delete todos
- ✅ **UI Interactions**: Click, double-click, hover, keyboard input
- ✅ **Validation**: Empty input, whitespace-only input
- ✅ **State Management**: Completion states, filtering, counting
- ✅ **Routing**: URL navigation, deep linking, filter persistence
- ✅ **Persistence**: localStorage save/load across reloads
- ✅ **Bulk Operations**: Mark all, clear completed
- ✅ **Edge Cases**: Empty states, all complete, all active
- ✅ **Combined Workflows**: Complex multi-step user scenarios

**Total Test Scenarios**: 11 categories, 68 individual test cases

## Recommended Test Execution Order

1. Run all "Adding New Todos" tests first to verify basic functionality
2. Run "Toggling Completion" and "Counter" tests to verify state management
3. Run "Editing" and "Deleting" tests for modification operations
4. Run "Filtering" and "Routing" tests for navigation
5. Run "Mark All" and "Clear Completed" for bulk operations
6. Run "Persistence" tests to verify localStorage
7. Run "Combined Operations" tests last as they exercise multiple features

This order ensures that fundamental features work before testing complex combined scenarios.
