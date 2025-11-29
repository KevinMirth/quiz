import React, { useState } from 'react';
import CreateQuiz from './CreateQuiz';
import MyQuizzes from './MyQuizzes';
import AvailableQuizzes from './AvailableQuizzes';
import TakeQuiz from './TakeQuiz';
import QuizHistory from './QuizHistory';
import './Dashboard.css';

const Dashboard = ({ user, onProfileClick }) => {
  const [activeView, setActiveView] = useState('home');
  const [refreshQuizzes, setRefreshQuizzes] = useState(0);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  
  // Verifică rolul utilizatorului
  const isAdmin = user?.role === 'ADMIN';
  const isUser = user?.role === 'USER';

  const handleQuizCreated = () => {
    // Schimbă view-ul la "Quiz-urile Mele"
    setActiveView('quizzes');
    // Forțează reîmprospătarea listei
    setRefreshQuizzes(prev => prev + 1);
  };

  const handleTakeQuiz = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
    setRefreshQuizzes(prev => prev + 1);
  };

  const handleQuizSubmit = (result) => {
    console.log('Quiz completed with result:', result);
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
            
            {/* Butoane doar pentru ADMIN */}
            {isAdmin && (
              <>
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
              </>
            )}
            
            {/* Butoane doar pentru USER */}
            {isUser && (
              <>
                <button 
                  className={`menu-item ${activeView === 'available' ? 'active' : ''}`}
                  onClick={() => setActiveView('available')}
                >
                  📝 Quiz-uri Disponibile
                </button>
                <button 
                  className={`menu-item ${activeView === 'results' ? 'active' : ''}`}
                  onClick={() => setActiveView('results')}
                >
                  📊 Rezultatele Mele
                </button>
              </>
            )}
          </nav>
        </div>

        {/* Conținut principal */}
        <div className="main-content">
          {activeView === 'home' && (
            <div className="dashboard-main">
              <div className="welcome-section">
                <h1>Bine ai venit, {user.username}! 🎉</h1>
                <p className="subtitle">
                  {isAdmin ? 'Rol: Administrator' : 'Rol: Utilizator'}
                </p>
              </div>

              <div className="content-placeholder">
                <div className="placeholder-icon">📚</div>
                {isAdmin ? (
                  <>
                    <h3>Crează primul tău quiz!</h3>
                    <p>Apasă pe "Creare Quiz" din meniul din stânga pentru a începe.</p>
                  </>
                ) : (
                  <>
                    <h3>Rezolvă un quiz!</h3>
                    <p>Apasă pe "Quiz-uri Disponibile" din meniul din stânga pentru a începe.</p>
                  </>
                )}
              </div>
            </div>
          )}

          {activeView === 'create' && isAdmin && (
            <CreateQuiz onQuizCreated={handleQuizCreated} />
          )}

          {activeView === 'quizzes' && isAdmin && (
            <MyQuizzes key={refreshQuizzes} />
          )}

          {activeView === 'available' && isUser && (
            selectedQuiz ? (
              <TakeQuiz 
                quiz={selectedQuiz} 
                onBack={handleBackToQuizzes}
                onSubmit={handleQuizSubmit}
              />
            ) : (
              <AvailableQuizzes onTakeQuiz={handleTakeQuiz} />
            )
          )}

          {activeView === 'results' && isUser && (
            <QuizHistory />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
