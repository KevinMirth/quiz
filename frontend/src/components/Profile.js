import React from 'react';
import './Profile.css';

const Profile = ({ user, onBack, onLogout }) => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <button onClick={onBack} className="btn-back">
          ← Înapoi la Dashboard
        </button>
        <h1>Profilul Meu</h1>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar">
            <span className="avatar-icon">👤</span>
          </div>
          
          <div className="profile-info">
            <h2>{user.username}</h2>
            <p className="profile-email">{user.email}</p>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-label">ID:</span>
              <span className="detail-value">{user.id}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Username:</span>
              <span className="detail-value">{user.username}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{user.email}</span>
            </div>
          </div>

          <div className="profile-actions">
            <button onClick={onLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
