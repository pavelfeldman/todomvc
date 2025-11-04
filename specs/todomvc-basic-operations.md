# TodoMVC Application - Comprehensive Test Plan

## Application Overview

The TodoMVC application is a React-based todo list manager that provides comprehensive task management functionality. The application features:

- **Task Management**: Add, edit, complete, and delete individual todos
- **Bulk Operations**: Mark all todos as complete/incomplete and clear all completed todos at once
- **Filtering**: View todos by All, Active, or Completed status with URL routing support
- **URL Routing**: Support for direct navigation to filtered views via URLs (/, /active, /completed)
- **Counter Display**: Real-time count of active (incomplete) todos
- **Edit Functionality**: In-place editing of todos with save and cancel options
- **Delete Functionality**: Remove individual todos via delete button
- **Persistence**: State maintained in localStorage across browser sessions
- **Visual Feedback**: Interactive UI elements that respond to user actions

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
- Counter displays "1 item left"
- Input field is cleared and ready for next entry
- Todo list controls become visible (Mark all as complete checkbox)
- Footer with filter links (All, Active, Completed) appears

#### 1.2 Add Multiple Todos

**File:** `tests/adding-new-todos/add-multiple-todos.spec.ts`

**Steps:**
1. Click in the "What needs to be done?" input field
2. Type "Buy groceries" and press Enter
3. Type "Walk the dog" and press Enter
4. Type "Read a book" and press Enter

**Expected Results:**
- All three todos appear in the list in the order they were added
- Counter displays "3 items left"
- Each todo has an unchecked checkbox
- Input field is cleared after each entry

#### 1.3 Add Todo with Leading/Trailing Whitespace

**File:** `tests/adding-new-todos/add-todo-with-whitespace.spec.ts`

**Steps:**
1. Click in the "What needs to be done?" input field
2. Type "   Todo with spaces   " (with leading and trailing spaces)
3. Press Enter key

**Expected Results:**
- Todo is added with trimmed text (whitespace removed from both ends)
- Counter increments appropriately
- Input field is cleared

#### 1.4 Attempt to Add Empty Todo

**File:** `tests/adding-new-todos/add-empty-todo.spec.ts`

**Steps:**
1. Click in the "What needs to be done?" input field
2. Leave the field empty
3. Press Enter key

**Expected Results:**
- No todo is added to the list
- Counter remains unchanged
- Input field remains empty and focused

#### 1.5 Attempt to Add Todo with Only Whitespace

**File:** `tests/adding-new-todos/add-whitespace-only-todo.spec.ts`

**Steps:**
1. Click in the "What needs to be done?" input field
2. Type "   " (only spaces)
3. Press Enter key

**Expected Results:**
- No todo is added to the list
- Counter remains unchanged
- Input field is cleared

#### 1.6 Add Todo with Special Characters

**File:** `tests/adding-new-todos/add-todo-with-special-characters.spec.ts`

**Steps:**
1. Click in the "What needs to be done?" input field
2. Type "Buy @groceries #food & drinks!"
3. Press Enter key

**Expected Results:**
- Todo is added with all special characters preserved
- Todo displays correctly with special characters
- Counter increments to "1 item left"

#### 1.7 Add Long Todo Text

**File:** `tests/adding-new-todos/add-long-todo.spec.ts`

**Steps:**
1. Click in the "What needs to be done?" input field
2. Type a long text string (e.g., "This is a very long todo item that contains a lot of text to test how the application handles lengthy todo descriptions and whether it truncates or wraps the text properly")
3. Press Enter key

**Expected Results:**
- Todo is added successfully
- Long text is displayed (either wrapped or truncated based on design)
- Counter increments appropriately
- Todo remains functional (can be completed, edited, deleted)

---

### 2. Editing Todos

**Seed:** `tests/seed.spec.ts`

#### 2.1 Edit Todo Successfully

**File:** `tests/editing-todos/edit-todo-successfully.spec.ts`

**Steps:**
1. Add a todo "Buy groceries"
2. Double-click on the todo text "Buy groceries"
3. Clear the text and type "Buy organic groceries"
4. Press Enter key

**Expected Results:**
- Todo enters edit mode showing a text input with current text
- After pressing Enter, todo text updates to "Buy organic groceries"
- Todo exits edit mode and displays new text
- Counter remains unchanged
- Todo completion status is preserved

#### 2.2 Cancel Edit with Escape Key

**File:** `tests/editing-todos/cancel-edit-with-escape.spec.ts`

**Steps:**
1. Add a todo "Buy groceries"
2. Double-click on the todo text
3. Modify the text to "Buy organic groceries"
4. Press Escape key

**Expected Results:**
- Todo exits edit mode
- Original text "Buy groceries" is preserved
- Changes are discarded
- Todo remains in its original state

#### 2.3 Cancel Edit by Clicking Away

**File:** `tests/editing-todos/cancel-edit-by-blur.spec.ts`

**Steps:**
1. Add two todos: "Buy groceries" and "Walk the dog"
2. Double-click on "Buy groceries" to enter edit mode
3. Modify the text to "Buy organic groceries"
4. Click outside the edit field (e.g., on another todo or empty space)

**Expected Results:**
- Todo saves the changes and exits edit mode
- Text updates to "Buy organic groceries"
- Changes are persisted

#### 2.4 Edit Todo to Empty String

**File:** `tests/editing-todos/edit-todo-to-empty.spec.ts`

**Steps:**
1. Add a todo "Buy groceries"
2. Double-click on the todo text
3. Select all text and delete it (leaving empty)
4. Press Enter key

**Expected Results:**
- Todo is removed from the list (editing to empty deletes the todo)
- Counter decrements appropriately
- If this was the last todo, footer controls disappear

#### 2.5 Edit Completed Todo

**File:** `tests/editing-todos/edit-completed-todo.spec.ts`

**Steps:**
1. Add a todo "Buy groceries"
2. Click the checkbox to mark it as completed
3. Double-click on the todo text
4. Change text to "Already bought groceries"
5. Press Enter key

**Expected Results:**
- Todo enters edit mode even though it's completed
- Text updates to "Already bought groceries"
- Todo remains in completed state
- Completed styling (strikethrough) is reapplied after edit

#### 2.6 Edit Todo While in Active Filter

**File:** `tests/editing-todos/edit-todo-in-active-filter.spec.ts`

**Steps:**
1. Add a todo "Buy groceries"
2. Click on the "Active" filter link
3. Double-click on the todo text
4. Change text to "Buy organic groceries"
5. Press Enter key

**Expected Results:**
- Todo can be edited while in Active filter view
- Text updates successfully
- Todo remains visible in Active filter
- Edit functionality works identically to All view

---

### 3. Toggling Todo Completion

**Seed:** `tests/seed.spec.ts`

#### 3.1 Mark Single Todo as Complete

**File:** `tests/toggling-completion/mark-single-todo-complete.spec.ts`

**Steps:**
1. Add a todo "Buy groceries"
2. Click the checkbox next to the todo

**Expected Results:**
- Checkbox becomes checked
- Todo text displays with strikethrough styling
- Counter changes from "1 item left" to "0 items left"
- "Clear completed" button appears in the footer

#### 3.2 Mark Multiple Todos as Complete

**File:** `tests/toggling-completion/mark-multiple-todos-complete.spec.ts`

**Steps:**
1. Add three todos: "Buy groceries", "Walk the dog", "Read a book"
2. Click the checkbox next to "Buy groceries"
3. Click the checkbox next to "Read a book"

**Expected Results:**
- Both checked todos display with strikethrough styling
- Counter displays "1 item left"
- "Clear completed" button appears
- "Walk the dog" remains active (unchecked)

