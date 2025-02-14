import { Task } from "./Task";

export interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => Promise<void> | void;
  onEdit: (task: Task) => void;
}