'use client';

import React, { useState } from 'react';
import { Task, Priority } from '../lib/types';
import { useTasks } from '../contexts/TaskContext';
import TaskForm from './TaskForm';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const { toggleComplete, deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getPriorityColor = (priority: Priority) => {
    switch(priority) {
      case 'Low': return 'bg-blue-100 text-blue-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
    setShowDeleteConfirm(false);
  };

  if (isEditing) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <TaskForm
          initialData={{
            id: task.id,
            createdAt: new Date(task.createdAt),
            title: task.title,
            description: task.description,
            priority: task.priority,
            completed: false,
          }}
          isEditing
          onClose={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className={`p-4 bg-white dark:bg-gray-800 rounded-lg shadow border-l-4 
                   ${task.priority === 'Low' ? 'border-blue-500' : 
                     task.priority === 'Medium' ? 'border-yellow-500' : 'border-red-500'}`}>
      
      {showDeleteConfirm ? (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">Are you sure you want to delete this task?</p>
          <div className="flex space-x-2">
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
            >
              Delete
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <div className="flex flex-col">
                <h3 className={`text-lg font-medium ${
                  task.completed 
                    ? 'text-gray-400 dark:text-gray-500 line-through' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {task.title}
                </h3>
                <p>Created on: {task.createdAt}</p>
                {task.description && (
                  <p className={`text-sm mt-1 ${
                    task.completed 
                      ? 'text-gray-400 dark:text-gray-500' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {task.description}
                  </p>
                )}
                <div className="flex items-center mt-2 space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}