// src/components/TaskForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

import { TaskFormProps } from '../types/TaskForm';
import { Task } from '../types/Task';



export const TaskForm: React.FC<TaskFormProps> = ({ initialTask, onClose, onSave }) => {
  const [formData, setFormData] = useState<Task>(
    initialTask || {
      title: '',
      description: '',
      priority: 'low',
      assignee: '',
      status: 'todo',
      dueDate: new Date().toISOString().split('T')[0],
    }
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {initialTask ? 'Edit Task' : 'Add Task'}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <input
              type="text"
              name="assignee"
              placeholder="Assignee"
              value={formData.assignee}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200"
            >
              {initialTask ? 'Update' : 'Add'} Task
            </button>
            <button
              type="button"
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-lg transition duration-200"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
