# TodoMVC Application - Comprehensive Test Plan

## Application Overview

The TodoMVC application is a React-based todo list manager with React Router integration that provides comprehensive task management functionality. The application features:

- **Task Management**: Add, edit, complete, and delete individual todos
- **Input Validation**: Prevents empty or whitespace-only todos from being added
- **Editing Interface**: Double-click to edit todos, Enter to save, Escape to cancel, blur to save
- **Bulk Operations**: Mark all todos as complete/incomplete and clear all completed todos
- **Filtering**: View todos by All, Active, or Completed status
- **URL Routing**: Support for direct navigation to filtered views via URLs (/, /active, /completed)
- **Counter Display**: Real-time count of active (incomplete) todos with proper pluralization
- **Persistence**: Full state persistence using localStorage across browser sessions
- **Dynamic UI**: Controls (toggle all, filters, clear completed) appear only when relevant

## Test Scenarios

### 1. Adding New Todos

**Seed:** `tests/seed.spec.ts`

#### 1.1 Add Single Valid Todo

**File:** `tests/adding-new-todos/add-single-valid-todo.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Click in the "What needs to be done?" input field
3. Type "Buy groceries"
4. Press Enter key

**Expected Results:**
- Todo appears in the list with unchecked checkbox
- Counter shows "1 item left"
- Input field is cleared and ready for next entry
- Toggle all checkbox becomes visible
- Footer with filters and counter becomes visible

#### 1.2 Add Multiple Todos

**File:** `tests/adding-new-todos/add-multiple-todos.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Type "First task" in input field and press Enter
3. Type "Second task" in input field and press Enter
4. Type "Third task" in input field and press Enter

**Expected Results:**
- All three todos appear in the list in order of creation
- Counter shows "3 items left"
- Input field is cleared after each entry
- All todos are unchecked

#### 1.3 Attempt to Add Empty Todo

**File:** `tests/adding-new-todos/attempt-add-empty-todo.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Click in the input field (ensure it's focused)
3. Press Enter without typing anything

**Expected Results:**
- No todo is added to the list
- Todo list remains empty
- No footer or controls appear
- Input field remains empty and focused

#### 1.4 Attempt to Add Whitespace-Only Todo

**File:** `tests/adding-new-todos/attempt-add-whitespace-only-todo.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Type "   " (several spaces) in input field
3. Press Enter

**Expected Results:**
- No todo is added to the list
- Todo list remains empty
- No footer or controls appear
- Input field is cleared

#### 1.5 Add Todo with Leading and Trailing Whitespace

**File:** `tests/adding-new-todos/add-todo-with-whitespace.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Type "  Clean the house  " (with leading and trailing spaces)
3. Press Enter

**Expected Results:**
- Todo appears as "Clean the house" (whitespace trimmed)
- Counter shows "1 item left"
- Input field is cleared
- Todo text does not contain leading or trailing spaces

#### 1.6 Add Todo with Special Characters

**File:** `tests/adding-new-todos/add-todo-with-special-characters.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Type "Buy milk & eggs @ store (2pm)"
3. Press Enter

**Expected Results:**
- Todo appears with all special characters preserved: "Buy milk & eggs @ store (2pm)"
- Counter shows "1 item left"
- Input field is cleared

#### 1.7 Add Very Long Todo

**File:** `tests/adding-new-todos/add-very-long-todo.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Type a todo with 200+ characters
3. Press Enter

**Expected Results:**
- Todo is added with full text preserved
- Counter shows "1 item left"
- Input field is cleared
- Todo text is displayed (may wrap or truncate based on CSS)

### 2. Editing Existing Todos

**Seed:** `tests/seed.spec.ts`

#### 2.1 Edit Todo Successfully

**File:** `tests/editing-todos/edit-todo-successfully.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add a todo "Original text"
3. Double-click on the todo label "Original text"
4. Clear the edit input and type "Modified text"
5. Press Enter

**Expected Results:**
- Todo enters edit mode with input field containing "Original text"
- Edit input is focused and text is selected/editable
- After pressing Enter, todo text changes to "Modified text"
- Edit mode exits and normal view is restored
- Counter remains "1 item left"

