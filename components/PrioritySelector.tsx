'use client';

import React from 'react';
import { Priority } from '../lib/types';

interface PrioritySelectorProps {
  value: Priority;
  onChange: (priority: Priority) => void;
}

export default function PrioritySelector({ value, onChange }: PrioritySelectorProps) {
  const priorities: Priority[] = ['Low', 'Medium', 'High'];
  
  const getPriorityColor = (priority: Priority) => {
    switch(priority) {
      case 'Low': return 'bg-blue-100 text-blue-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
      <div className="flex space-x-2">
        {priorities.map((priority) => (
          <button
            key={priority}
            type="button"
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              value === priority 
                ? `${getPriorityColor(priority)} ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ${
                    priority === 'Low' ? 'ring-blue-500' : 
                    priority === 'Medium' ? 'ring-yellow-500' : 'ring-red-500'
                  }`
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
            onClick={() => onChange(priority)}
          >
            {priority}
          </button>
        ))}
      </div>
    </div>
  );
}