// services/AuthService.js - SIN TOKENS
import axios from 'axios';

const API_URL = 'https://taskmanager-backend-megy.onrender.com';

export const login = async (credentials) => {
    try {
        console.log('🔐 Login sin auth con:', credentials.email);
        
        const response = await axios.post(`${API_URL}/users/login`, credentials);
        console.log('✅ Login exitoso');
        
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem('username', credentials.email.split('@')[0]);
        localStorage.setItem('authenticated', 'true');
        
        return {
            data: {
                user: {
                    email: credentials.email,
                    username: credentials.email.split('@')[0]
                }
            }
        };
        
    } catch (error) {
        console.error('❌ Error en login:', error);
        throw new Error('Credenciales incorrectas');
    }
};

export const register = async (userData) => {
    try {
        console.log('📝 Registro sin auth con:', userData.username);
        
        const response = await axios.post(`${API_URL}/users/register`, userData);
        console.log('✅ Registro exitoso');
        
        localStorage.setItem('userEmail', userData.email);
        localStorage.setItem('username', userData.username || userData.email.split('@')[0]);
        localStorage.setItem('authenticated', 'true');
        
        return {
            data: {
                user: {
                    email: userData.email,
                    username: userData.username || userData.email.split('@')[0]
                }
            }
        };
        
    } catch (error) {
        console.error('❌ Error en registro:', error);
        throw new Error('Error en el registro');
    }
};

export const isAuthenticated = () => {
    return localStorage.getItem('authenticated') === 'true';
};

export const logout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('username');
    localStorage.removeItem('authenticated');
    console.log('🚪 Sesión cerrada');
};