#### 3.3 Unmark Completed Todo

**File:** `tests/toggling-completion/unmark-completed-todo.spec.ts`

**Steps:**
1. Add a todo "Buy groceries"
2. Click the checkbox to mark it complete
3. Click the checkbox again to unmark it

**Expected Results:**
- Checkbox becomes unchecked
- Strikethrough styling is removed
- Counter returns to "1 item left"
- "Clear completed" button disappears if no other completed todos exist

#### 3.4 Toggle Todo Completion Multiple Times

**File:** `tests/toggling-completion/toggle-multiple-times.spec.ts`

**Steps:**
1. Add a todo "Buy groceries"
2. Click checkbox to complete
3. Click checkbox to uncomplete
4. Click checkbox to complete again
5. Click checkbox to uncomplete again

**Expected Results:**
- Todo toggles between completed and active states correctly each time
- Counter updates appropriately with each toggle
- Visual styling updates consistently
- No errors or inconsistent states occur

---

### 4. Deleting Todos

**Seed:** `tests/seed.spec.ts`

#### 4.1 Delete Single Active Todo

**File:** `tests/deleting-todos/delete-single-active-todo.spec.ts`

**Steps:**
1. Add a todo "Buy groceries"
2. Hover over the todo to reveal the delete button (×)
3. Click the delete button

**Expected Results:**
- Todo is removed from the list
- Counter updates to show 0 items
- Footer controls disappear (no todos remain)
- Main section becomes hidden

#### 4.2 Delete Single Completed Todo

**File:** `tests/deleting-todos/delete-single-completed-todo.spec.ts`

**Steps:**
1. Add a todo "Buy groceries"
2. Click the checkbox to mark it complete
3. Hover over the todo to reveal the delete button
4. Click the delete button

**Expected Results:**
- Completed todo is removed from the list
- Counter updates appropriately
- "Clear completed" button disappears
- Main section becomes hidden if no todos remain

#### 4.3 Delete Middle Todo from Multiple Todos

**File:** `tests/deleting-todos/delete-middle-todo.spec.ts`

**Steps:**
1. Add three todos: "Buy groceries", "Walk the dog", "Read a book"
2. Hover over "Walk the dog" (middle todo)
3. Click the delete button for "Walk the dog"

**Expected Results:**
- "Walk the dog" is removed
- "Buy groceries" and "Read a book" remain in correct order
- Counter changes from "3 items left" to "2 items left"
- Other todos remain unaffected

#### 4.4 Delete Last Remaining Todo

**File:** `tests/deleting-todos/delete-last-todo.spec.ts`

**Steps:**
1. Add a todo "Buy groceries"
2. Hover over the todo
3. Click the delete button

**Expected Results:**
- Todo is removed
- Empty state is displayed (only input field visible)
- Footer controls disappear
- Main section becomes hidden
- No counter is visible

#### 4.5 Delete Todo While in Filtered View

**File:** `tests/deleting-todos/delete-todo-in-filtered-view.spec.ts`

**Steps:**
1. Add three todos: "Buy groceries", "Walk the dog", "Read a book"
2. Mark "Buy groceries" as complete
3. Click on "Active" filter
4. Hover over "Walk the dog"
5. Click the delete button

**Expected Results:**
- "Walk the dog" is removed
- Only "Read a book" remains visible in Active view
- Counter updates to "1 item left"
- Todo is also removed from All view

---

### 5. Mark All as Complete/Incomplete

**Seed:** `tests/seed.spec.ts`

#### 5.1 Mark All Todos as Complete

**File:** `tests/mark-all/mark-all-complete.spec.ts`

**Steps:**
1. Add three todos: "Buy groceries", "Walk the dog", "Read a book"
2. Click the "Mark all as complete" checkbox (❯ icon)

**Expected Results:**
- All three todos are marked as complete
- All checkboxes become checked
- All todos display with strikethrough styling
- Counter displays "0 items left"
- "Clear completed" button appears
- "Mark all as complete" checkbox becomes checked

