// components/TaskList.jsx - CORREGIDO
import React, { useEffect, useState } from "react";
import { taskService } from "../services/TaskService";
import TaskItem from "./TaskItem";

const TaskList = ({ refreshTrigger, onTaskUpdated, userEmail }) => { // ✅ MANTENER userEmail prop
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingTask, setEditingTask] = useState(null);
    const [editForm, setEditForm] = useState({ title: "", description: "" });

    useEffect(() => {
        if (userEmail) {
            loadTasks();
        } else {
            setError("No hay usuario identificado");
            setLoading(false);
        }
    }, [refreshTrigger, userEmail]); // ✅ MANTENER userEmail dependency

    const loadTasks = async () => {
        if (!userEmail) return;
        
        try {
            setLoading(true);
            setError("");
            console.log('🔄 Loading tasks for user:', userEmail);
            
            const tasksData = await taskService.getUserTasks(userEmail); // ✅ PASAR userEmail
            setTasks(tasksData);
        } catch (error) {
            console.error("Error loading tasks:", error);
            
            let errorMessage = "Error al cargar las tareas";
            if (error.message.includes('403')) {
                errorMessage = "No tienes permisos para ver las tareas. El token puede ser inválido.";
            } else if (error.message.includes('401')) {
                errorMessage = "Sesión expirada. Por favor, vuelve a iniciar sesión.";
            } else if (error.response?.status === 404) {
                errorMessage = "Usuario no encontrado. Por favor, vuelve a iniciar sesión.";
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) return;
        
        try {
            await taskService.deleteTask(id, userEmail); // ✅ PASAR userEmail
            await loadTasks();
            if (onTaskUpdated) onTaskUpdated();
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("Error al eliminar la tarea: " + (error.message || 'Error desconocido'));
        }
    };

    const toggleComplete = async (task) => {
        try {
            await taskService.updateTask(task.id, { // ✅ PASAR userEmail
                ...task,
                completed: !task.completed
            }, userEmail);
            await loadTasks();
            if (onTaskUpdated) onTaskUpdated();
        } catch (error) {
            console.error("Error updating task:", error);
            alert("Error al actualizar la tarea: " + (error.message || 'Error desconocido'));
        }
    };

    const startEdit = (task) => {
        setEditingTask(task);
        setEditForm({
            title: task.title,
            description: task.description || ""
        });
    };

    const cancelEdit = () => {
        setEditingTask(null);
        setEditForm({ title: "", description: "" });
    };

    const saveEdit = async () => {
        if (!editForm.title.trim()) {
            alert("El título es requerido");
            return;
        }

        try {
            await taskService.updateTask(editingTask.id, { // ✅ PASAR userEmail
                ...editingTask,
                title: editForm.title,
                description: editForm.description
            }, userEmail);
            await loadTasks();
            setEditingTask(null);
            setEditForm({ title: "", description: "" });
            if (onTaskUpdated) onTaskUpdated();
        } catch (error) {
            console.error("Error saving edit:", error);
            alert("Error al actualizar la tarea: " + (error.message || 'Error desconocido'));
        }
    };

    const incompleteTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <div className="text-lg text-gray-600">Cargando tareas...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-8 text-center">
                <div className="mb-4 text-red-600">{error}</div>
                <button 
                    onClick={loadTasks} 
                    className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                    Tareas Pendientes ({incompleteTasks.length})
                </h2>
                {incompleteTasks.length === 0 ? (
                    <div className="py-8 text-center text-gray-500 rounded-lg bg-gray-50">
                        No hay tareas pendientes
                    </div>
                ) : (
                    <div className="space-y-3">
                        {incompleteTasks.map((task) => (
                            <TaskItem 
                                key={task.id}
                                task={task}
                                isEditing={editingTask?.id === task.id}
                                editForm={editForm}
                                onEditFormChange={setEditForm}
                                onStartEdit={startEdit}
                                onCancelEdit={cancelEdit}
                                onSaveEdit={saveEdit}
                                onToggleComplete={toggleComplete}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>

            {completedTasks.length > 0 && (
                <div>
                    <h2 className="mb-4 text-xl font-semibold text-green-600">
                        Tareas Completadas ({completedTasks.length})
                    </h2>
                    <div className="space-y-3">
                        {completedTasks.map((task) => (
                            <TaskItem 
                                key={task.id}
                                task={task}
                                isEditing={editingTask?.id === task.id}
                                editForm={editForm}
                                onEditFormChange={setEditForm}
                                onStartEdit={startEdit}
                                onCancelEdit={cancelEdit}
                                onSaveEdit={saveEdit}
                                onToggleComplete={toggleComplete}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskList;