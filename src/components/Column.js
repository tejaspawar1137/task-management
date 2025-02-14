import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDrop, } from "react-dnd";
import { TaskCard } from "./TaskCard";
export const Column = ({ title, status, tasks, onDrop, onDelete, onEdit, }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "TASK",
        drop: (item) => {
            onDrop(item.id, status);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));
    return (_jsxs("div", { ref: (node) => {
            if (node)
                drop(node);
        }, className: `bg-gradient-to-b from-white to-gray-50 p-6 rounded-2xl shadow-md transition-all duration-200 ${isOver ? "bg-blue-50" : ""}`, children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-700 mb-6", children: title }), tasks.map((task) => (_jsx(TaskCard, { task: task, onDelete: onDelete, onEdit: onEdit }, task.id)))] }));
};