#### 5.2 Mark All Todos as Incomplete

**File:** `tests/mark-all/mark-all-incomplete.spec.ts`

**Steps:**
1. Add three todos: "Buy groceries", "Walk the dog", "Read a book"
2. Click the "Mark all as complete" checkbox to mark all complete
3. Click the "Mark all as complete" checkbox again to unmark all

**Expected Results:**
- All three todos are marked as incomplete
- All checkboxes become unchecked
- Strikethrough styling is removed from all todos
- Counter displays "3 items left"
- "Clear completed" button disappears
- "Mark all as complete" checkbox becomes unchecked

#### 5.3 Mark All with Mixed States

**File:** `tests/mark-all/mark-all-with-mixed-states.spec.ts`

**Steps:**
1. Add three todos: "Buy groceries", "Walk the dog", "Read a book"
2. Mark "Buy groceries" as complete individually
3. Click the "Mark all as complete" checkbox

**Expected Results:**
- All todos (including already completed ones) are marked as complete
- Counter displays "0 items left"
- "Mark all as complete" checkbox is checked
- All todos show completed styling

#### 5.4 Mark All as Complete Then Delete One

**File:** `tests/mark-all/mark-all-then-delete.spec.ts`

**Steps:**
1. Add three todos: "Buy groceries", "Walk the dog", "Read a book"
2. Click "Mark all as complete"
3. Hover over "Walk the dog"
4. Click the delete button for "Walk the dog"

**Expected Results:**
- "Walk the dog" is removed
- Remaining two todos stay completed
- Counter remains "0 items left"
- "Mark all as complete" checkbox remains checked
- "Clear completed" button remains visible

#### 5.5 Mark All with Single Todo

**File:** `tests/mark-all/mark-all-single-todo.spec.ts`

**Steps:**
1. Add one todo "Buy groceries"
2. Click the "Mark all as complete" checkbox

**Expected Results:**
- Todo is marked as complete
- Counter displays "0 items left"
- "Clear completed" button appears
- Functionality works identically to multiple todos

---

### 6. Filtering Todos

**Seed:** `tests/seed.spec.ts`

#### 6.1 Filter to Show Active Todos

**File:** `tests/filtering/filter-active-todos.spec.ts`

**Steps:**
1. Add three todos: "Buy groceries", "Walk the dog", "Read a book"
2. Mark "Buy groceries" as complete
3. Click on the "Active" filter link

**Expected Results:**
- URL changes to /active
- Only "Walk the dog" and "Read a book" are displayed
- "Buy groceries" is hidden
- Counter displays "2 items left"
- "Active" link is highlighted/selected
- "Clear completed" button remains visible

#### 6.2 Filter to Show Completed Todos

**File:** `tests/filtering/filter-completed-todos.spec.ts`

**Steps:**
1. Add three todos: "Buy groceries", "Walk the dog", "Read a book"
2. Mark "Buy groceries" and "Walk the dog" as complete
3. Click on the "Completed" filter link

**Expected Results:**
- URL changes to /completed
- Only "Buy groceries" and "Walk the dog" are displayed (with strikethrough)
- "Read a book" is hidden
- Counter still displays "1 item left" (active todos count)
- "Completed" link is highlighted/selected
- "Clear completed" button is visible

#### 6.3 Filter to Show All Todos

**File:** `tests/filtering/filter-all-todos.spec.ts`

**Steps:**
1. Add three todos: "Buy groceries", "Walk the dog", "Read a book"
2. Mark "Buy groceries" as complete
3. Click on the "Active" filter
4. Click on the "All" filter link

**Expected Results:**
- URL changes to /
- All three todos are displayed (completed and active)
- Counter displays "2 items left"
- "All" link is highlighted/selected
- Both completed and active todos are visible

