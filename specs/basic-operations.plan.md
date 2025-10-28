# TodoMVC Application - Basic Operations Test Plan

## Application Overview

The TodoMVC application is a React-based todo list manager built with TypeScript and Vite. It provides comprehensive task management functionality with the following key features:

- **Task Management**: Add, edit, complete, and delete individual todos
- **Bulk Operations**: Mark all todos as complete/incomplete and clear all completed todos
- **Filtering**: View todos by All, Active, or Completed status with URL routing
- **URL Routing**: Direct navigation to filtered views (`/`, `/active`, `/completed`)
- **Counter Display**: Real-time count of active (incomplete) todos with proper pluralization
- **Input Validation**: Prevents empty or whitespace-only todos from being added
- **Persistence**: Automatic localStorage integration to persist todos across sessions
- **Edit Mode**: Double-click to edit todo text inline with Enter to save and Escape to cancel
- **Responsive Design**: Classic TodoMVC styling with hover effects and visual feedback

## Test Scenarios

### 1. Adding New Todos

**Seed:** `tests/seed.spec.ts`

#### 1.1 Add Single Valid Todo

**File:** `tests/adding-new-todos/add-single-valid-todo.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Click in the "What needs to be done?" input field
3. Type "Buy groceries"
4. Press Enter key

**Expected Results:**
- Todo appears in the list with an unchecked checkbox
- Counter shows "1 item left"
- Input field is cleared and ready for next entry
- Todo list controls become visible (toggle-all checkbox and label)
- Footer section appears with filter links and counter

#### 1.2 Add Multiple Todos

**File:** `tests/adding-new-todos/add-multiple-todos.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Type "First task" and press Enter
3. Type "Second task" and press Enter
4. Type "Third task" and press Enter

**Expected Results:**
- All three todos appear in the list in order of creation
- Counter shows "3 items left"
- Input field is cleared after each entry
- All todos have unchecked checkboxes

#### 1.3 Reject Empty Todo

**File:** `tests/adding-new-todos/reject-empty-todo.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Click in the input field
3. Press Enter without typing any text

**Expected Results:**
- No todo is added to the list
- Input field remains empty
- No todo list controls or footer appear
- Application remains in empty state

#### 1.4 Reject Whitespace-Only Todo

**File:** `tests/adding-new-todos/reject-whitespace-only-todo.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Type several spaces (e.g., "     ")
3. Press Enter

**Expected Results:**
- No todo is added to the list
- Input field is cleared
- No todo list controls or footer appear
- Application remains in empty state

#### 1.5 Add Todo with Leading/Trailing Whitespace

**File:** `tests/adding-new-todos/add-todo-trim-whitespace.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Type "   Todo with spaces   " (with leading and trailing spaces)
3. Press Enter

**Expected Results:**
- Todo is added with trimmed text: "Todo with spaces"
- No leading or trailing whitespace visible in the todo text
- Counter shows "1 item left"

#### 1.6 Add Todo with Special Characters

**File:** `tests/adding-new-todos/add-todo-special-characters.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Type "Buy @groceries & cook dinner! 🍕"
3. Press Enter

**Expected Results:**
- Todo appears with all special characters and emoji intact
- Text displays correctly: "Buy @groceries & cook dinner! 🍕"
- Counter shows "1 item left"

### 2. Completing and Uncompleting Todos

**Seed:** `tests/seed.spec.ts`

#### 2.1 Complete Single Todo

**File:** `tests/completing-todos/complete-single-todo.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add a todo "Complete me"
3. Click the checkbox next to the todo

**Expected Results:**
- Checkbox becomes checked
- Todo text gets strikethrough styling (completed class)
- Counter changes from "1 item left" to "0 items left"
- "Clear completed" button appears in footer

#### 2.2 Uncomplete Completed Todo

**File:** `tests/completing-todos/uncomplete-todo.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add a todo "Toggle me"
3. Click the checkbox to complete it
4. Click the checkbox again to uncomplete it

**Expected Results:**
- Checkbox becomes unchecked
- Todo text loses strikethrough styling
- Counter changes back to "1 item left"
- "Clear completed" button disappears from footer

#### 2.3 Complete Multiple Todos

**File:** `tests/completing-todos/complete-multiple-todos.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add three todos: "Task 1", "Task 2", "Task 3"
3. Click checkboxes for "Task 1" and "Task 3"

**Expected Results:**
- "Task 1" and "Task 3" have checked checkboxes and strikethrough
- "Task 2" remains unchecked without strikethrough
- Counter shows "1 item left"
- "Clear completed" button appears

#### 2.4 Complete All Todos

**File:** `tests/completing-todos/complete-all-todos.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add three todos: "Task A", "Task B", "Task C"
3. Complete all three todos individually

