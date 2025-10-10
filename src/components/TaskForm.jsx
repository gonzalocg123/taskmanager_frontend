// components/TaskForm.jsx - CORREGIDO
import React, { useState } from 'react';
import { taskService } from '../services/TaskService';

const TaskForm = ({ onTaskAdded, userEmail }) => { // ✅ MANTENER userEmail prop
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !userEmail) return; // ✅ VERIFICAR userEmail

        setLoading(true);
        try {
            const newTask = {
                title: title.trim(),
                description: description.trim(),
                completed: false
            };

            console.log('📝 Creating task for user:', userEmail);
            console.log('Task data:', newTask);
            
            await taskService.createTask(newTask, userEmail); // ✅ PASAR userEmail
            console.log('✅ Task created successfully');
            
            // Limpiar formulario
            setTitle('');
            setDescription('');
            
            // Notificar que se agregó una tarea
            setTimeout(() => {
                console.log('🔄 Calling onTaskAdded callback');
                if (onTaskAdded) {
                    onTaskAdded();
                }
            }, 100);
            
        } catch (error) {
            console.error('❌ Error creating task:', error);
            alert('Error al crear la tarea: ' + (error.message || 'Error desconocido'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 mb-6 rounded-lg bg-gray-50">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Nueva Tarea</h2>
            
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Título de la tarea *"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
            </div>
            
            <div className="mb-4">
                <textarea
                    placeholder="Descripción (opcional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            
            <button
                type="submit"
                disabled={loading || !title.trim() || !userEmail} // ✅ VERIFICAR userEmail
                className="w-full px-4 py-3 text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {loading ? 'Creando...' : 'Agregar Tarea'}
            </button>
        </form>
    );
};

export default TaskForm;