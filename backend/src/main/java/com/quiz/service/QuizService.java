package com.quiz.service;

import com.quiz.dto.CreateQuizRequest;
import com.quiz.dto.QuizResponse;
import com.quiz.model.Question;
import com.quiz.model.Quiz;
import com.quiz.repository.QuestionRepository;
import com.quiz.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizService {
    
    @Autowired
    private QuizRepository quizRepository;
    
    @Autowired
    private QuestionRepository questionRepository;
    
    @Transactional
    public QuizResponse createQuiz(Long userId, CreateQuizRequest request) {
        // Salvează quiz-ul
        Quiz quiz = new Quiz();
        quiz.setUserId(userId);
        quiz.setTitle(request.getTitle() != null ? request.getTitle() : "Quiz fără titlu");
        quiz = quizRepository.save(quiz);
        
        // Salvează întrebările
        List<Question> questions = new ArrayList<>();
        for (int i = 0; i < request.getQuestions().size(); i++) {
            CreateQuizRequest.QuestionDTO qDto = request.getQuestions().get(i);
            
            Question question = new Question();
            question.setQuizId(quiz.getId());
            question.setQuestionText(qDto.getQuestion());
            question.setAnswerText(qDto.getAnswer());
            question.setQuestionNumber(i + 1);
            
            questions.add(questionRepository.save(question));
        }
        
        // Returnează response
        return buildQuizResponse(quiz, questions);
    }
    
    public List<QuizResponse> getUserQuizzes(Long userId) {
        List<Quiz> quizzes = quizRepository.findByUserId(userId);
        
        return quizzes.stream()
                .map(quiz -> {
                    List<Question> questions = questionRepository.findByQuizIdOrderByQuestionNumber(quiz.getId());
                    return buildQuizResponse(quiz, questions);
                })
                .collect(Collectors.toList());
    }
    
    public QuizResponse getQuizById(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        
        List<Question> questions = questionRepository.findByQuizIdOrderByQuestionNumber(quizId);
        return buildQuizResponse(quiz, questions);
    }
    
    private QuizResponse buildQuizResponse(Quiz quiz, List<Question> questions) {
        QuizResponse response = new QuizResponse();
        response.setId(quiz.getId());
        response.setTitle(quiz.getTitle());
        response.setCreatedAt(quiz.getCreatedAt());
        
        List<QuizResponse.QuestionResponse> questionResponses = questions.stream()
                .map(q -> {
                    QuizResponse.QuestionResponse qr = new QuizResponse.QuestionResponse();
                    qr.setId(q.getId());
                    qr.setQuestionText(q.getQuestionText());
                    qr.setAnswerText(q.getAnswerText());
                    qr.setQuestionNumber(q.getQuestionNumber());
                    return qr;
                })
                .collect(Collectors.toList());
        
        response.setQuestions(questionResponses);
        return response;
    }
}