#### 2.2 Cancel Edit with Escape Key

**File:** `tests/editing-todos/cancel-edit-with-escape.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add a todo "Original text"
3. Double-click on the todo label
4. Modify text to "Changed text"
5. Press Escape key

**Expected Results:**
- Todo enters edit mode when double-clicked
- After pressing Escape, edit is cancelled
- Todo text reverts to "Original text"
- Edit mode exits and normal view is restored

#### 2.3 Save Edit by Blurring Input

**File:** `tests/editing-todos/save-edit-on-blur.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add a todo "Original text"
3. Double-click on the todo label
4. Change text to "Modified text"
5. Click outside the edit input (blur the input)

**Expected Results:**
- Todo enters edit mode when double-clicked
- After blur, todo text changes to "Modified text"
- Edit mode exits automatically

#### 2.4 Delete Todo by Editing to Empty String

**File:** `tests/editing-todos/delete-todo-via-empty-edit.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add a todo "Task to delete"
3. Double-click on the todo label
4. Clear all text from the edit input
5. Press Enter

**Expected Results:**
- Todo enters edit mode when double-clicked
- After pressing Enter with empty text, todo is removed from list
- Counter returns to showing no items
- Footer and controls disappear (if this was the only todo)

#### 2.5 Delete Todo by Editing to Whitespace Only

**File:** `tests/editing-todos/delete-todo-via-whitespace-edit.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add a todo "Task to delete"
3. Double-click on the todo label
4. Replace text with "   " (only spaces)
5. Press Enter

**Expected Results:**
- Todo enters edit mode when double-clicked
- After pressing Enter, todo is deleted (whitespace trimmed to empty)
- Todo list becomes empty
- Footer and controls disappear

#### 2.6 Edit Todo with Whitespace

**File:** `tests/editing-todos/edit-todo-trim-whitespace.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add a todo "Original"
3. Double-click on the todo label
4. Change text to "  Modified  " (with leading/trailing spaces)
5. Press Enter

**Expected Results:**
- Todo text is saved as "Modified" (whitespace trimmed)
- No leading or trailing spaces in the saved todo

#### 2.7 Edit Completed Todo

**File:** `tests/editing-todos/edit-completed-todo.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add a todo "Task to complete"
3. Click the checkbox to mark it complete
4. Double-click on the todo label
5. Change text to "Updated completed task"
6. Press Enter

**Expected Results:**
- Completed todo can be edited
- After edit, todo remains completed
- Todo text is updated to "Updated completed task"
- Counter still shows "0 items left"

#### 2.8 Edit Multiple Todos in Sequence

**File:** `tests/editing-todos/edit-multiple-todos-sequence.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add three todos: "First", "Second", "Third"
3. Double-click "First", change to "First Updated", press Enter
4. Double-click "Second", change to "Second Updated", press Enter
5. Double-click "Third", change to "Third Updated", press Enter

**Expected Results:**
- Each todo can be edited independently
- All three todos show updated text
- Counter shows "3 items left"
- Edit mode properly enters and exits for each todo

### 3. Toggling Todo Completion Status

**Seed:** `tests/seed.spec.ts`

#### 3.1 Toggle Single Todo to Completed

**File:** `tests/toggling-todos/toggle-single-todo-complete.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add a todo "Task to complete"
3. Click the checkbox next to the todo

**Expected Results:**
- Checkbox becomes checked
- Todo is marked with completed styling (strikethrough)
- Counter changes from "1 item left" to "0 items left"
- "Clear completed" button appears in footer

#### 3.2 Toggle Completed Todo Back to Active

**File:** `tests/toggling-todos/toggle-completed-back-to-active.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add a todo "Task to complete"
3. Click the checkbox to complete it
4. Click the checkbox again to uncomplete it

**Expected Results:**
- After first click: checkbox is checked, todo is completed
- After second click: checkbox is unchecked, todo styling reverts to active
- Counter returns to "1 item left"
- "Clear completed" button disappears (no completed todos)

#### 3.3 Toggle Multiple Todos

**File:** `tests/toggling-todos/toggle-multiple-todos.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add three todos: "First", "Second", "Third"
3. Click checkbox for "First" todo
4. Click checkbox for "Third" todo

