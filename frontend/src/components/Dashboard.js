import React, { useState } from 'react';
import CreateQuiz from './CreateQuiz';
import MyQuizzes from './MyQuizzes';
import './Dashboard.css';

const Dashboard = ({ user, onProfileClick }) => {
  const [activeView, setActiveView] = useState('home');
  const [refreshQuizzes, setRefreshQuizzes] = useState(0);

  const handleQuizCreated = () => {
    // Schimbă view-ul la "Quiz-urile Mele"
    setActiveView('quizzes');
    // Forțează reîmprospătarea listei
    setRefreshQuizzes(prev => prev + 1);
  };

  return (
    <div className="dashboard-container">
      {/* Header cu butonul de profil în dreapta sus */}
      <div className="dashboard-navbar">
        <div className="navbar-brand">
          <h2>🎯 QuizApp</h2>
        </div>
        <button onClick={onProfileClick} className="btn-profile">
          👤 Profil
        </button>
      </div>

      <div className="dashboard-layout">
        {/* Meniu lateral stânga */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h3>Meniu</h3>
          </div>
          <nav className="sidebar-menu">
            <button 
              className={`menu-item ${activeView === 'home' ? 'active' : ''}`}
              onClick={() => setActiveView('home')}
            >
              🏠 Acasă
            </button>
            <button 
              className={`menu-item ${activeView === 'create' ? 'active' : ''}`}
              onClick={() => setActiveView('create')}
            >
              ➕ Creare Quiz
            </button>
            <button 
              className={`menu-item ${activeView === 'quizzes' ? 'active' : ''}`}
              onClick={() => setActiveView('quizzes')}
            >
              📚 Quiz-urile Mele
            </button>
            <button 
              className={`menu-item ${activeView === 'results' ? 'active' : ''}`}
              onClick={() => setActiveView('results')}
            >
              📊 Rezultate
            </button>
          </nav>
        </div>

        {/* Conținut principal */}
        <div className="main-content">
          {activeView === 'home' && (
            <div className="dashboard-main">
              <div className="welcome-section">
                <h1>Bine ai venit, {user.username}! 🎉</h1>
                <p className="subtitle">Pregătit pentru un quiz?</p>
              </div>

              <div className="content-placeholder">
                <div className="placeholder-icon">📚</div>
                <h3>Crează primul tău quiz!</h3>
                <p>Apasă pe "Creare Quiz" din meniul din stânga pentru a începe.</p>
              </div>
            </div>
          )}

          {activeView === 'create' && (
            <CreateQuiz onQuizCreated={handleQuizCreated} />
          )}

          {activeView === 'quizzes' && (
            <MyQuizzes key={refreshQuizzes} />
          )}

          {activeView === 'results' && (
            <div className="dashboard-main">
              <div className="content-placeholder">
                <div className="placeholder-icon">📊</div>
                <h3>Rezultatele Tale</h3>
                <p>Aici vei vedea statisticile și rezultatele obținute.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
