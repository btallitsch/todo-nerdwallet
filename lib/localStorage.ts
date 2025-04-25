import { Task } from './types';
const STORAGE_KEY = 'nerdwallet-todo-tasks';

// Simulate network delay for a more realistic app feeling
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getTasks = async (): Promise<Task[]> => {
  // Ensure we're on the client side
  if (typeof window === 'undefined') return [];
  
  await delay(300)
  const storedTasks = localStorage.getItem(STORAGE_KEY);
  return storedTasks ? JSON.parse(storedTasks) : [];
};

export const saveTasks = async (tasks: Task[]): Promise<void> => {
  if (typeof window === 'undefined') return;
  
  await delay(300);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};