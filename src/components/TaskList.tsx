import React from 'react';
import { Check, Plus, Trash2, RefreshCw } from 'lucide-react';
import { Task, TaskGroup } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: (text: string, group: TaskGroup) => void;
  onReset: () => void;
}

export default function TaskList({ tasks, onToggle, onDelete, onAdd, onReset }: TaskListProps) {
  const [newTasks, setNewTasks] = React.useState<Record<TaskGroup, string>>({} as Record<TaskGroup, string>);

  const handleSubmit = (e: React.FormEvent, group: TaskGroup) => {
    e.preventDefault();
    if (newTasks[group]?.trim()) {
      onAdd(newTasks[group].trim(), group);
      setNewTasks(prev => ({ ...prev, [group]: '' }));
    }
  };

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
      <button
        onClick={onReset}
        className="mb-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Reset to Defaults
      </button>

      <div className="space-y-8">
        {(Object.keys(groupedTasks) as Array<TaskGroup | 'custom'>)
          .filter(group => group !== 'custom')
          .map((group) => (
          <div key={group} className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-700">{group}</h2>
            
            {groupedTasks[group]?.map((task) => (
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
                <button
                  onClick={() => onDelete(task.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <form onSubmit={(e) => handleSubmit(e, group)} className="flex gap-2">
              <input
                type="text"
                value={newTasks[group] || ''}
                onChange={(e) => setNewTasks(prev => ({ ...prev, [group]: e.target.value }))}
                placeholder={`Add task to ${group}...`}
                className="flex-1 px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="p-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition-colors"
              >
                <Plus className="w-6 h-6" />
              </button>
            </form>
          </div>
        ))}

        {groupedTasks['custom'] && groupedTasks['custom'].length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-700">Custom Tasks</h2>
            {groupedTasks['custom'].map((task) => (
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
                <button
                  onClick={() => onDelete(task.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}