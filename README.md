# TodoMVC - React + TypeScript + Vite

A fully functional implementation of the TodoMVC specification built with React, TypeScript, and Vite.

## Features

- **Task Management**: Create, edit, delete, and toggle completion of todos
- **Filtering**: View todos by All, Active, or Completed status with URL routing
- **Bulk Operations**: Mark all todos as complete/incomplete and clear completed todos
- **Real-time Counter**: Display count of active (incomplete) todos
- **Input Validation**: Prevents empty or whitespace-only todos
- **Persistence**: Todos are automatically saved to localStorage
- **Responsive Design**: Classic TodoMVC styling with hover effects

## Usage

### Development
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
```

## Functionality

- **Add Todo**: Type in the input field and press Enter
- **Edit Todo**: Double-click any todo text to edit inline
  - Press Enter to save changes
  - Press Escape to cancel editing
- **Toggle Completion**: Click the checkbox next to any todo
- **Delete Todo**: Hover over a todo and click the × button
- **Mark All**: Use the toggle at the top to mark all todos as complete/incomplete
- **Filter Todos**: Click All, Active, or Completed in the footer
- **Clear Completed**: Click "Clear completed" button when completed todos exist

## URL Routing

- `/` - Shows all todos
- `/active` - Shows only incomplete todos  
- `/completed` - Shows only completed todos

## Technologies

- React 19+ with hooks (useState, useEffect)
- TypeScript for type safety
- React Router for URL-based filtering
- Vite for development and build tooling
- CSS with TodoMVC standard styling