#### 6.4 Navigate Directly to Active Filter URL

**File:** `tests/filtering/direct-url-active.spec.ts`

**Steps:**
1. Add three todos: "Buy groceries", "Walk the dog", "Read a book"
2. Mark "Buy groceries" as complete
3. Navigate directly to URL: http://localhost:3000/active

**Expected Results:**
- Page loads with Active filter applied
- Only active todos are displayed
- "Active" link is highlighted
- Counter is correct
- Application state is maintained

#### 6.5 Navigate Directly to Completed Filter URL

**File:** `tests/filtering/direct-url-completed.spec.ts`

**Steps:**
1. Add three todos: "Buy groceries", "Walk the dog", "Read a book"
2. Mark "Buy groceries" as complete
3. Navigate directly to URL: http://localhost:3000/completed

**Expected Results:**
- Page loads with Completed filter applied
- Only completed todos are displayed
- "Completed" link is highlighted
- Counter shows active todos count
- Application state is maintained

#### 6.6 Navigate Directly to Root URL

**File:** `tests/filtering/direct-url-root.spec.ts`

**Steps:**
1. Add three todos with mixed completion states
2. Navigate to /active
3. Navigate directly to URL: http://localhost:3000/

**Expected Results:**
- Page loads with All filter (default view)
- All todos are displayed
- "All" link is highlighted
- Counter is correct

#### 6.7 Complete Todo While in Active Filter

**File:** `tests/filtering/complete-todo-in-active-filter.spec.ts`

**Steps:**
1. Add two todos: "Buy groceries" and "Walk the dog"
2. Click on "Active" filter
3. Click checkbox for "Buy groceries"

**Expected Results:**
- "Buy groceries" disappears from Active view (now completed)
- Only "Walk the dog" remains visible
- Counter updates to "1 item left"
- Active filter remains selected
- Todo is accessible in All and Completed views

#### 6.8 Uncomplete Todo While in Completed Filter

**File:** `tests/filtering/uncomplete-todo-in-completed-filter.spec.ts`

**Steps:**
1. Add two todos: "Buy groceries" and "Walk the dog"
2. Mark both as complete
3. Click on "Completed" filter
4. Click checkbox for "Buy groceries" to uncomplete it

**Expected Results:**
- "Buy groceries" disappears from Completed view
- Only "Walk the dog" remains visible
- Counter updates to "1 item left"
- Completed filter remains selected
- "Buy groceries" is accessible in All and Active views

---

### 7. Clearing Completed Todos

**Seed:** `tests/seed.spec.ts`

#### 7.1 Clear Single Completed Todo

**File:** `tests/clearing-completed/clear-single-completed.spec.ts`

**Steps:**
1. Add two todos: "Buy groceries" and "Walk the dog"
2. Mark "Buy groceries" as complete
3. Click the "Clear completed" button

**Expected Results:**
- "Buy groceries" is removed from the list
- "Walk the dog" remains visible
- Counter displays "1 item left"
- "Clear completed" button disappears
- Only active todos remain

#### 7.2 Clear Multiple Completed Todos

**File:** `tests/clearing-completed/clear-multiple-completed.spec.ts`

**Steps:**
1. Add four todos: "Buy groceries", "Walk the dog", "Read a book", "Write code"
2. Mark "Buy groceries", "Walk the dog", and "Read a book" as complete
3. Click the "Clear completed" button

**Expected Results:**
- All three completed todos are removed
- Only "Write code" remains visible
- Counter displays "1 item left"
- "Clear completed" button disappears

#### 7.3 Clear All Todos When All Are Completed

**File:** `tests/clearing-completed/clear-all-when-all-completed.spec.ts`

**Steps:**
1. Add three todos: "Buy groceries", "Walk the dog", "Read a book"
2. Click "Mark all as complete"
3. Click the "Clear completed" button

