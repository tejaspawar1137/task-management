import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/TaskForm.tsx
import { useState } from 'react';
export const TaskForm = ({ initialTask, onClose, onSave }) => {
    const [formData, setFormData] = useState(initialTask || {
        title: '',
        description: '',
        priority: 'low',
        assignee: '',
        status: 'todo',
        dueDate: new Date().toISOString().split('T')[0],
    });
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };
    return (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50", children: _jsxs("div", { className: "bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-gray-800", children: initialTask ? 'Edit Task' : 'Add Task' }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { type: "text", name: "title", placeholder: "Title", value: formData.title, onChange: handleChange, required: true, className: "w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" }), _jsx("textarea", { name: "description", placeholder: "Description", value: formData.description, onChange: handleChange, className: "w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [_jsxs("select", { name: "priority", value: formData.priority, onChange: handleChange, className: "p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400", children: [_jsx("option", { value: "high", children: "High" }), _jsx("option", { value: "medium", children: "Medium" }), _jsx("option", { value: "low", children: "Low" })] }), _jsx("input", { type: "text", name: "assignee", placeholder: "Assignee", value: formData.assignee, onChange: handleChange, className: "p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" })] }), _jsxs("select", { name: "status", value: formData.status, onChange: handleChange, className: "w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400", children: [_jsx("option", { value: "todo", children: "To Do" }), _jsx("option", { value: "in-progress", children: "In Progress" }), _jsx("option", { value: "done", children: "Done" })] }), _jsxs("div", { className: "flex justify-end space-x-4", children: [_jsxs("button", { type: "submit", className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200", children: [initialTask ? 'Update' : 'Add', " Task"] }), _jsx("button", { type: "button", className: "bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-lg transition duration-200", onClick: onClose, children: "Cancel" })] })] })] }) }));
};
