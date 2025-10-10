import axios from 'axios';

const API_URL = 'https://taskmanager-backend-megy.onrender.com';

const authAxios = axios.create();

authAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('🔑 Auth Interceptor: Token added to', config.url);
        } else {
        console.log('🔑 Auth Interceptor: No token available');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const login = async (credentials) => {
    try {
        console.log('🔐 Attempting login with:', credentials);
        
        // ✅ Para login, usa axios normal (sin autenticación)
        const response = await axios.post(`${API_URL}/users/login`, { 
            email: credentials.email,
            password: credentials.password
        });
        
        console.log('✅ Login successful:', response.data);
        
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            console.log('💾 Token saved to localStorage');
            
            // ✅ VERIFICACIÓN INMEDIATA
            const verifyToken = localStorage.getItem('token');
            console.log('🔍 Token verification:', verifyToken ? '✅ PRESENT' : '❌ MISSING');
        } else {
            console.log('❌ No token in login response');
            throw new Error('No token received from server');
        }
        
        return response;
    } catch (error) {
        console.error('❌ Login error:', error);
        throw error;
    }
};

export const register = async (userData) => {
    try {
        console.log('📝 Attempting register with:', userData);
        
        const response = await axios.post(`${API_URL}/users/register`, userData);
        
        console.log('✅ Register successful:', response.data);
        
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            console.log('💾 Token saved to localStorage');
        }
        
        return response;
    } catch (error) {
        console.error('❌ Register error:', error);
        throw error;
    }
};

export const getUserInfo = async (userEmail) => {
    try {
        console.log('👤 Fetching user info for:', userEmail);
        
        
        console.log('🔄 Attempting with authAxios instance...');
        const response = await authAxios.get(`${API_URL}/tasks/user-info?userEmail=${userEmail}`);
        
        console.log('✅ User info fetched successfully with authAxios');
        return response.data;
        
    } catch (error) {
        console.error('❌ authAxios failed, trying manual headers...');
        
        
        try {
            const token = localStorage.getItem('token');
            console.log('🔍 Current token for manual request:', token);
            
            if (!token) {
                throw new Error('No token available for manual request');
            }
            
            const manualResponse = await axios.get(
                `${API_URL}/tasks/user-info?userEmail=${userEmail}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            console.log('✅ User info fetched with manual headers');
            return manualResponse.data;
            
        } catch (manualError) {
            console.error('❌ Manual headers also failed:', manualError);
            
            
            try {
                console.log('🔄 Trying with fetch API...');
                const token = localStorage.getItem('token');
                
                const fetchResponse = await fetch(
                    `${API_URL}/tasks/user-info?userEmail=${encodeURIComponent(userEmail)}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                
                if (!fetchResponse.ok) {
                    throw new Error(`HTTP ${fetchResponse.status}`);
                }
                
                const data = await fetchResponse.json();
                console.log('✅ User info fetched with fetch API');
                return data;
                
            } catch (fetchError) {
                console.error('❌ All methods failed:', fetchError);
                throw new Error(`Cannot authenticate: ${fetchError.message}`);
            }
        }
    }
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('username');
    console.log('🚪 User logged out');
};