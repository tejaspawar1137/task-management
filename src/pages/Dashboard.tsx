import React, { useState, useEffect, ChangeEvent } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

import { Task } from "../types/Task";
import { ActivityLog } from "../types/Activity";

import { Column } from "../components/Column";
import { TaskForm } from "../components/TaskForm";

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterPriority, setFilterPriority] = useState<"all" | "high" | "medium" | "low">("all");
  const [sortBy, setSortBy] = useState<"dueDate" | "title">("dueDate");
  const [showActivityLog, setShowActivityLog] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const auth = getAuth();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribeAuth;
  }, [auth]);

  // Subscribe to tasks and activity logs once currentUser is available
  useEffect(() => {
    if (!currentUser) return;

    const tasksQuery = query(
      collection(db, "tasks"),
      where("userId", "==", currentUser.uid)
    );
    const unsubscribeTasks = onSnapshot(tasksQuery, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Task)));
    });

    const logsQuery = query(
      collection(db, "activityLogs"),
      where("userId", "==", currentUser.uid)
    );
    const unsubscribeLogs = onSnapshot(logsQuery, (snapshot) => {
      setActivityLogs(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ActivityLog))
      );
    });

    return () => {
      unsubscribeTasks();
      unsubscribeLogs();
    };
  }, [currentUser]);

  // Handle task drop with log
  const handleDrop = async (taskId: string, newStatus: string): Promise<void> => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, { status: newStatus });

      const task = tasks.find((t) => t.id === taskId);
      if (task && currentUser) {
        await addDoc(collection(db, "activityLogs"), {
          action: `Task moved to ${newStatus}`,
          task: task.title,
          userId: currentUser.uid,
          timestamp: new Date().toLocaleString(),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle delete with log
  const handleDelete = async (taskId: string): Promise<void> => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      await deleteDoc(doc(db, "tasks", taskId));
      toast.success("Task deleted");
      if (task && currentUser) {
        await addDoc(collection(db, "activityLogs"), {
          action: `Task deleted: ${task.title}`,
          task: task.title,
          userId: currentUser.uid,
          timestamp: new Date().toLocaleString(),
        });
      }
    } catch (error) {
      toast.error("Error deleting task");
      console.error(error);
    }
  };

  // Handle add/edit save with log
 const handleSave = async (taskData: Task): Promise<void> => {
  try {

    const { id, ...data } = taskData;
    
    if (taskToEdit) {
      const taskRef = doc(db, "tasks", taskToEdit.id!);

      await updateDoc(taskRef, data as Partial<Task>);
      toast.success("Task updated successfully");
      if (currentUser) {
        await addDoc(collection(db, "activityLogs"), {
          action: `Task updated: ${data.title}`,
          task: data.title,
          userId: currentUser.uid,
          timestamp: new Date().toLocaleString(),
        });
      }
      setTaskToEdit(null);
    } else {
      if (currentUser) {
        await addDoc(collection(db, "tasks"), {
          ...data,
          userId: currentUser.uid,
        });
        toast.success("Task added successfully");
        await addDoc(collection(db, "activityLogs"), {
          action: `Task added: ${data.title}`,
          task: data.title,
          userId: currentUser.uid,
          timestamp: new Date().toLocaleString(),
        });
      }
    }
    setShowModal(false);
  } catch (error) {
    toast.error("Error saving task");
    console.error(error);
  }
};


  // Filter and sort tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

const sortedTasks = [...filteredTasks].sort((a, b) => {
  if (sortBy === "dueDate") {

    return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
  }
  return a.title.localeCompare(b.title);
});


  const handleEdit = (task: Task): void => {
    setTaskToEdit(task);
    setShowModal(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-8">
        <Toaster />
    
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Task Management
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <input
              type="text"
              placeholder="Search tasks..."
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
            <select
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={filterPriority}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setFilterPriority(e.target.value as "all" | "high" | "medium" | "low")
              }
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <select
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={sortBy}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setSortBy(e.target.value as "dueDate" | "title")
              }
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="title">Sort by Title</option>
            </select>
            <button
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              onClick={() => setShowActivityLog(!showActivityLog)}
            >
              {showActivityLog ? "Hide Activity Log" : "Show Activity Log"}
            </button>
          </div>
        </div>

 
        <div className="mb-8 flex justify-center">
          <button
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition duration-200"
            onClick={() => {
              setTaskToEdit(null);
              setShowModal(true);
            }}
          >
            + Add Task
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
  
          <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-8">
            <Column
              title="To Do"
              status="todo"
              tasks={sortedTasks.filter((task) => task.status === "todo")}
              onDrop={handleDrop}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
            <Column
              title="In Progress"
              status="in-progress"
              tasks={sortedTasks.filter((task) => task.status === "in-progress")}
              onDrop={handleDrop}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
            <Column
              title="Done"
              status="done"
              tasks={sortedTasks.filter((task) => task.status === "done")}
              onDrop={handleDrop}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>

          {showActivityLog && (
            <div className="w-full lg:w-80 bg-white p-6 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">Activity Log</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3"
                  />
                </svg>
              </h2>
              <div className="max-h-96 overflow-y-auto">
                {activityLogs.length > 0 ? (
                  activityLogs.map((log) => (
                    <div key={log.id} className="flex items-start mb-4">
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mt-1"></div>
                      </div>
                      <div>
                        <p className="text-base font-medium text-gray-800">
                          {log.action}
                        </p>
                        <p className="text-sm text-gray-500">{log.timestamp}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">No activity yet</p>
                )}
              </div>
            </div>
          )}
        </div>

     
        {showModal && (
          <TaskForm
            initialTask={taskToEdit || undefined}
            onClose={() => {
              setShowModal(false);
              setTaskToEdit(null);
            }}
            onSave={handleSave}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;
