import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authService from '../services/authService';
import './AvailableQuizzes.css';

const AvailableQuizzes = ({ onTakeQuiz }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const token = authService.getCurrentToken();
      const response = await axios.get(
        'http://localhost:8080/api/quiz/all',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setQuizzes(response.data);
    } catch (err) {
      console.error('Error fetching quizzes:', err);
      setError('Eroare la încărcarea quiz-urilor');
    } finally {
      setLoading(false);
    }
  };

  const handleTakeQuiz = (quiz) => {
    onTakeQuiz(quiz);
  };

  if (loading) {
    return (
      <div className="available-quizzes-container">
        <div className="loading">⏳ Se încarcă quiz-urile...</div>
      </div>
    );
  }

  return (
    <div className="available-quizzes-container">
      <div className="available-quizzes-header">
        <h1>📝 Quiz-uri Disponibile</h1>
        <p>Alege un quiz și începe să îl rezolvi!</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {quizzes.length === 0 ? (
        <div className="no-quizzes">
          <div className="no-quizzes-icon">📭</div>
          <h3>Nu sunt quiz-uri disponibile momentan</h3>
          <p>Revino mai târziu pentru a rezolva quiz-uri noi!</p>
        </div>
      ) : (
        <div className="quizzes-grid">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-card">
              <div className="quiz-card-header">
                <h3>{quiz.title}</h3>
                <span className="quiz-badge">{quiz.questions.length} întrebări</span>
              </div>
              <div className="quiz-card-body">
                <p className="quiz-date">
                  📅 Creat: {new Date(quiz.createdAt).toLocaleDateString('ro-RO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="quiz-creator">
                  👤 Creat de: {quiz.creatorUsername || 'Administrator'}
                </p>
              </div>
              <div className="quiz-card-footer">
                <button 
                  onClick={() => handleTakeQuiz(quiz)} 
                  className="btn-take-quiz"
                >
                  🎯 Rezolvă Quiz-ul
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableQuizzes;
