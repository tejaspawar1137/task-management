import { Task } from "./Task";

export interface ColumnProps {
  title: string;
  status: "todo" | "in-progress" | "done";
  tasks: Task[];
  onDrop: (taskId: string, status: string) => Promise<void> | void;
  onDelete: (taskId: string) => Promise<void> | void;
  onEdit: (task: Task) => void;
}