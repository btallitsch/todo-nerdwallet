import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { TaskProvider } from '@/contexts/TaskContext';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'To-Do App | NerdWallet',
  description: 'A simple and intuitive to-do list application',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white`}>
        <TaskProvider>
          {children}
        </TaskProvider>
      </body>
    </html>
  );
}