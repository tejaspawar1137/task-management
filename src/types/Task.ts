export interface Task {
  id?: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  assignee: string;
  status: 'todo' | 'in-progress' | 'done';
  dueDate: string;
  userId?: string;
}