**Expected Results:**
- All todos are removed
- Empty state is displayed (only input field)
- Footer controls disappear
- Main section becomes hidden
- Counter is not visible

#### 7.4 Clear Completed While in Active Filter

**File:** `tests/clearing-completed/clear-completed-in-active-filter.spec.ts`

**Steps:**
1. Add three todos: "Buy groceries", "Walk the dog", "Read a book"
2. Mark "Buy groceries" as complete
3. Click on "Active" filter
4. Click the "Clear completed" button

**Expected Results:**
- Completed todo "Buy groceries" is removed
- Active todos remain visible in Active view
- Counter updates appropriately
- "Clear completed" button disappears
- Application remains in Active filter view

#### 7.5 Clear Completed While in Completed Filter

**File:** `tests/clearing-completed/clear-completed-in-completed-filter.spec.ts`

**Steps:**
1. Add three todos: "Buy groceries", "Walk the dog", "Read a book"
2. Mark "Buy groceries" and "Walk the dog" as complete
3. Click on "Completed" filter
4. Click the "Clear completed" button

**Expected Results:**
- All completed todos disappear from view
- Completed filter shows empty state (no todos)
- Active todos still exist (visible in All/Active views)
- Counter remains accurate for active todos
- "Clear completed" button disappears

---

### 8. Counter Display

**Seed:** `tests/seed.spec.ts`

#### 8.1 Counter with Zero Active Todos

**File:** `tests/counter/counter-zero-active.spec.ts`

**Steps:**
1. Add two todos: "Buy groceries" and "Walk the dog"
2. Mark both as complete

**Expected Results:**
- Counter displays "0 items left"
- Counter uses correct plural form ("items")
- Counter is visible even with 0 active todos

#### 8.2 Counter with One Active Todo

**File:** `tests/counter/counter-one-active.spec.ts`

**Steps:**
1. Add one todo "Buy groceries"

**Expected Results:**
- Counter displays "1 item left"
- Counter uses singular form ("item" not "items")
- Counter updates immediately upon adding todo

#### 8.3 Counter with Multiple Active Todos

**File:** `tests/counter/counter-multiple-active.spec.ts`

**Steps:**
1. Add five todos: "Task 1", "Task 2", "Task 3", "Task 4", "Task 5"

**Expected Results:**
- Counter displays "5 items left"
- Counter uses plural form ("items")
- Counter updates with each added todo

#### 8.4 Counter Updates When Completing Todo

**File:** `tests/counter/counter-updates-on-complete.spec.ts`

**Steps:**
1. Add three todos: "Buy groceries", "Walk the dog", "Read a book"
2. Mark "Buy groceries" as complete

**Expected Results:**
- Counter changes from "3 items left" to "2 items left"
- Counter updates immediately upon clicking checkbox
- Plural form is maintained

#### 8.5 Counter Updates When Uncompleting Todo

**File:** `tests/counter/counter-updates-on-uncomplete.spec.ts`

**Steps:**
1. Add two todos: "Buy groceries" and "Walk the dog"
2. Mark "Buy groceries" as complete
3. Unmark "Buy groceries" by clicking checkbox again

**Expected Results:**
- Counter returns from "1 item left" to "2 items left"
- Counter updates immediately
- Plural form is used

#### 8.6 Counter Updates When Deleting Todo

**File:** `tests/counter/counter-updates-on-delete.spec.ts`

**Steps:**
1. Add three todos: "Buy groceries", "Walk the dog", "Read a book"
2. Hover over "Walk the dog"
3. Click delete button

**Expected Results:**
- Counter changes from "3 items left" to "2 items left"
- Counter updates immediately upon deletion
- Plural form is maintained

#### 8.7 Counter Persists Across Filter Changes

**File:** `tests/counter/counter-persists-across-filters.spec.ts`

**Steps:**
1. Add three todos: "Buy groceries", "Walk the dog", "Read a book"
2. Mark "Buy groceries" as complete
3. Click on "Active" filter
4. Click on "Completed" filter
5. Click on "All" filter

