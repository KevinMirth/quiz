import React from 'react';
import authService from '../services/authService';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const handleLogout = () => {
    authService.logout();
    onLogout();
  };
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Bine ai venit, {user.username}! 🎉</h1>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>
      
      <div className="dashboard-content">
        <div className="user-info-card">
          <h2>Informațiile tale</h2>
          <div className="info-item">
            <strong>Username:</strong> {user.username}
          </div>
          <div className="info-item">
            <strong>Email:</strong> {user.email}
          </div>
          <div className="info-item">
            <strong>ID:</strong> {user.id}
          </div>
        </div>

        <div className="welcome-card">
          <h2>Aplicație Quiz</h2>
          <p>Autentificarea funcționează perfect! ✅</p>
          <p>Datele tale sunt salvate în baza de date MySQL.</p>
          <p className="note">
            Aici poți adăuga în viitor quiz-urile și alte funcționalități.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