**Expected Results:**
- First and third todos are marked complete
- Second todo remains active
- Counter shows "1 item left"
- Toggle all checkbox is NOT checked (not all are complete)
- "Clear completed" button is visible

#### 3.4 Toggle All Todos to Completed

**File:** `tests/toggling-todos/toggle-all-to-completed.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add three todos: "First", "Second", "Third"
3. Click each checkbox to complete all todos individually

**Expected Results:**
- All three todos are marked complete
- Counter shows "0 items left"
- Toggle all checkbox becomes checked
- "Clear completed" button is visible

### 4. Deleting Todos

**Seed:** `tests/seed.spec.ts`

#### 4.1 Delete Single Todo

**File:** `tests/deleting-todos/delete-single-todo.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add a todo "Task to delete"
3. Hover over the todo to reveal the delete button
4. Click the delete (×) button

**Expected Results:**
- Todo is removed from the list
- Todo list becomes empty
- Counter, footer, and all controls disappear

#### 4.2 Delete Multiple Todos

**File:** `tests/deleting-todos/delete-multiple-todos.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add three todos: "First", "Second", "Third"
3. Hover over "Second" and click delete button
4. Hover over "First" and click delete button

**Expected Results:**
- After deleting "Second": only "First" and "Third" remain
- After deleting "First": only "Third" remains
- Counter updates accordingly ("2 items left", then "1 item left")

#### 4.3 Delete Completed Todo

**File:** `tests/deleting-todos/delete-completed-todo.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add a todo "Completed task"
3. Click checkbox to complete it
4. Hover over the todo and click delete button

**Expected Results:**
- Todo is removed from the list
- Todo list becomes empty
- All controls disappear

#### 4.4 Delete All Todos One by One

**File:** `tests/deleting-todos/delete-all-todos-one-by-one.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add three todos
3. Delete each todo one by one until none remain

**Expected Results:**
- After each deletion, counter decreases
- After last deletion, todo list is empty
- All controls and footer disappear
- Application returns to initial empty state

### 5. Mark All Todos as Complete/Incomplete

**Seed:** `tests/seed.spec.ts`

#### 5.1 Mark All Active Todos as Complete

**File:** `tests/toggle-all/mark-all-as-complete.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add three todos: "First", "Second", "Third"
3. Click the toggle all checkbox (or label "Mark all as complete")

**Expected Results:**
- All three todos are marked complete
- All checkboxes are checked
- Toggle all checkbox is checked
- Counter shows "0 items left"
- "Clear completed" button appears

#### 5.2 Mark All Complete Todos as Incomplete

**File:** `tests/toggle-all/mark-all-as-incomplete.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add three todos
3. Click toggle all to mark all complete
4. Click toggle all again to mark all incomplete

**Expected Results:**
- After first click: all todos complete, counter "0 items left"
- After second click: all todos active, counter "3 items left"
- Toggle all checkbox unchecked
- "Clear completed" button disappears

#### 5.3 Toggle All with Mixed Completion States

**File:** `tests/toggle-all/toggle-all-with-mixed-states.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add three todos
3. Complete the first todo individually
4. Click toggle all checkbox

**Expected Results:**
- Before toggle all: 1 complete, 2 active, counter "2 items left"
- After toggle all: all 3 todos become complete
- Counter shows "0 items left"
- Toggle all checkbox is checked

#### 5.4 Toggle All with Single Todo

**File:** `tests/toggle-all/toggle-all-single-todo.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add one todo "Single task"
3. Click toggle all checkbox
4. Click toggle all checkbox again

**Expected Results:**
- After first click: todo is complete, counter "0 items left"
- After second click: todo is active, counter "1 item left"
- Toggle all checkbox state matches todo completion state

### 6. Filtering Todos

**Seed:** `tests/seed.spec.ts`

#### 6.1 Filter to Show Active Todos Only

**File:** `tests/filtering/filter-active-todos.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add three todos: "Active 1", "Active 2", "Completed 1"
3. Mark "Completed 1" as complete
4. Click "Active" filter link