**Expected Results:**
- All todos have checked checkboxes and strikethrough styling
- Counter shows "0 items left"
- "Clear completed" button appears
- Toggle-all checkbox is automatically checked

### 3. Toggle All Functionality

**Seed:** `tests/seed.spec.ts`

#### 3.1 Mark All as Complete

**File:** `tests/toggle-all/mark-all-complete.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add three todos: "Task 1", "Task 2", "Task 3"
3. Click the toggle-all checkbox (or its label "Mark all as complete")

**Expected Results:**
- Toggle-all checkbox becomes checked
- All todos have checked checkboxes and strikethrough styling
- Counter shows "0 items left"
- "Clear completed" button appears

#### 3.2 Mark All as Incomplete

**File:** `tests/toggle-all/mark-all-incomplete.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add two todos and mark both as complete
3. Click the toggle-all checkbox again

**Expected Results:**
- Toggle-all checkbox becomes unchecked
- All todos have unchecked checkboxes without strikethrough
- Counter shows "2 items left"
- "Clear completed" button disappears

#### 3.3 Toggle All with Mixed States

**File:** `tests/toggle-all/toggle-all-mixed-states.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add three todos
3. Complete only the first todo
4. Click the toggle-all checkbox

**Expected Results:**
- All todos become completed (toggle-all marks all as complete when not all are completed)
- Toggle-all checkbox is checked
- Counter shows "0 items left"
- All todos have strikethrough styling

#### 3.4 Toggle All Checkbox Reflects State

**File:** `tests/toggle-all/toggle-all-reflects-state.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add two todos
3. Manually complete both todos by clicking individual checkboxes

**Expected Results:**
- Toggle-all checkbox automatically becomes checked
- When one todo is uncompleted, toggle-all becomes unchecked

### 4. Deleting Todos

**Seed:** `tests/seed.spec.ts`

#### 4.1 Delete Single Todo

**File:** `tests/deleting-todos/delete-single-todo.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add a todo "Delete me"
3. Hover over the todo to reveal the delete button (×)
4. Click the delete button

**Expected Results:**
- Todo is removed from the list
- Todo list controls and footer disappear
- Application returns to empty state

#### 4.2 Delete One of Multiple Todos

**File:** `tests/deleting-todos/delete-one-of-multiple.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add three todos: "Keep 1", "Delete me", "Keep 2"
3. Delete the second todo

**Expected Results:**
- "Delete me" is removed
- "Keep 1" and "Keep 2" remain in the list
- Counter shows "2 items left"
- Footer and controls remain visible

#### 4.3 Delete Completed Todo

**File:** `tests/deleting-todos/delete-completed-todo.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add two todos: "Active task" and "Completed task"
3. Complete "Completed task"
4. Delete "Completed task"

**Expected Results:**
- "Completed task" is removed
- Counter changes from "1 item left" to "1 item left" (remains same as active count)
- "Clear completed" button disappears
- Only "Active task" remains

#### 4.4 Delete All Todos Individually

**File:** `tests/deleting-todos/delete-all-individually.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add two todos
3. Delete the first todo
4. Delete the second todo

**Expected Results:**
- After first deletion: one todo remains, counter shows "1 item left"
- After second deletion: application returns to empty state
- All controls and footer disappear

### 5. Editing Todos

**Seed:** `tests/seed.spec.ts`

#### 5.1 Edit Todo Successfully

**File:** `tests/editing-todos/edit-todo-successfully.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add a todo "Original text"
3. Double-click on the todo text
4. Clear the text and type "Updated text"
5. Press Enter

**Expected Results:**
- Todo enters edit mode (input field appears)
- After pressing Enter, todo text changes to "Updated text"
- Edit mode exits, returning to normal view
- Todo maintains its completion state

#### 5.2 Edit Todo with Escape Key

**File:** `tests/editing-todos/edit-todo-cancel-escape.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add a todo "Original text"
3. Double-click on the todo text
4. Type "Changed text"
5. Press Escape key

**Expected Results:**
- Edit mode is cancelled
- Todo text reverts to "Original text"
- Changes are not saved

#### 5.3 Edit Todo with Blur

