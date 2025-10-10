import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { isAuthenticated } from "./services/AuthService";


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail");
    
    if (token && userEmail) {
      setCurrentUser({ 
        email: userEmail, 
        username: localStorage.getItem("username") || userEmail 
      });
      setLoggedIn(true);
    }
    setLoading(false);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("username");
    setLoggedIn(false);
    setCurrentUser(null);
  };

  const handleAuthSuccess = (userData) => {
    setCurrentUser(userData);
    setLoggedIn(true);
  };

  const handleTaskAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleTaskUpdated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const switchToRegister = () => setShowLogin(false);
  const switchToLogin = () => setShowLogin(true);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-indigo-100">
      <div className="text-xl">Cargando...</div>
    </div>;
  }

  if (!loggedIn) {
    return showLogin ? (
      <Login onLogin={handleAuthSuccess} onSwitchToRegister={switchToRegister} />
    ) : (
      <Register onRegister={handleAuthSuccess} onSwitchToLogin={switchToLogin} />
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-10 bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-indigo-600">🧠 Task Manager</h1>
            {currentUser && (
              <p className="mt-1 text-lg text-gray-700">
                ¡Hola, <span className="font-semibold text-indigo-600">
                  {currentUser.username}
                </span>! 👋
              </p>
            )}
          </div>
          <button 
            onClick={handleLogout} 
            className="px-4 py-2 text-sm text-white transition-colors bg-red-500 rounded hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        </div>
        
        <TaskForm onTaskAdded={handleTaskAdded} userEmail={currentUser?.email} />
        <TaskList 
          refreshTrigger={refreshTrigger} 
          onTaskUpdated={handleTaskUpdated}
          userEmail={currentUser?.email}
        />
      </div>
    </div>
  );
};

export default App;