import React from 'react';
import { Task } from '../types';

interface ProgressProps {
  tasks: Task[];
}

export default function Progress({ tasks }: ProgressProps) {
  // Ensure tasks is an array before filtering
  const taskArray = Array.isArray(tasks) ? tasks : [];
  const completed = taskArray.filter((task) => task.completed).length;
  const total = taskArray.length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
        <span>{completed} of {total} tasks completed</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-500 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}