**File:** `tests/editing-todos/edit-todo-save-on-blur.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add a todo "Original text"
3. Double-click on the todo text
4. Type "New text"
5. Click outside the input field (blur)

**Expected Results:**
- Changes are saved automatically
- Todo text changes to "New text"
- Edit mode exits

#### 5.4 Edit Todo to Empty String Deletes It

**File:** `tests/editing-todos/edit-todo-empty-deletes.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add a todo "Delete by editing"
3. Double-click on the todo text
4. Clear all text (delete all characters)
5. Press Enter

**Expected Results:**
- Todo is deleted from the list
- Application returns to empty state
- No empty todo remains

#### 5.5 Edit Todo with Whitespace Only Deletes It

**File:** `tests/editing-todos/edit-todo-whitespace-deletes.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add a todo "Original text"
3. Double-click to edit
4. Replace text with only spaces "     "
5. Press Enter or blur

**Expected Results:**
- Todo is deleted (treated as empty after trimming)
- Application returns to empty state

#### 5.6 Edit Completed Todo

**File:** `tests/editing-todos/edit-completed-todo.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add a todo "Completed task"
3. Mark it as complete
4. Double-click to edit
5. Change text to "Updated completed task"
6. Press Enter

**Expected Results:**
- Todo text is updated
- Todo remains in completed state (checkbox checked, strikethrough)
- Edit mode exits

### 6. Filtering Todos

**Seed:** `tests/seed.spec.ts`

#### 6.1 Filter Active Todos

**File:** `tests/filtering-todos/filter-active-todos.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add three todos: "Active 1", "Active 2", "Completed 1"
3. Mark "Completed 1" as complete
4. Click the "Active" filter link in the footer

**Expected Results:**
- URL changes to `/active`
- Only "Active 1" and "Active 2" are visible
- "Completed 1" is hidden
- "Active" link has the "selected" class
- Counter still shows "2 items left"

#### 6.2 Filter Completed Todos

**File:** `tests/filtering-todos/filter-completed-todos.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add three todos: "Active 1", "Completed 1", "Completed 2"
3. Mark "Completed 1" and "Completed 2" as complete
4. Click the "Completed" filter link

**Expected Results:**
- URL changes to `/completed`
- Only "Completed 1" and "Completed 2" are visible
- "Active 1" is hidden
- "Completed" link has the "selected" class
- Counter still shows "1 item left"

#### 6.3 Filter All Todos

**File:** `tests/filtering-todos/filter-all-todos.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add and complete some todos
3. Navigate to `/active` filter
4. Click the "All" filter link

**Expected Results:**
- URL changes to `/` or remains at root
- All todos are visible regardless of completion state
- "All" link has the "selected" class

#### 6.4 Direct URL Navigation to Active Filter

**File:** `tests/filtering-todos/direct-url-active.spec.ts`

**Steps:**
1. Navigate directly to `/active` URL
2. Add two todos: "Task 1" and "Task 2"
3. Complete "Task 1"

**Expected Results:**
- Page loads with "Active" filter selected
- Only "Task 2" is visible
- "Task 1" is hidden
- Counter shows "1 item left"

#### 6.5 Direct URL Navigation to Completed Filter

**File:** `tests/filtering-todos/direct-url-completed.spec.ts`

**Steps:**
1. Navigate directly to `/completed` URL
2. No todos exist yet (empty state)

**Expected Results:**
- Page loads with "Completed" filter selected
- No todos are visible (empty todo list area)
- Input field is still available to add todos

#### 6.6 Filter Interaction with Toggle All

**File:** `tests/filtering-todos/filter-with-toggle-all.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add three todos
3. Navigate to "Active" filter
4. Click toggle-all checkbox

**Expected Results:**
- All todos become completed
- Todos disappear from the active filter view
- Counter shows "0 items left"
- Can navigate to "Completed" filter to see all todos

### 7. Clear Completed Functionality

**Seed:** `tests/seed.spec.ts`

#### 7.1 Clear Completed Button Visibility

**File:** `tests/clear-completed/button-visibility.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add a todo "Task 1"
3. Observe footer (no "Clear completed" button)
4. Mark the todo as complete
5. Observe footer again

**Expected Results:**
- Initially, "Clear completed" button is not visible
- After completing a todo, "Clear completed" button appears
- Button is positioned in the footer

#### 7.2 Clear All Completed Todos

**File:** `tests/clear-completed/clear-all-completed.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add three todos: "Active", "Completed 1", "Completed 2"
3. Mark "Completed 1" and "Completed 2" as complete
4. Click "Clear completed" button

**Expected Results:**
- "Completed 1" and "Completed 2" are removed
- "Active" remains in the list
- Counter shows "1 item left"
- "Clear completed" button disappears

#### 7.3 Clear Completed with All Completed

**File:** `tests/clear-completed/clear-all-when-all-completed.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add two todos
3. Mark both as complete
4. Click "Clear completed" button

**Expected Results:**
- All todos are removed
- Application returns to empty state
- Footer and controls disappear
- Only the input field remains

#### 7.4 Clear Completed in Completed Filter

**File:** `tests/clear-completed/clear-in-completed-filter.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add and complete three todos
3. Navigate to "Completed" filter
4. Click "Clear completed" button

**Expected Results:**
- All completed todos are removed
- Completed filter view becomes empty
- Application shows no todos in the filtered view
- Can navigate back to "All" to confirm todos are gone

### 8. Counter Display

**Seed:** `tests/seed.spec.ts`

#### 8.1 Counter Singular Form

**File:** `tests/counter/counter-singular.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add one todo
3. Observe the counter

**Expected Results:**
- Counter displays "1 item left" (singular "item")

#### 8.2 Counter Plural Form

**File:** `tests/counter/counter-plural.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add two todos
3. Observe the counter

**Expected Results:**
- Counter displays "2 items left" (plural "items")

#### 8.3 Counter Updates on Completion

**File:** `tests/counter/counter-updates-on-completion.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add three todos
3. Complete one todo
4. Complete another todo

**Expected Results:**
- Initially: "3 items left"
- After first completion: "2 items left"
- After second completion: "1 item left"
- Counter only counts active (incomplete) todos

#### 8.4 Counter Zero Items

**File:** `tests/counter/counter-zero-items.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add two todos
3. Mark both as complete

**Expected Results:**
- Counter displays "0 items left"
- Footer remains visible with filters and "Clear completed" button

### 9. Persistence (LocalStorage)

**Seed:** `tests/seed.spec.ts`

#### 9.1 Todos Persist After Reload

**File:** `tests/persistence/todos-persist-after-reload.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add three todos: "Task 1", "Task 2", "Task 3"
3. Complete "Task 2"
4. Reload the page

**Expected Results:**
- All three todos are still present after reload
- "Task 2" is still marked as complete
- "Task 1" and "Task 3" remain active
- Counter shows "2 items left"

#### 9.2 Empty State Persists

**File:** `tests/persistence/empty-state-persists.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add a todo
3. Delete the todo
4. Reload the page

**Expected Results:**
- Application loads in empty state
- No todos are visible
- Footer and controls are not visible

#### 9.3 Filter State After Reload

**File:** `tests/persistence/filter-state-after-reload.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add and complete some todos
3. Navigate to `/active` filter
4. Reload the page

**Expected Results:**
- Page reloads with active filter still selected
- Only active todos are visible
- URL remains `/active`

#### 9.4 Edits Persist After Reload

**File:** `tests/persistence/edits-persist-after-reload.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add a todo "Original"
3. Edit it to "Modified"
4. Reload the page

**Expected Results:**
- Todo shows "Modified" text after reload
- Edit is persisted in localStorage

### 10. UI Visibility and Layout

**Seed:** `tests/seed.spec.ts`

#### 10.1 Empty State Layout

**File:** `tests/ui-visibility/empty-state-layout.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Observe the initial state

**Expected Results:**
- "todos" heading is visible
- Input field with placeholder "What needs to be done?" is visible
- No toggle-all checkbox or label is visible
- No todo list is visible
- No footer is visible

#### 10.2 Controls Appear with First Todo

**File:** `tests/ui-visibility/controls-appear-with-first-todo.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add one todo

**Expected Results:**
- Toggle-all checkbox and label appear
- Todo list section appears
- Footer appears with filters and counter
- All controls become visible

#### 10.3 Controls Disappear When Last Todo Removed

**File:** `tests/ui-visibility/controls-disappear-when-empty.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add one todo
3. Delete the todo

**Expected Results:**
- Toggle-all checkbox and label disappear
- Todo list section disappears
- Footer disappears
- Application returns to empty state appearance

#### 10.4 Delete Button Hover State

**File:** `tests/ui-visibility/delete-button-hover.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add a todo
3. Hover over the todo item
4. Move cursor away

**Expected Results:**
- Delete button (×) becomes visible on hover
- Delete button styling/visibility changes with hover state
- Button returns to default state when not hovering

### 11. Edge Cases and Error Handling

**Seed:** `tests/seed.spec.ts`

#### 11.1 Very Long Todo Text

