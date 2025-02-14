import { Task } from "./Task";

export interface TaskFormProps {
  initialTask?: Task;
  onClose: () => void;
  onSave: (taskData: Task) => Promise<void> | void;
}