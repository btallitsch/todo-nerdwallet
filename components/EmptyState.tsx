import React from 'react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4 mb-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12 text-gray-400 dark:text-gray-300" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">No tasks yet</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by adding your first task!</p>
    </div>
  );
}