**File:** `tests/edge-cases/very-long-todo-text.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Type a very long string (500+ characters)
3. Press Enter

**Expected Results:**
- Todo is added successfully
- Text is displayed (may wrap or truncate based on CSS)
- No errors or UI breaking
- Todo can still be edited and deleted

#### 11.2 Rapid Todo Addition

**File:** `tests/edge-cases/rapid-todo-addition.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Quickly type and submit 10 todos in rapid succession

**Expected Results:**
- All 10 todos are added successfully
- Each has a unique ID (timestamp-based)
- Counter shows "10 items left"
- No duplicate todos or lost entries

#### 11.3 Toggle During Edit Mode

**File:** `tests/edge-cases/toggle-during-edit.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add a todo "Test task"
3. Double-click to enter edit mode
4. While in edit mode, try to click the checkbox

**Expected Results:**
- Behavior should be predictable (either toggle is disabled during edit, or edit mode exits first)
- No conflicting state or UI issues

#### 11.4 Delete During Edit Mode

**File:** `tests/edge-cases/delete-during-edit.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add a todo "Delete me"
3. Double-click to enter edit mode
4. Click the delete button while in edit mode

**Expected Results:**
- Todo is deleted
- No orphaned edit state
- List updates correctly

#### 11.5 Multiple Todos with Same Text

**File:** `tests/edge-cases/duplicate-todo-text.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add "Same text"
3. Add "Same text" again
4. Add "Same text" a third time

**Expected Results:**
- All three todos are added as separate items
- Each has a unique ID
- All can be independently toggled, edited, and deleted
- No confusion or merging of todos

#### 11.6 Filter with No Matching Todos

**File:** `tests/edge-cases/filter-no-matching.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add two todos without completing them
3. Navigate to "Completed" filter

**Expected Results:**
- Empty todo list is shown
- Footer still visible with filters
- Counter shows "2 items left" (active count)
- Can still add new todos while in this filter

#### 11.7 URL Navigation to Invalid Filter

**File:** `tests/edge-cases/invalid-filter-url.spec.ts`

**Steps:**
1. Navigate directly to `/invalidfilter` or `/xyz`

**Expected Results:**
- Application loads (routing should handle gracefully)
- Defaults to showing all todos or shows appropriate error
- No application crash

#### 11.8 Edit Todo to Same Text

**File:** `tests/edge-cases/edit-to-same-text.spec.ts`

**Steps:**
1. Navigate to the application home page
2. Add a todo "Unchanged"
3. Double-click to edit
4. Keep the same text "Unchanged"
5. Press Enter

**Expected Results:**
- Todo remains with same text
- No unnecessary state updates
- Edit mode exits normally

## Test Execution Notes

### Prerequisites
- Application must be built: `npm run build`
- Test server must be running: `npm run preview`
- Browser automation tools must be configured

### Test Data Assumptions
- All tests assume starting with a clean slate (no existing todos in localStorage)
- Each test should clear localStorage before execution or use isolated browser contexts
- Tests should be independent and runnable in any order

### Browser Compatibility
- Tests should run in modern browsers (Chrome, Firefox, Safari, Edge)
- Focus on Chromium-based testing as primary target

### Accessibility Considerations
- Verify keyboard navigation works (Tab, Enter, Escape)
- Ensure screen reader compatibility for interactive elements
- Test focus management during edit mode

### Performance Considerations
- Test with large numbers of todos (100+) to verify performance
- Verify localStorage limits are not exceeded
- Check for memory leaks with repeated add/delete operations

## Success Criteria

A test scenario passes when:
- All steps execute without errors
- Expected results match actual outcomes
- No visual or functional regressions occur
- Application state remains consistent
- No console errors are generated

A test scenario fails when:
- Any expected result does not match actual behavior
- Application crashes or becomes unresponsive
- Data loss or corruption occurs
- Unexpected errors appear in console
- UI breaks or becomes unusable

## Coverage Summary

This test plan provides comprehensive coverage of:
- ✅ **Input validation** (empty, whitespace, special characters)
- ✅ **CRUD operations** (Create, Read, Update, Delete)
- ✅ **State management** (completion toggling, bulk operations)
- ✅ **Filtering and routing** (URL-based navigation)
- ✅ **Persistence** (localStorage integration)
- ✅ **UI/UX** (visibility, hover states, layout)
- ✅ **Edge cases** (long text, duplicates, rapid operations)
- ✅ **Counter accuracy** (singular/plural, updates)
- ✅ **Edit mode** (save, cancel, delete behaviors)

**Total Test Scenarios: 61 individual test cases organized into 11 functional categories**