**Expected Results:**
- URL changes to /active
- Only "Active 1" and "Active 2" are displayed
- "Completed 1" is not visible
- Counter shows "2 items left"
- "Active" filter is highlighted/selected
- Toggle all checkbox is visible and unchecked

#### 6.2 Filter to Show Completed Todos Only

**File:** `tests/filtering/filter-completed-todos.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add three todos: "Active 1", "Completed 1", "Completed 2"
3. Mark "Completed 1" and "Completed 2" as complete
4. Click "Completed" filter link

**Expected Results:**
- URL changes to /completed
- Only "Completed 1" and "Completed 2" are displayed
- "Active 1" is not visible
- Counter still shows "1 item left" (counts all active todos)
- "Completed" filter is highlighted/selected
- "Clear completed" button is visible

#### 6.3 Filter Back to Show All Todos

**File:** `tests/filtering/filter-all-todos.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add three todos: "First", "Second", "Third"
3. Complete "Second"
4. Click "Active" filter
5. Click "All" filter

**Expected Results:**
- After clicking "Active": only 2 todos visible
- After clicking "All": all 3 todos visible
- URL changes to /
- "All" filter is highlighted/selected
- Counter shows "2 items left"

#### 6.4 Direct URL Navigation to Active Filter

**File:** `tests/filtering/direct-url-active-filter.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add two active todos and one completed todo
3. Navigate directly to /active URL

**Expected Results:**
- Page loads with Active filter applied
- Only active todos are displayed
- "Active" filter is highlighted
- Counter shows correct count of active todos

#### 6.5 Direct URL Navigation to Completed Filter

**File:** `tests/filtering/direct-url-completed-filter.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add one active todo and two completed todos
3. Navigate directly to /completed URL

**Expected Results:**
- Page loads with Completed filter applied
- Only completed todos are displayed
- "Completed" filter is highlighted
- Counter shows correct count of active todos (not completed)

#### 6.6 Filter with No Matching Todos

**File:** `tests/filtering/filter-no-matching-todos.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add two todos and mark both complete
3. Click "Active" filter

**Expected Results:**
- No todos are displayed (empty todo list)
- Footer with filters and counter remains visible
- Counter shows "0 items left"
- "Active" filter is highlighted
- Toggle all checkbox is not visible (no todos to display)

#### 6.7 Add Todo While Filtered

**File:** `tests/filtering/add-todo-while-filtered.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add a todo "First" and mark it complete
3. Click "Completed" filter to show only completed todos
4. Add a new todo "Second" via the input field

**Expected Results:**
- New todo "Second" is added but not visible (filter still active)
- Counter updates to "1 item left"
- Todo is active (unchecked)
- Clicking "All" or "Active" filter reveals the new todo

#### 6.8 Complete Todo While on Active Filter

**File:** `tests/filtering/complete-todo-while-on-active-filter.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add two todos: "First" and "Second"
3. Click "Active" filter
4. Complete "First" by clicking its checkbox

**Expected Results:**
- "First" disappears from view immediately (now completed, not active)
- Only "Second" remains visible
- Counter updates to "1 item left"
- Todo "First" still exists (visible in "All" or "Completed" filters)

### 7. Clearing Completed Todos

**Seed:** `tests/seed.spec.ts`

#### 7.1 Clear Single Completed Todo

**File:** `tests/clearing-completed/clear-single-completed.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add two todos: "Active" and "Completed"
3. Mark "Completed" as complete
4. Click "Clear completed" button

**Expected Results:**
- "Completed" todo is removed from list
- Only "Active" todo remains
- Counter shows "1 item left"
- "Clear completed" button disappears (no completed todos remain)

#### 7.2 Clear Multiple Completed Todos

**File:** `tests/clearing-completed/clear-multiple-completed.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add four todos: "Active 1", "Completed 1", "Completed 2", "Active 2"
3. Mark "Completed 1" and "Completed 2" as complete
4. Click "Clear completed" button

**Expected Results:**
- Both completed todos are removed
- Only "Active 1" and "Active 2" remain
- Counter shows "2 items left"
- "Clear completed" button disappears

#### 7.3 Clear All Completed Todos Leaving Empty List

**File:** `tests/clearing-completed/clear-all-leaving-empty.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add two todos and mark both complete
3. Click "Clear completed" button