**Expected Results:**
- Counter consistently displays "2 items left" in all views
- Counter always shows count of active (not completed) todos
- Counter is visible in all filter views

---

### 9. Persistence

**Seed:** `tests/seed.spec.ts`

#### 9.1 Persist Todos After Page Reload

**File:** `tests/persistence/persist-todos-after-reload.spec.ts`

**Steps:**
1. Add three todos: "Buy groceries", "Walk the dog", "Read a book"
2. Mark "Buy groceries" as complete
3. Reload the page (F5 or browser refresh)

**Expected Results:**
- All three todos are still present after reload
- "Buy groceries" remains marked as complete
- "Walk the dog" and "Read a book" remain active
- Counter displays "2 items left"
- Todo order is preserved

#### 9.2 Persist After Navigating Away and Back

**File:** `tests/persistence/persist-after-navigation.spec.ts`

**Steps:**
1. Add two todos: "Buy groceries" and "Walk the dog"
2. Navigate to a different website
3. Navigate back to the TodoMVC app

**Expected Results:**
- Both todos are still present
- All todo data is preserved
- Application state is restored

#### 9.3 Persist Filter Selection

**File:** `tests/persistence/persist-filter-selection.spec.ts`

**Steps:**
1. Add three todos with mixed completion states
2. Click on "Active" filter
3. Reload the page

**Expected Results:**
- Page reloads with Active filter still selected
- URL remains /active
- Only active todos are displayed
- Filter selection is restored from URL

#### 9.4 Persist After Clearing All Todos

**File:** `tests/persistence/persist-after-clearing-all.spec.ts`

**Steps:**
1. Add two todos and mark both complete
2. Click "Clear completed" to remove all todos
3. Reload the page

**Expected Results:**
- Page loads with no todos
- Empty state is maintained
- localStorage reflects empty todos list
- New todos can be added normally

#### 9.5 Persist Edited Todo

**File:** `tests/persistence/persist-edited-todo.spec.ts`

**Steps:**
1. Add a todo "Buy groceries"
2. Edit the todo to "Buy organic groceries"
3. Reload the page

**Expected Results:**
- Todo displays as "Buy organic groceries"
- Edited text is persisted
- Original text is not recoverable

---

### 10. Edge Cases and Error Handling

**Seed:** `tests/seed.spec.ts`

#### 10.1 Rapid Todo Addition

**File:** `tests/edge-cases/rapid-todo-addition.spec.ts`

**Steps:**
1. Rapidly add 10 todos by typing and pressing Enter quickly

**Expected Results:**
- All 10 todos are created successfully
- Counter displays "10 items left"
- Todos appear in correct order
- No duplicates or missing todos
- Application remains responsive

#### 10.2 Very Long Todo Text

**File:** `tests/edge-cases/very-long-todo-text.spec.ts`

**Steps:**
1. Add a todo with 500 characters of text
2. Verify it displays correctly
3. Edit the todo
4. Complete the todo
5. Filter the todos

**Expected Results:**
- Long todo is accepted and stored
- Text is displayed (wrapped or truncated per design)
- All operations work normally with long text
- No performance issues or errors

#### 10.3 Special Characters in Todo Text

**File:** `tests/edge-cases/special-characters-comprehensive.spec.ts`

**Steps:**
1. Add todos with various special characters: "<script>alert('xss')</script>", "Test & verify", "Line 1\nLine 2", "🎉 Emoji todo 🎊"
2. Verify each displays correctly
3. Edit and complete them

**Expected Results:**
- All special characters are escaped/sanitized properly
- No script execution occurs (XSS protection)
- Emojis display correctly
- Newlines are handled appropriately
- All todo operations work normally

#### 10.4 Rapid Completion Toggle

**File:** `tests/edge-cases/rapid-completion-toggle.spec.ts`

