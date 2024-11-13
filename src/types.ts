export interface Task {
  id: string;
  text: string;
  completed: boolean;
  category: 'default' | 'custom';
  group: TaskGroup;
}

export type TaskGroup = 
  | 'Organize Your Space'
  | 'Prioritize Tasks'
  | 'Technology Boundaries'
  | 'Mindfulness'
  | 'Information Management'
  | 'Brain Dump & Goals'
  | 'Breaks & Self-Care'
  | 'Gratitude & Boundaries'
  | 'custom';
