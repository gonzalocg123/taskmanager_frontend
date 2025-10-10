import axios from 'axios';

const API_URL = 'https://taskmanager-backend-megy.onrender.com/api';

// Configurar interceptor para todas las peticiones
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const userService = {
    async getCurrentUser(userEmail) {
        try {
        console.log('👤 Fetching current user info for:', userEmail);
        
        // Usar headers manuales como fallback
        const token = localStorage.getItem('token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        
        const response = await axios.get(
            `${API_URL}/tasks/user-info?userEmail=${userEmail}`,
            { headers }
        );
        
        console.log('✅ Current user info fetched:', response.data);
        return response.data;
        } catch (error) {
        console.error('❌ Error fetching user info:', error);
        throw error;
        }
    }
};