'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { useTasks } from '../contexts/TaskContext';
import PrioritySelector from './PrioritySelector';
import { Priority } from '../lib/types';

interface TaskFormProps {
  onClose?: () => void;
  initialData?: {
    id: string;
    title: string;
    description: string;
    priority: Priority;
    createdAt: Date;
    completed: false;
  };
  isEditing?: boolean;
}

export default function TaskForm({ onClose, initialData, isEditing = false }: TaskFormProps) {
  const { addTask, updateTask } = useTasks();
  
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState<Priority>(initialData?.priority || 'Medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (isEditing && initialData) {
        await updateTask({
          id: initialData.id,
          title,
          description,
          priority,
          completed: initialData.completed,
          createdAt: format(initialData.createdAt, 'MM/dd/yyyy'),
        });
      } else {
        await addTask({
          title,
          description,
          priority,
          completed: false,
        });
      }
      
      if (!isEditing) {
        setTitle('');
        setDescription('');
        setPriority('Medium');
      }
      
      if (onClose) onClose();
    } catch (error) {
      console.error('Error submitting task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                     focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 
                     dark:placeholder-gray-500 dark:text-white"
          required
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                     focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 
                     dark:placeholder-gray-500 dark:text-white"
        />
      </div>
      
      <PrioritySelector value={priority} onChange={setPriority} />
      
      <div className="flex justify-end space-x-3">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md
                       hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                       dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting || !title.trim()}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? 'Saving...'
            : isEditing
              ? 'Update Task'
              : 'Add Task'}
        </button>
      </div>
    </form>
  );
}