import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authService from '../services/authService';
import './QuizHistory.css';

const QuizHistory = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const token = authService.getCurrentToken();
      const response = await axios.get(
        'http://localhost:8080/api/quiz/results',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setResults(response.data);
    } catch (err) {
      console.error('Error fetching results:', err);
      setError('Eroare la încărcarea istoricului');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#28a745';
    if (score >= 60) return '#ffc107';
    return '#dc3545';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excelent';
    if (score >= 60) return 'Bine';
    return 'Slab';
  };

  if (loading) {
    return (
      <div className="quiz-history-container">
        <div className="loading">⏳ Se încarcă istoricul...</div>
      </div>
    );
  }

  return (
    <div className="quiz-history-container">
      <div className="quiz-history-header">
        <h1>📊 Istoricul Meu</h1>
        <p>Toate quiz-urile pe care le-ai completat</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {results.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">📭</div>
          <h3>Nu ai completat încă niciun quiz</h3>
          <p>Apasă pe "Quiz-uri Disponibile" pentru a începe!</p>
        </div>
      ) : (
        <>
          <div className="stats-summary">
            <div className="stat-card">
              <div className="stat-value">{results.length}</div>
              <div className="stat-label">Quiz-uri Completate</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {(results.reduce((sum, r) => sum + parseFloat(r.score), 0) / results.length).toFixed(1)}%
              </div>
              <div className="stat-label">Medie Generală</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {results.reduce((sum, r) => sum + r.correctAnswers, 0)}
              </div>
              <div className="stat-label">Răspunsuri Corecte</div>
            </div>
          </div>

          <div className="results-timeline">
            {results.map((result) => (
              <div key={result.id} className="result-card">
                <div className="result-header">
                  <h3>{result.quizTitle}</h3>
                  <div 
                    className="score-badge" 
                    style={{ backgroundColor: getScoreColor(result.score) }}
                  >
                    {result.score.toFixed(0)}%
                  </div>
                </div>
                
                <div className="result-body">
                  <div className="result-info">
                    <span className="info-icon">✅</span>
                    <span>
                      {result.correctAnswers} din {result.totalQuestions} răspunsuri corecte
                    </span>
                  </div>
                  
                  <div className="result-info">
                    <span className="info-icon">📈</span>
                    <span>Performanță: {getScoreLabel(result.score)}</span>
                  </div>
                  
                  <div className="result-info">
                    <span className="info-icon">📅</span>
                    <span>
                      {new Date(result.completedAt).toLocaleDateString('ro-RO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>

                <div className="result-progress">
                  <div 
                    className="progress-bar-fill" 
                    style={{ 
                      width: `${result.score}%`,
                      backgroundColor: getScoreColor(result.score)
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default QuizHistory;
