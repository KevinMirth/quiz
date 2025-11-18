import React, { useState } from 'react';
import axios from 'axios';
import authService from '../services/authService';
import './CreateQuiz.css';

const CreateQuiz = ({ onQuizCreated }) => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].answer = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = authService.getCurrentToken();
      console.log('Token:', token ? 'exists' : 'missing');
      
      if (!token) {
        setError('Nu ești autentificat! Te rog să te loghezi din nou.');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        'http://localhost:8080/api/quiz/create',
        {
          title: title || 'Quiz fără titlu',
          questions: questions
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Quiz created successfully:', response.data);
      alert('Quiz-ul a fost creat cu succes! ✅');
      
      // Resetează formularul
      setTitle('');
      setQuestions([
        { question: '', answer: '' },
        { question: '', answer: '' },
        { question: '', answer: '' },
        { question: '', answer: '' },
        { question: '', answer: '' },
        { question: '', answer: '' },
        { question: '', answer: '' },
        { question: '', answer: '' },
        { question: '', answer: '' }
      ]);

      // Notifică parent component-ul
      if (onQuizCreated) {
        onQuizCreated();
      }
    } catch (err) {
      console.error('Error creating quiz:', err);
      console.error('Error response:', err.response);
      
      let errorMessage = 'Eroare la crearea quiz-ului. Încearcă din nou!';
      
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Sesiunea ta a expirat! Te rog să te loghezi din nou.';
        } else if (err.response.status === 403) {
          errorMessage = 'Nu ai permisiunea să creezi quiz-uri!';
        } else if (err.response.data) {
          errorMessage = typeof err.response.data === 'string' 
            ? err.response.data 
            : 'Eroare la server. Verifică console-ul pentru detalii.';
        }
      } else if (err.request) {
        errorMessage = 'Nu se poate conecta la server. Verifică dacă backend-ul rulează!';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-quiz-container">
      <div className="create-quiz-header">
        <h1>📝 Creare Quiz Nou</h1>
        <p>Completează titlul și cele 9 întrebări cu răspunsurile lor</p>
      </div>

      <form onSubmit={handleSubmit} className="quiz-form">
        <div className="title-section">
          <label htmlFor="quiz-title">Titlu Quiz:</label>
          <input
            id="quiz-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Quiz de Matematică, Quiz de Istorie..."
            className="title-input"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="questions-grid">
          {questions.map((q, index) => (
            <div key={index} className="question-block">
              <div className="question-number">Întrebarea {index + 1}</div>
              
              <div className="input-group">
                <label>Întrebare:</label>
                <textarea
                  value={q.question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  placeholder={`Scrie întrebarea ${index + 1}...`}
                  rows="3"
                  required
                />
              </div>

              <div className="input-group">
                <label>Răspuns:</label>
                <input
                  type="text"
                  value={q.answer}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder={`Răspunsul corect pentru întrebarea ${index + 1}...`}
                  required
                />
              </div>
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? '⏳ Se salvează...' : '✅ Salvează Quiz-ul'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;
