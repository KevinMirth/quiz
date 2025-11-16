import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authService from '../services/authService';
import './MyQuizzes.css';

const MyQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const token = authService.getCurrentToken();
      const response = await axios.get(
        'http://localhost:8080/api/quiz/my-quizzes',
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

  const handleViewQuiz = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleCloseDetails = () => {
    setSelectedQuiz(null);
  };

  if (loading) {
    return (
      <div className="my-quizzes-container">
        <div className="loading">⏳ Se încarcă quiz-urile...</div>
      </div>
    );
  }

  if (selectedQuiz) {
    return (
      <div className="my-quizzes-container">
        <div className="quiz-details">
          <button onClick={handleCloseDetails} className="btn-back">
            ← Înapoi la listă
          </button>
          
          <div className="quiz-details-header">
            <h1>📝 {selectedQuiz.title}</h1>
            <p>Creat la: {new Date(selectedQuiz.createdAt).toLocaleDateString('ro-RO')}</p>
          </div>

          <div className="questions-list">
            {selectedQuiz.questions.map((q, index) => (
              <div key={q.id} className="question-detail-card">
                <div className="question-detail-number">Întrebarea {index + 1}</div>
                <div className="question-detail-text">
                  <strong>Q:</strong> {q.questionText}
                </div>
                <div className="question-detail-answer">
                  <strong>R:</strong> {q.answerText}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-quizzes-container">
      <div className="my-quizzes-header">
        <h1>📚 Quiz-urile Mele</h1>
        <p>Aici sunt toate quiz-urile pe care le-ai creat</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {quizzes.length === 0 ? (
        <div className="no-quizzes">
          <div className="no-quizzes-icon">📭</div>
          <h3>Nu ai creat încă niciun quiz</h3>
          <p>Apasă pe "Creare Quiz" din meniul din stânga pentru a începe!</p>
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
              </div>
              <div className="quiz-card-footer">
                <button 
                  onClick={() => handleViewQuiz(quiz)} 
                  className="btn-view"
                >
                  👁️ Vezi detalii
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyQuizzes;