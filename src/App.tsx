import React from 'react';
import { Brain, Share2 } from 'lucide-react';
import TaskList from './components/TaskList';
import Progress from './components/Progress';
import SignInPopup from './components/SignInPopup';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Task } from './types';

const defaultTasks: Task[] = [
  // ... (previous tasks remain the same)
];

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('mental-clutter-tasks', defaultTasks);
  const [hasSignedIn, setHasSignedIn] = React.useState(() => {
    return localStorage.getItem('hasSignedIn') === 'true';
  });

  const handleToggle = (id: string) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleAdd = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      category: 'custom',
      group: 'custom'
    };
    setTasks([...tasks, newTask]);
  };

  const handleShare = async () => {
    const completedTasks = tasks.filter((task) => task.completed);
    const text = `I've completed ${completedTasks.length} mental clutter reduction tasks today! 🧠✨`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mental Clutter Reduction Progress',
          text,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('Progress copied to clipboard!');
    }
  };

  return (
    <>
      {!hasSignedIn && <SignInPopup onComplete={() => setHasSignedIn(true)} />}
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <header className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-500 text-white mb-4">
              <Brain className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Mental Clutter Reduction</h1>
            <p className="text-gray-600">Clear your mind, one task at a time</p>
          </header>

          <div className="space-y-8">
            <Progress tasks={tasks} />
            <TaskList
              tasks={tasks}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onAdd={handleAdd}
            />
            
            <button
              onClick={handleShare}
              className="w-full max-w-md mx-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white hover:border-teal-200 transition-all"
            >
              <Share2 className="w-5 h-5" />
              Share Progress
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;