import React, { useState } from 'react';
import './TakeQuiz.css';

const TakeQuiz = ({ quiz, onBack, onSubmit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Calculează scorul
    let correctAnswers = 0;
    quiz.questions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (userAnswer && userAnswer.toLowerCase().trim() === question.answerText.toLowerCase().trim()) {
        correctAnswers++;
      }
    });

    const finalScore = (correctAnswers / quiz.questions.length) * 100;
    setScore(finalScore);
    setShowResults(true);

    // Notifică componenta părinte
    if (onSubmit) {
      onSubmit({
        quizId: quiz.id,
        score: finalScore,
        correctAnswers,
        totalQuestions: quiz.questions.length
      });
    }
  };

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const allAnswered = quiz.questions.every(q => answers[q.id]);

  if (showResults) {
    return (
      <div className="take-quiz-container">
        <div className="results-container">
          <div className="results-header">
            <h1>🎉 Quiz Completat!</h1>
            <h2>{quiz.title}</h2>
          </div>

          <div className="score-display">
            <div className="score-circle">
              <div className="score-value">{score.toFixed(0)}%</div>
              <div className="score-label">Scor Final</div>
            </div>
          </div>

          <div className="results-summary">
            <div className="summary-item">
              <span className="summary-label">Răspunsuri corecte:</span>
              <span className="summary-value">
                {quiz.questions.filter(q => 
                  answers[q.id] && answers[q.id].toLowerCase().trim() === q.answerText.toLowerCase().trim()
                ).length} / {quiz.questions.length}
              </span>
            </div>
          </div>

          <div className="results-details">
            <h3>Detalii Răspunsuri:</h3>
            {quiz.questions.map((question, index) => {
              const userAnswer = answers[question.id] || 'Niciun răspuns';
              const isCorrect = userAnswer.toLowerCase().trim() === question.answerText.toLowerCase().trim();
              
              return (
                <div key={question.id} className={`result-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="result-question">
                    <strong>Întrebarea {index + 1}:</strong> {question.questionText}
                  </div>
                  <div className="result-answer">
                    <span className="result-icon">{isCorrect ? '✅' : '❌'}</span>
                    <div>
                      <div>Răspunsul tău: <strong>{userAnswer}</strong></div>
                      {!isCorrect && (
                        <div className="correct-answer">
                          Răspuns corect: <strong>{question.answerText}</strong>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="results-actions">
            <button onClick={onBack} className="btn-back-to-list">
              ← Înapoi la Quiz-uri
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="take-quiz-container">
      <div className="quiz-header">
        <button onClick={onBack} className="btn-back">← Înapoi</button>
        <h1>{quiz.title}</h1>
        <div className="quiz-progress">
          Întrebarea {currentQuestion + 1} din {quiz.questions.length}
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="question-container">
        <div className="question-number">Întrebarea {currentQuestion + 1}</div>
        <div className="question-text">{currentQ.questionText}</div>

        <div className="answer-input-group">
          <label htmlFor="answer-input">Răspunsul tău:</label>
          <input
            id="answer-input"
            type="text"
            value={answers[currentQ.id] || ''}
            onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
            placeholder="Scrie răspunsul aici..."
            className="answer-input"
          />
        </div>

        <div className="navigation-buttons">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="btn-nav btn-previous"
          >
            ← Anterior
          </button>

          {currentQuestion < quiz.questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="btn-nav btn-next"
            >
              Următorul →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="btn-submit-quiz"
              title={!allAnswered ? 'Răspunde la toate întrebările' : ''}
            >
              ✅ Trimite Răspunsurile
            </button>
          )}
        </div>

        {!allAnswered && currentQuestion === quiz.questions.length - 1 && (
          <div className="warning-message">
            ⚠️ Trebuie să răspunzi la toate întrebările înainte de a trimite!
          </div>
        )}
      </div>

      <div className="questions-overview">
        <h4>Progres Răspunsuri:</h4>
        <div className="questions-grid-overview">
          {quiz.questions.map((q, index) => (
            <div
              key={q.id}
              className={`question-dot ${answers[q.id] ? 'answered' : ''} ${index === currentQuestion ? 'current' : ''}`}
              onClick={() => setCurrentQuestion(index)}
              title={`Întrebarea ${index + 1}${answers[q.id] ? ' - Răspuns' : ' - Fără răspuns'}`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TakeQuiz;
