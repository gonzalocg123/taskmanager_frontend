// pages/Register.jsx - VERSIÓN SIMPLIFICADA
import React, { useState } from "react";
import { register } from "../services/AuthService";

const Register = ({ onSwitchToLogin, onRegister }) => {
    const [form, setForm] = useState({ 
        username: "", 
        email: "", 
        password: "", 
        confirmPassword: "" 
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!form.username || !form.email || !form.password) {
            alert("Por favor, completa todos los campos");
            return;
        }

        if (form.password !== form.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        setLoading(true);
        
        try {
            console.log('🚀 Registrando usuario...');
            
            const registerResponse = await register({
                username: form.username,
                email: form.email,
                password: form.password
            });
            
            console.log('✅ Registro exitoso');
            
            // OBTENER DATOS DIRECTAMENTE DEL LOCALSTORAGE
            const userEmail = localStorage.getItem('userEmail');
            const username = localStorage.getItem('username');
            
            if (userEmail) {
                onRegister({ 
                    email: userEmail, 
                    username: username 
                });
            } else {
                throw new Error('No se pudieron obtener los datos del usuario');
            }
            
        } catch (error) {
            console.error('❌ Error en el registro:', error);
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-indigo-100">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-6 bg-white shadow-md rounded-xl w-80">
                <h1 className="text-2xl font-bold text-center text-indigo-600">Registrarse</h1>
                
                <input 
                    name="username" 
                    type="text"
                    placeholder="Nombre de usuario" 
                    value={form.username}
                    onChange={handleChange} 
                    className="p-2 border rounded" 
                    required 
                    disabled={loading}
                />
                
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
                
                <input 
                    name="confirmPassword" 
                    type="password" 
                    placeholder="Confirmar contraseña" 
                    value={form.confirmPassword}
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
                    {loading ? 'Registrando...' : 'Registrarse'}
                </button>
                
                <button 
                    type="button" 
                    onClick={onSwitchToLogin}
                    className="py-2 text-indigo-600 transition-colors bg-transparent rounded hover:bg-indigo-50"
                    disabled={loading}
                >
                    ¿Ya tienes cuenta? Inicia sesión
                </button>
            </form>
        </div>
    );
};

export default Register;