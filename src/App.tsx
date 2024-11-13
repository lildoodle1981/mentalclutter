import React from 'react';
import { Brain, Share2 } from 'lucide-react';
import TaskList from './components/TaskList';
import Progress from './components/Progress';
import SignInPopup from './components/SignInPopup';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Task } from './types';

// Previous default tasks array remains the same
const defaultTasks = [
  { id: '1', text: 'Declutter your desk or workspace', completed: false, category: 'default', group: 'Organize Your Space' },
  { id: '2', text: 'Keep only essential items within reach', completed: false, category: 'default', group: 'Organize Your Space' },
  { id: '3', text: 'Clear out or organize digital clutter (emails, desktop files)', completed: false, category: 'default', group: 'Organize Your Space' },
  { id: '4', text: 'Create a designated space for relaxation', completed: false, category: 'default', group: 'Organize Your Space' },
  { id: '5', text: 'List all tasks in order of importance', completed: false, category: 'default', group: 'Prioritize Tasks' },
  { id: '6', text: 'Break down larger tasks into smaller, manageable steps', completed: false, category: 'default', group: 'Prioritize Tasks' },
  { id: '7', text: 'Limit your to-do list to a realistic number of daily tasks', completed: false, category: 'default', group: 'Prioritize Tasks' },
  { id: '8', text: 'Identify and eliminate low-priority activities', completed: false, category: 'default', group: 'Prioritize Tasks' },
  { id: '9', text: 'Silence non-essential notifications on your devices', completed: false, category: 'default', group: 'Technology Boundaries' },
  { id: '10', text: 'Set specific times for checking emails and messages', completed: false, category: 'default', group: 'Technology Boundaries' },
  { id: '11', text: 'Designate "no-screen" times, especially before bed', completed: false, category: 'default', group: 'Technology Boundaries' },
  { id: '12', text: 'Unsubscribe from unneeded mailing lists', completed: false, category: 'default', group: 'Technology Boundaries' },
  { id: '13', text: 'Start with 5–10 minutes of mindful breathing or meditation', completed: false, category: 'default', group: 'Mindfulness' },
  { id: '14', text: 'Focus on being fully present in each moment', completed: false, category: 'default', group: 'Mindfulness' },
  { id: '15', text: 'Let go of lingering thoughts by acknowledging and releasing them', completed: false, category: 'default', group: 'Mindfulness' },
  { id: '16', text: 'Schedule specific times to read the news or social media', completed: false, category: 'default', group: 'Information Management' },
  { id: '17', text: 'Choose one or two trusted sources for information', completed: false, category: 'default', group: 'Information Management' },
  { id: '18', text: 'Avoid multitasking between information sources', completed: false, category: 'default', group: 'Information Management' },
  { id: '19', text: 'Write down any nagging thoughts or tasks in a journal', completed: false, category: 'default', group: 'Brain Dump & Goals' },
  { id: '20', text: 'Clear your mind by listing out things you don\'t want to forget', completed: false, category: 'default', group: 'Brain Dump & Goals' },
  { id: '21', text: 'Review your brain dump weekly and organize into actionable items', completed: false, category: 'default', group: 'Brain Dump & Goals' },
  { id: '22', text: 'Define short-term and long-term goals', completed: false, category: 'default', group: 'Brain Dump & Goals' },
  { id: '23', text: 'Ensure goals are specific, measurable, and achievable', completed: false, category: 'default', group: 'Brain Dump & Goals' },
  { id: '24', text: 'Keep a daily reminder of your main goal to stay focused', completed: false, category: 'default', group: 'Brain Dump & Goals' },
  { id: '25', text: 'Use the Pomodoro technique (25-minute work intervals)', completed: false, category: 'default', group: 'Breaks & Self-Care' },
  { id: '26', text: 'Stand up, stretch, or walk around to reset your mind', completed: false, category: 'default', group: 'Breaks & Self-Care' },
  { id: '27', text: 'Avoid skipping breaks, even during busy times', completed: false, category: 'default', group: 'Breaks & Self-Care' },
  { id: '28', text: 'Write down 3 things you\'re grateful for each day', completed: false, category: 'default', group: 'Gratitude & Boundaries' },
  { id: '29', text: 'Shift focus to positive aspects of life to reduce worry', completed: false, category: 'default', group: 'Gratitude & Boundaries' },
  { id: '30', text: 'Use gratitude to ground yourself in the present moment', completed: false, category: 'default', group: 'Gratitude & Boundaries' },
  { id: '31', text: 'Learn to say "no" to tasks that don\'t align with your goals', completed: false, category: 'default', group: 'Gratitude & Boundaries' },
  { id: '32', text: 'Reassess commitments regularly and cut unnecessary ones', completed: false, category: 'default', group: 'Gratitude & Boundaries' },
  { id: '33', text: 'Focus on quality rather than quantity in your commitments', completed: false, category: 'default', group: 'Gratitude & Boundaries' }
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

  const handleAdd = (text: string, group: TaskGroup) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      category: group === 'custom' ? 'custom' : 'default',
      group
    };
    setTasks([...tasks, newTask]);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset to default tasks? This will remove all custom tasks and restore original tasks.')) {
      setTasks(defaultTasks);
    }
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
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <header className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-500 text-white mb-4">
              <Brain className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Mental Clutter Reduction</h1>
            <p className="text-gray-600">Clear your mind, one task at a time</p>
          </header>

          <div className="flex flex-col items-center space-y-8 mb-16">
            <Progress tasks={tasks} />
            <TaskList
              tasks={tasks}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onAdd={handleAdd}
              onReset={handleReset}
            />
            
            <button
              onClick={handleShare}
              className="w-full max-w-md mx-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white hover:border-teal-200 transition-all"
            >
              <Share2 className="w-5 h-5" />
              Share Progress
            </button>
          </div>

          {/* Guide Content */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">How to Use the Mental Clutter Reduction Checklist</h2>
            
            <h3 className="text-xl font-semibold text-gray-700 mt-8">Getting Started</h3>
            <p>The Mental Clutter Reduction Checklist above is designed to help you systematically reduce mental clutter and improve your focus. Begin by reviewing the pre-populated tasks in each category and checking off any items you've already completed.</p>

            <h3 className="text-xl font-semibold text-gray-700 mt-8">Key Features</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Category-Based Organization:</strong> Tasks are organized into meaningful categories like "Organize Your Space" and "Mindfulness" to help you tackle different aspects of mental clutter.</li>
              <li><strong>Progress Tracking:</strong> The progress bar at the top shows your completion percentage, helping you visualize your journey.</li>
              <li><strong>Customization:</strong> Add your own tasks to any category using the "+" button below each section.</li>
              <li><strong>Task Management:</strong> Delete any task (including defaults) that doesn't apply to you, and reset to defaults if needed.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-700 mt-8">Daily Practice</h3>
            <p>For best results, we recommend:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Review your checklist at the start of each day</li>
              <li>Focus on 2-3 tasks from different categories</li>
              <li>Track your progress regularly</li>
              <li>Celebrate small wins by sharing your progress</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800">Q: Will my progress be saved?</h4>
                <p>Yes, your progress is automatically saved in your browser's local storage. However, clearing your browser data will reset your progress.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800">Q: Can I add my own tasks?</h4>
                <p>Yes! Each category has an "Add task" input field where you can add custom tasks specific to your needs.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800">Q: What happens when I reset to defaults?</h4>
                <p>The reset button will restore all original tasks and remove any custom tasks you've added. Your progress will also be reset.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800">Q: Can I share my progress?</h4>
                <p>Yes! Use the "Share Progress" button to share your achievements on supported platforms or copy your progress to the clipboard.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800">Q: How often should I use the checklist?</h4>
                <p>We recommend daily use, but you can adapt the frequency to your needs. The key is consistency rather than frequency.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;