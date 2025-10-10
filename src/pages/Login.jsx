// pages/Login.jsx - VERSIÓN SIMPLIFICADA
import React, { useState } from "react";
import { login } from "../services/AuthService";

const Login = ({ onLogin, onSwitchToRegister }) => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            alert("Por favor, completa todos los campos");
            return;
        }

        setLoading(true);
        
        try {
            console.log('🚀 Iniciando sesión...');
            
            // 1. INTENTAR LOGIN
            const loginResponse = await login({
                email: form.email,
                password: form.password
            });
            
            console.log('✅ Login exitoso');
            
            // 2. OBTENER DATOS DIRECTAMENTE DEL LOCALSTORAGE
            const userEmail = localStorage.getItem('userEmail');
            const username = localStorage.getItem('username');
            
            console.log('📊 Datos del usuario:', { userEmail, username });
            
            if (userEmail) {
                // 3. NOTIFICAR ÉXITO
                onLogin({ 
                    email: userEmail, 
                    username: username 
                });
            } else {
                throw new Error('No se pudieron obtener los datos del usuario');
            }
            
        } catch (error) {
            console.error('❌ Error en el login:', error);
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-indigo-100">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-6 bg-white shadow-md rounded-xl w-80">
                <h1 className="text-2xl font-bold text-center text-indigo-600">Iniciar Sesión</h1>
                
                <input 
                    name="email" 
                    type="email"
                    placeholder="Email" 
                    value={form.email}
                    onChange={handleChange} 
                    className="p-2 border rounded" 
                    required 
                    disabled={loading}
                />
                
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Contraseña" 
                    value={form.password}
                    onChange={handleChange} 
                    className="p-2 border rounded" 
                    required 
                    disabled={loading}
                />
                
                <button 
                    type="submit"
                    className={`py-2 text-white rounded transition-colors ${
                        loading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                    disabled={loading}
                >
                    {loading ? 'Iniciando sesión...' : 'Entrar'}
                </button>
                
                <button 
                    type="button" 
                    onClick={onSwitchToRegister}
                    className="py-2 text-indigo-600 transition-colors bg-transparent rounded hover:bg-indigo-50"
                    disabled={loading}
                >
                    ¿No tienes cuenta? Regístrate
                </button>
            </form>
        </div>
    );
};

export default Login;