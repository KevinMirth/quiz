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
      const response = await axios.post(
        'http://localhost:8080/api/quiz/create',
        {
          title: title || 'Quiz fără titlu',
          questions: questions
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

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
      setError('Eroare la crearea quiz-ului. Încearcă din nou!');
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