**Expected Results:**
- Both todos are removed
- Todo list becomes empty
- All controls and footer disappear
- Application returns to initial empty state

#### 7.4 Clear Completed While on Completed Filter

**File:** `tests/clearing-completed/clear-while-on-completed-filter.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add two active and two completed todos
3. Click "Completed" filter
4. Click "Clear completed" button

**Expected Results:**
- All completed todos are removed
- Empty todo list is displayed (no completed todos to show)
- Counter shows "2 items left" (active todos still exist)
- Footer remains visible
- "Clear completed" button disappears

#### 7.5 Clear Completed Button Visibility

**File:** `tests/clearing-completed/clear-button-visibility.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add a todo "Task 1" (active)
3. Verify "Clear completed" button is not visible
4. Mark "Task 1" as complete
5. Verify "Clear completed" button appears
6. Click "Clear completed" button
7. Verify button disappears

**Expected Results:**
- Button only appears when there are completed todos
- Button disappears when no completed todos exist
- Button state updates immediately when completion status changes

### 8. Active Todo Counter

**Seed:** `tests/seed.spec.ts`

#### 8.1 Counter with Single Active Todo

**File:** `tests/counter/single-item-left.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add one todo "Single task"

**Expected Results:**
- Counter displays "1 item left" (singular "item")
- Counter is visible in footer

#### 8.2 Counter with Multiple Active Todos

**File:** `tests/counter/multiple-items-left.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add three todos

**Expected Results:**
- Counter displays "3 items left" (plural "items")
- Counter updates as todos are added

#### 8.3 Counter Updates When Completing Todos

**File:** `tests/counter/counter-updates-on-complete.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add three todos
3. Complete one todo
4. Complete another todo

**Expected Results:**
- Initial: "3 items left"
- After first completion: "2 items left"
- After second completion: "1 item left"
- Counter updates immediately after each change

#### 8.4 Counter with Zero Active Todos

**File:** `tests/counter/zero-items-left.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add two todos
3. Mark both as complete

**Expected Results:**
- Counter displays "0 items left" (plural "items")
- Footer remains visible
- "Clear completed" button is visible

#### 8.5 Counter Ignores Completed Todos

**File:** `tests/counter/counter-ignores-completed.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add five todos
3. Complete three of them

**Expected Results:**
- Counter shows "2 items left"
- Completed todos are not counted
- Counter accurately reflects only active todos

#### 8.6 Counter Updates Across All Filter Views

**File:** `tests/counter/counter-across-filters.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add three todos, complete one
3. Verify counter on "All" filter shows "2 items left"
4. Switch to "Active" filter, verify counter still shows "2 items left"
5. Switch to "Completed" filter, verify counter still shows "2 items left"

**Expected Results:**
- Counter shows same count regardless of active filter
- Counter always reflects total active todos, not filtered todos

### 9. LocalStorage Persistence

**Seed:** `tests/seed.spec.ts`

#### 9.1 Persist Todos After Page Reload

**File:** `tests/persistence/persist-after-reload.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add three todos: "First", "Second", "Third"
3. Mark "Second" as complete
4. Reload the page

**Expected Results:**
- All three todos are still present after reload
- "Second" is still marked complete
- "First" and "Third" are still active
- Counter shows "2 items left"
- All state is preserved exactly as before reload

#### 9.2 Persist Empty State

**File:** `tests/persistence/persist-empty-state.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add two todos
3. Delete both todos
4. Reload the page

**Expected Results:**
- Page loads with empty todo list
- No todos are displayed
- Application shows initial empty state
- No footer or controls are visible

#### 9.3 Persist Filter State After Reload

**File:** `tests/persistence/persist-filter-state.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add two active and one completed todo
3. Navigate to /active filter
4. Reload the page

**Expected Results:**
- Page loads with /active filter applied
- Only active todos are visible
- Filter state is preserved via URL
- Counter shows correct active count

#### 9.4 Persist After Completing All Todos

**File:** `tests/persistence/persist-all-completed.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add three todos
3. Mark all as complete using toggle all
4. Reload the page

