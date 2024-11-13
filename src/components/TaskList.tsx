import React from 'react';
import { Check, Plus, Trash2 } from 'lucide-react';
import { Task, TaskGroup } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: (text: string) => void;
}

export default function TaskList({ tasks, onToggle, onDelete, onAdd }: TaskListProps) {
  const [newTask, setNewTask] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      onAdd(newTask.trim());
      setNewTask('');
    }
  };

  // Ensure tasks is an array before reducing
  const taskArray = Array.isArray(tasks) ? tasks : [];
  const groupedTasks = taskArray.reduce((acc, task) => {
    if (!acc[task.group]) {
      acc[task.group] = [];
    }
    acc[task.group].push(task);
    return acc;
  }, {} as Record<TaskGroup | 'custom', Task[]>);

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            className="p-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {(Object.keys(groupedTasks) as Array<TaskGroup | 'custom'>).map((group) => (
          <div key={group} className="space-y-2">
            {group !== 'custom' && (
              <h2 className="text-lg font-semibold text-gray-700 mb-3">{group}</h2>
            )}
            {groupedTasks[group].map((task) => (
              <div
                key={task.id}
                className="group flex items-center gap-3 p-3 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-teal-200 transition-all"
              >
                <button
                  onClick={() => onToggle(task.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    task.completed
                      ? 'bg-teal-500 border-teal-500'
                      : 'border-gray-300 hover:border-teal-500'
                  }`}
                >
                  {task.completed && <Check className="w-4 h-4 text-white" />}
                </button>
                <span
                  className={`flex-1 ${
                    task.completed ? 'text-gray-400 line-through' : 'text-gray-700'
                  }`}
                >
                  {task.text}
                </span>
                {task.category === 'custom' && (
                  <button
                    onClick={() => onDelete(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}