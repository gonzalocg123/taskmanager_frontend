// services/TaskService.js - SOLO BACKEND
import axios from 'axios';

const API_URL = 'https://taskmanager-backend-5ta5.onrender.com/api';

export const taskService = {
    async getUserTasks(userEmail) {
        console.log('📋 Obteniendo tareas del backend para:', userEmail);
        
        const response = await axios.get(`${API_URL}/tasks?userEmail=${encodeURIComponent(userEmail)}`);
        console.log('✅ Tareas del backend:', response.data);
        return response.data;
    },

    async createTask(task, userEmail) {
        console.log('➕ Creando tarea en backend:', task.title);
        
        const response = await axios.post(
            `${API_URL}/tasks?userEmail=${encodeURIComponent(userEmail)}`, 
            task
        );
        console.log('✅ Tarea creada en backend:', response.data);
        return response.data;
    },

    async updateTask(id, task, userEmail) {
        console.log('✏️ Actualizando tarea en backend:', id);
        
        const response = await axios.put(
            `${API_URL}/tasks/${id}?userEmail=${encodeURIComponent(userEmail)}`, 
            task
        );
        return response.data;
    },

    async deleteTask(id, userEmail) {
        console.log('🗑️ Eliminando tarea del backend:', id);
        
        await axios.delete(`${API_URL}/tasks/${id}?userEmail=${encodeURIComponent(userEmail)}`);
        console.log('✅ Tarea eliminada del backend');
    }
};