**Expected Results:**
- All todos are still complete after reload
- Toggle all checkbox is checked
- Counter shows "0 items left"
- "Clear completed" button is visible

#### 9.5 Persist After Clearing Completed

**File:** `tests/persistence/persist-after-clear-completed.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add two active and two completed todos
3. Clear completed todos
4. Reload the page

**Expected Results:**
- Only the two active todos remain
- Cleared todos do not reappear
- Counter shows "2 items left"
- No "Clear completed" button (no completed todos)

#### 9.6 Persist Edited Todo Text

**File:** `tests/persistence/persist-edited-text.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add a todo "Original"
3. Edit todo to "Modified"
4. Reload the page

**Expected Results:**
- Todo displays "Modified" text after reload
- Edit is persisted correctly
- No reversion to original text

### 10. Edge Cases and Complex Scenarios

**Seed:** `tests/seed.spec.ts`

#### 10.1 Rapid Todo Addition

**File:** `tests/edge-cases/rapid-todo-addition.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Quickly add 10 todos in succession by typing and pressing Enter

**Expected Results:**
- All 10 todos are added successfully
- Each has a unique ID
- Counter shows "10 items left"
- All todos appear in order of creation
- No duplicates or missing todos

#### 10.2 Toggle All with Large Number of Todos

**File:** `tests/edge-cases/toggle-all-many-todos.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add 20 todos
3. Click toggle all to complete all
4. Click toggle all to uncomplete all

**Expected Results:**
- All 20 todos are toggled simultaneously
- Counter updates correctly (0 items left, then 20 items left)
- No performance issues or delays
- UI remains responsive

#### 10.3 Edit Todo Immediately After Adding

**File:** `tests/edge-cases/edit-immediately-after-add.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add a todo "New task"
3. Immediately double-click to edit it
4. Change to "Edited task"
5. Press Enter

**Expected Results:**
- Todo enters edit mode successfully
- Edit is saved correctly
- Todo displays "Edited task"
- No state conflicts or errors

#### 10.4 Delete Todo While in Edit Mode (via other means)

**File:** `tests/edge-cases/interaction-during-edit.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add two todos: "First", "Second"
3. Double-click "First" to enter edit mode
4. Hover and click delete button on "First" (if accessible during edit)

**Expected Results:**
- Edit mode behavior should be consistent
- Either: delete is prevented while editing, or edit cancels and todo is deleted
- Application remains in stable state

#### 10.5 Complete All Then Add New Todo

**File:** `tests/edge-cases/add-after-complete-all.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add three todos
3. Mark all complete using toggle all
4. Add a new todo "New task"

**Expected Results:**
- New todo is added as active (unchecked)
- Counter updates to "1 item left"
- Toggle all checkbox becomes unchecked (not all todos complete)
- New todo appears in list

#### 10.6 Filter Navigation with Keyboard

**File:** `tests/edge-cases/filter-navigation-keyboard.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add two active and one completed todo
3. Use Tab key to navigate to "Active" filter link
4. Press Enter to activate filter
5. Use Tab to navigate to "Completed" filter
6. Press Enter to activate filter

**Expected Results:**
- Filter links are keyboard accessible
- Enter key activates the focused filter
- Filtered view updates correctly
- URL changes appropriately

#### 10.7 Clear Completed with Mixed Filter View

**File:** `tests/edge-cases/clear-completed-mixed-filter.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add four todos, complete two
3. Switch to "Active" filter
4. Click "Clear completed" button

**Expected Results:**
- Completed todos are cleared even though not visible in current filter
- Active filter view remains unchanged (still showing active todos)
- Counter updates if needed
- "Clear completed" button disappears

#### 10.8 Edit Todo Text to Same Value

**File:** `tests/edge-cases/edit-to-same-value.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add a todo "Unchanged"
3. Double-click to edit
4. Keep text as "Unchanged"
5. Press Enter

**Expected Results:**
- Todo text remains "Unchanged"
- Edit mode exits normally
- No duplicate or additional changes
- State is identical to before edit

#### 10.9 Multiple Concurrent Edits (Simulate)

**File:** `tests/edge-cases/sequential-edits.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add three todos
3. Double-click first todo, change text, press Enter
4. Immediately double-click second todo, change text, press Enter
5. Immediately double-click third todo, change text, press Enter

**Expected Results:**
- Each edit completes successfully
- Only one todo is in edit mode at a time
- All changes are saved correctly
- No state conflicts

#### 10.10 URL Manipulation for Invalid Filter

**File:** `tests/edge-cases/invalid-filter-url.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add some todos
3. Navigate to /invalid-filter URL

**Expected Results:**
- Application handles gracefully (shows all todos or 404)
- No crashes or errors
- Filter links remain functional
- Application state is preserved

#### 10.11 Todo with Very Long Text Display

**File:** `tests/edge-cases/long-text-display.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add a todo with 500 characters of text
3. Verify display
4. Double-click to edit
5. Verify edit input displays full text

**Expected Results:**
- Long text is handled gracefully
- UI remains usable (text wraps or scrolls)
- Edit input shows full text
- Todo can be edited and saved

#### 10.12 Empty State After Clearing All

**File:** `tests/edge-cases/return-to-empty-state.spec.ts`

**Steps:**
1. Navigate to the application root URL (/)
2. Add multiple todos
3. Complete some, leave some active
4. Delete all todos one by one

**Expected Results:**
- After last deletion, application returns to empty state
- All controls (toggle all, footer, filters) disappear
- Only the input field and header remain
- Application is ready to add new todos

## Test Data Considerations

### Valid Test Data
- Short todos: "Buy milk"
- Medium todos: "Complete quarterly report"
- Long todos: 200+ characters
- Special characters: "@ # $ % & * ( ) - _ + = [ ] { } | \ : ; ' \" < > , . ? /"
- Numbers: "Task 123"
- Unicode: "完成作業", "Tâche à faire"
- Mixed case: "URGENT task"

### Invalid Test Data
- Empty string: ""
- Whitespace only: "   ", "\t", "\n"
- Very long text: 1000+ characters (test boundary)

### State Combinations
- All active todos
- All completed todos
- Mix of active and completed
- Empty list
- Single todo
- Large number of todos (20+)

## Browser and Device Coverage

While not explicitly tested in this plan, the following should be considered for comprehensive testing:

- **Browsers**: Chrome, Firefox, Safari, Edge
- **Devices**: Desktop, tablet, mobile
- **Viewports**: Various screen sizes
- **Accessibility**: Screen reader compatibility, keyboard navigation
- **Performance**: Large todo lists (100+ items)

## Testing Notes

### Test Independence
- Each test should start from a clean state (empty todo list)
- Tests should not depend on execution order
- LocalStorage should be cleared before each test
- Seed file ensures fresh state for each test

### Automation Considerations
- Use data-testid attributes or stable selectors
- Wait for animations/transitions to complete
- Verify both visual state and data state
- Test localStorage directly where relevant
- Verify URL changes for routing tests

### Known Behaviors
- Empty/whitespace todos are trimmed and rejected
- Editing a todo to empty string deletes it
- Counter always shows total active todos (not filtered count)
- Toggle all switches all todos to opposite of "all complete" state
- Filters use URL routing (/, /active, /completed)
- LocalStorage persists entire todos array
- Todo IDs are generated using Date.now().toString()

## Success Criteria

A test scenario passes when:
1. All steps execute without errors
2. All expected results are achieved
3. Application state is correct
4. No console errors appear
5. UI updates are reflected immediately
6. Data persistence works as expected (where applicable)

## Failure Indicators

A test scenario fails when:
1. Any expected result is not achieved
2. Console errors occur
3. Application crashes or becomes unresponsive
4. Data is lost or corrupted
5. UI does not update or updates incorrectly
6. Validation fails to prevent invalid input
7. Routing fails to work correctly

---

**Total Test Scenarios**: 73 individual test cases organized into 10 major categories
**Estimated Test Execution Time**: ~2-3 hours for full manual execution, ~15-30 minutes automated
**Last Updated**: 2025-11-03
