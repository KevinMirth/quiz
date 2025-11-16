import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import authService from './services/authService';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);

  // Verifică dacă utilizatorul este deja autentificat
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = authService.getCurrentToken();
    
    // Verifică dacă există și user și token JWT
    if (savedUser && token) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setCurrentView('dashboard');
      } catch (error) {
        console.error('Error parsing saved user:', error);
        authService.logout();
      }
    } else {
      // Dacă lipsește token-ul sau user-ul, logout complet
      authService.logout();
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleRegisterSuccess = (userData) => {
    console.log('Registration successful:', userData);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setCurrentView('login');
  };

  const switchToLogin = () => setCurrentView('login');
  const switchToRegister = () => setCurrentView('register');
  const switchToProfile = () => setCurrentView('profile');
  const switchToDashboard = () => setCurrentView('dashboard');

  return (
    <div className="App">
      {currentView === 'login' && (
        <Login
          onSwitchToRegister={switchToRegister}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      
      {currentView === 'register' && (
        <Register
          onSwitchToLogin={switchToLogin}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}
      
      {currentView === 'dashboard' && user && (
        <Dashboard 
          user={user} 
          onProfileClick={switchToProfile}
        />
      )}

      {currentView === 'profile' && user && (
        <Profile 
          user={user} 
          onBack={switchToDashboard}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
