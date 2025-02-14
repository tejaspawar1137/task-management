import {

  useDrag,
 
  DragSourceMonitor,

} from "react-dnd";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TaskCardProps } from "../types/TaskCard";
export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onEdit }) => {
  const [{ isDragging }, drag] = useDrag<
    { id: string },
    unknown,
    { isDragging: boolean }
  >(() => ({
    type: "TASK",
    item: { id: task.id! },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
       ref={(node) => {

      if (node) drag(node);
    }}
      className={`bg-white p-4 rounded-xl mb-4 border border-gray-200 shadow-sm cursor-pointer transform transition duration-200 hover:shadow-lg hover:-translate-y-1 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEdit size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id!);
            }}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash size={18} />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            task.priority === "high"
              ? "bg-red-200 text-red-800"
              : task.priority === "medium"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {task.priority}
        </span>
        <span className="text-xs text-gray-500">{task.assignee}</span>
      </div>
    </div>
  );
};
