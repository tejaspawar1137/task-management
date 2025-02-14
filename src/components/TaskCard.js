import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDrag, } from "react-dnd";
import { FaEdit, FaTrash } from "react-icons/fa";
export const TaskCard = ({ task, onDelete, onEdit }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "TASK",
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    return (_jsxs("div", { ref: (node) => {
            if (node)
                drag(node);
        }, className: `bg-white p-4 rounded-xl mb-4 border border-gray-200 shadow-sm cursor-pointer transform transition duration-200 hover:shadow-lg hover:-translate-y-1 ${isDragging ? "opacity-50" : ""}`, children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("h3", { className: "font-bold text-lg text-gray-800", children: task.title }), _jsxs("div", { className: "flex space-x-2", children: [_jsx("button", { onClick: (e) => {
                                    e.stopPropagation();
                                    onEdit(task);
                                }, className: "text-blue-500 hover:text-blue-700", children: _jsx(FaEdit, { size: 18 }) }), _jsx("button", { onClick: (e) => {
                                    e.stopPropagation();
                                    onDelete(task.id);
                                }, className: "text-red-500 hover:text-red-700", children: _jsx(FaTrash, { size: 18 }) })] })] }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: task.description }), _jsxs("div", { className: "mt-4 flex justify-between items-center", children: [_jsx("span", { className: `text-xs font-medium px-3 py-1 rounded-full ${task.priority === "high"
                            ? "bg-red-200 text-red-800"
                            : task.priority === "medium"
                                ? "bg-yellow-200 text-yellow-800"
                                : "bg-green-200 text-green-800"}`, children: task.priority }), _jsx("span", { className: "text-xs text-gray-500", children: task.assignee })] })] }));
};
