import {

  useDrop,

  DropTargetMonitor,
} from "react-dnd";
import { TaskCard } from "./TaskCard";
import { ColumnProps } from "../types/Column";
export const Column: React.FC<ColumnProps> = ({
  title,
  status,
  tasks,
  onDrop,
  onDelete,
  onEdit,
}) => {
  const [{ isOver }, drop] = useDrop<
    { id: string },
    unknown,
    { isOver: boolean }
  >(() => ({
    accept: "TASK",
    drop: (item: { id: string }) => {
      onDrop(item.id, status);
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
       ref={(node) => {

      if (node) drop(node);
    }}
      className={`bg-gradient-to-b from-white to-gray-50 p-6 rounded-2xl shadow-md transition-all duration-200 ${
        isOver ? "bg-blue-50" : ""
      }`}
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">{title}</h2>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};