**Steps:**
1. Add a todo "Buy groceries"
2. Rapidly click the checkbox 10 times in quick succession

**Expected Results:**
- Todo ends in deterministic state (completed or not)
- Counter updates correctly to final state
- No visual glitches or race conditions
- Application remains stable

#### 10.5 Edit Todo to Same Value

**File:** `tests/edge-cases/edit-todo-to-same-value.spec.ts`

**Steps:**
1. Add a todo "Buy groceries"
2. Double-click to edit
3. Press Enter without changing the text

**Expected Results:**
- Todo remains unchanged
- No duplicate is created
- Edit mode exits successfully
- No errors occur

#### 10.6 Multiple Browser Tabs/Windows

**File:** `tests/edge-cases/multiple-tabs-sync.spec.ts`

**Steps:**
1. Open TodoMVC in first tab
2. Add a todo "Buy groceries"
3. Open TodoMVC in second tab/window
4. Add a todo "Walk the dog" in second tab
5. Switch back to first tab and reload

**Expected Results:**
- Both tabs share the same localStorage
- Changes in one tab are reflected in other after reload
- No data conflicts or corruption
- Both todos are visible

#### 10.7 Delete While Editing

**File:** `tests/edge-cases/delete-while-editing.spec.ts`

**Steps:**
1. Add two todos: "Buy groceries" and "Walk the dog"
2. Double-click "Buy groceries" to enter edit mode
3. Hover over the todo to reveal delete button
4. Click delete button while still in edit mode

**Expected Results:**
- Todo is deleted
- Edit mode is cancelled
- No errors occur
- Application remains stable

#### 10.8 Complete All Then Add New Todo

**File:** `tests/edge-cases/complete-all-then-add.spec.ts`

**Steps:**
1. Add three todos
2. Click "Mark all as complete"
3. Add a new todo "New task"

**Expected Results:**
- New todo is added as active (unchecked)
- "Mark all as complete" checkbox becomes unchecked
- Counter updates to "1 item left"
- New todo appears in the list

#### 10.9 Filter with No Matching Todos

**File:** `tests/edge-cases/filter-with-no-matches.spec.ts`

**Steps:**
1. Add three todos: "Buy groceries", "Walk the dog", "Read a book"
2. Mark all as complete
3. Click on "Active" filter

**Expected Results:**
- Empty list is shown in Active view
- Message or empty state indicates no active todos
- Counter shows "0 items left"
- Footer controls remain visible
- Can still add new todos

#### 10.10 Maximum Todo Count Stress Test

**File:** `tests/edge-cases/maximum-todo-count.spec.ts`

**Steps:**
1. Add 100 todos programmatically or through UI
2. Test basic operations (complete, edit, delete, filter)
3. Test "Mark all as complete"
4. Test "Clear completed"

**Expected Results:**
- Application handles 100 todos without performance degradation
- All operations work correctly
- Counter displays correctly ("100 items left", etc.)
- Scrolling works if needed
- No memory leaks or errors

---

## Test Execution Notes

### Prerequisites
- Fresh browser state for each test (clear localStorage)
- Tests should be independent and can run in any order
- Each test starts from the seed file state

### Success Criteria
- All functional requirements are tested
- Edge cases and error conditions are covered
- Tests are repeatable and deterministic
- Clear expected results for each scenario

### Out of Scope
- Cross-browser compatibility testing (handled separately)
- Performance benchmarking (handled separately)
- Accessibility testing (handled separately)
- Mobile responsive testing (handled separately)

### Test Data Conventions
- Use descriptive, realistic todo text
- Vary todo content to avoid accidental pattern matching
- Use consistent test data for easier debugging

### Recommended Test Execution Order
1. Basic operations (add, edit, delete, complete)
2. Bulk operations (mark all, clear completed)
3. Filtering and routing
4. Counter and display
5. Persistence
6. Edge cases and stress tests
