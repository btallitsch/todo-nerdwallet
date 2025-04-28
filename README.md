# NerdWallet To-Do App

A simple and intuitive To-Do list application built with Next.js 15 and Tailwind CSS.

## Features

- Add tasks with title, description, and priority
- View tasks in a visually appealing list
- Edit and delete tasks
- Mark tasks as completed
- Filter tasks by status (all, active, completed)
- Sort tasks by priority
- Dark mode toggle
- Mobile-responsive design
- Empty state indication
- Data persists in LocalStorage

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Storage**: LocalStorage (simulated async API)
- **State Management**: React Context API
- **Language**: TypeScript

## Architecture Decisions

### LocalStorage with Simulated Server Actions

The app uses LocalStorage for persistence while maintaining a server-action-like API structure. This approach:
- Simulates the real-world async pattern of server communication
- Makes it easy to switch to a real database later
- Maintains the expected Next.js 15 Server Action pattern

### Component Structure

Components are organized by responsibility:
- **TaskContext**: Global state management
- **TaskForm**: Handles task creation and editing
- **TaskList**: Displays and manages filtering/sorting of tasks
- **TaskItem**: Individual task display with edit/delete capabilities
- **PrioritySelector**: Reusable priority selection component
- **EmptyState**: Shown when no tasks exist

### TypeScript Implementation

TypeScript is used throughout the project to provide type safety and improve development experience.

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd nerdwallet-todo-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This project is deployed on Vercel and can be accessed at: [https://todo-nerdwallet.vercel.app/](https://todo-nerdwallet.vercel.app/)
