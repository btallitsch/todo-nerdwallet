'use server'

import { Task } from './types';
import { getTasks, saveTasks } from './localStorage';

export async function fetchTasks() {
  return getTasks();
}

export async function addTask(task: Omit<Task, 'id' | 'createdAt'>) {
  const tasks = await getTasks();
  const newTask: Task = {
    ...task,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  
  await saveTasks([...tasks, newTask]);
  return newTask;
}

export async function updateTask(updatedTask: Task) {
  const tasks = await getTasks();
  const updatedTasks = tasks.map(task => 
    task.id === updatedTask.id ? updatedTask : task
  );
  
  await saveTasks(updatedTasks);
  return updatedTask;
}

export async function deleteTask(id: string) {
  const tasks = await getTasks();
  const updatedTasks = tasks.filter(task => task.id !== id);
  
  await saveTasks(updatedTasks);
  return id;
}

export async function toggleTaskCompletion(id: string) {
  const tasks = await getTasks();
  const updatedTasks = tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  
  await saveTasks(updatedTasks);
  return id;
}