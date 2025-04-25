'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, TaskContextType } from '@/lib/types';
import { fetchTasks, addTask as addTaskAction, updateTask as updateTaskAction, deleteTask as deleteTaskAction, toggleTaskCompletion } from '@/lib/actions';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const addTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      const newTask = await addTaskAction(task);
      setTasks(prev => [...prev, newTask]);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      await updateTaskAction(task);
      setTasks(prev => prev.map(t => t.id === task.id ? task : t));
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteTaskAction(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const toggleComplete = async (id: string) => {
    try {
      await toggleTaskCompletion(id);
      setTasks(prev => prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleComplete, loading }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};