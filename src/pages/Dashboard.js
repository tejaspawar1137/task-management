import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { db } from "../firebaseConfig";
import { collection, addDoc, updateDoc, doc, onSnapshot, deleteDoc, query, where, } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { Column } from "../components/Column";
import { TaskForm } from "../components/TaskForm";
const KanbanBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [activityLogs, setActivityLogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterPriority, setFilterPriority] = useState("all");
    const [sortBy, setSortBy] = useState("dueDate");
    const [showActivityLog, setShowActivityLog] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
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
        if (!currentUser)
            return;
        const tasksQuery = query(collection(db, "tasks"), where("userId", "==", currentUser.uid));
        const unsubscribeTasks = onSnapshot(tasksQuery, (snapshot) => {
            setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
        const logsQuery = query(collection(db, "activityLogs"), where("userId", "==", currentUser.uid));
        const unsubscribeLogs = onSnapshot(logsQuery, (snapshot) => {
            setActivityLogs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
        return () => {
            unsubscribeTasks();
            unsubscribeLogs();
        };
    }, [currentUser]);
    // Handle task drop with log
    const handleDrop = async (taskId, newStatus) => {
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
        }
        catch (error) {
            console.error(error);
        }
    };
    // Handle delete with log
    const handleDelete = async (taskId) => {
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
        }
        catch (error) {
            toast.error("Error deleting task");
            console.error(error);
        }
    };
    // Handle add/edit save with log
    const handleSave = async (taskData) => {
        try {
            const { id, ...data } = taskData;
            if (taskToEdit) {
                const taskRef = doc(db, "tasks", taskToEdit.id);
                await updateDoc(taskRef, data);
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
            }
            else {
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
        }
        catch (error) {
            toast.error("Error saving task");
            console.error(error);
        }
    };
    // Filter and sort tasks
    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    const handleEdit = (task) => {
        setTaskToEdit(task);
        setShowModal(true);
    };
    return (_jsx(DndProvider, { backend: HTML5Backend, children: _jsxs("div", { className: "min-h-screen bg-gradient-to-br from-gray-100 to-white p-8", children: [_jsx(Toaster, {}), _jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-800 mb-6 text-center", children: "Task Management" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-6", children: [_jsx("input", { type: "text", placeholder: "Search tasks...", className: "p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }), _jsxs("select", { className: "p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400", value: filterPriority, onChange: (e) => setFilterPriority(e.target.value), children: [_jsx("option", { value: "all", children: "All Priorities" }), _jsx("option", { value: "high", children: "High Priority" }), _jsx("option", { value: "medium", children: "Medium Priority" }), _jsx("option", { value: "low", children: "Low Priority" })] }), _jsxs("select", { className: "p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400", value: sortBy, onChange: (e) => setSortBy(e.target.value), children: [_jsx("option", { value: "dueDate", children: "Sort by Due Date" }), _jsx("option", { value: "title", children: "Sort by Title" })] }), _jsx("button", { className: "p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200", onClick: () => setShowActivityLog(!showActivityLog), children: showActivityLog ? "Hide Activity Log" : "Show Activity Log" })] })] }), _jsx("div", { className: "mb-8 flex justify-center", children: _jsx("button", { className: "bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition duration-200", onClick: () => {
                            setTaskToEdit(null);
                            setShowModal(true);
                        }, children: "+ Add Task" }) }), _jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [_jsxs("div", { className: "flex-grow grid grid-cols-1 md:grid-cols-3 gap-8", children: [_jsx(Column, { title: "To Do", status: "todo", tasks: sortedTasks.filter((task) => task.status === "todo"), onDrop: handleDrop, onDelete: handleDelete, onEdit: handleEdit }), _jsx(Column, { title: "In Progress", status: "in-progress", tasks: sortedTasks.filter((task) => task.status === "in-progress"), onDrop: handleDrop, onDelete: handleDelete, onEdit: handleEdit }), _jsx(Column, { title: "Done", status: "done", tasks: sortedTasks.filter((task) => task.status === "done"), onDrop: handleDrop, onDelete: handleDelete, onEdit: handleEdit })] }), showActivityLog && (_jsxs("div", { className: "w-full lg:w-80 bg-white p-6 rounded-2xl shadow-xl", children: [_jsxs("h2", { className: "text-2xl font-bold text-gray-800 mb-4 flex items-center", children: [_jsx("span", { className: "mr-2", children: "Activity Log" }), _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 text-blue-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3" }) })] }), _jsx("div", { className: "max-h-96 overflow-y-auto", children: activityLogs.length > 0 ? (activityLogs.map((log) => (_jsxs("div", { className: "flex items-start mb-4", children: [_jsx("div", { className: "flex-shrink-0 mr-3", children: _jsx("div", { className: "w-3 h-3 bg-blue-500 rounded-full mt-1" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-base font-medium text-gray-800", children: log.action }), _jsx("p", { className: "text-sm text-gray-500", children: log.timestamp })] })] }, log.id)))) : (_jsx("p", { className: "text-gray-500 text-center", children: "No activity yet" })) })] }))] }), showModal && (_jsx(TaskForm, { initialTask: taskToEdit || undefined, onClose: () => {
                        setShowModal(false);
                        setTaskToEdit(null);
                    }, onSave: handleSave }))] }) }));
};
export default KanbanBoard;
