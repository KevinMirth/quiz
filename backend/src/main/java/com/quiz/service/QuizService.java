package com.quiz.service;

import com.quiz.dto.CreateQuizRequest;
import com.quiz.dto.QuizResponse;
import com.quiz.dto.QuizResultResponse;
import com.quiz.dto.SubmitQuizRequest;
import com.quiz.model.Question;
import com.quiz.model.Quiz;
import com.quiz.model.QuizResult;
import com.quiz.model.User;
import com.quiz.repository.QuestionRepository;
import com.quiz.repository.QuizRepository;
import com.quiz.repository.QuizResultRepository;
import com.quiz.repository.UserRepository;
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
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private QuizResultRepository quizResultRepository;
    
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
            question.setOptionA(qDto.getOptionA());
            question.setOptionB(qDto.getOptionB());
            question.setOptionC(qDto.getOptionC());
            question.setOptionD(qDto.getOptionD());
            question.setCorrectAnswer(qDto.getCorrectAnswer().toUpperCase());
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
    
    public List<QuizResponse> getAllQuizzes() {
        List<Quiz> quizzes = quizRepository.findAll();
        
        return quizzes.stream()
                .map(quiz -> {
                    List<Question> questions = questionRepository.findByQuizIdOrderByQuestionNumber(quiz.getId());
                    return buildQuizResponse(quiz, questions);
                })
                .collect(Collectors.toList());
    }
    
    private QuizResponse buildQuizResponse(Quiz quiz, List<Question> questions) {
        QuizResponse response = new QuizResponse();
        response.setId(quiz.getId());
        response.setTitle(quiz.getTitle());
        response.setCreatedAt(quiz.getCreatedAt());
        
        // Adaugă username-ul creatorului
        User creator = userRepository.findById(quiz.getUserId()).orElse(null);
        if (creator != null) {
            response.setCreatorUsername(creator.getUsername());
        }
        
        List<QuizResponse.QuestionResponse> questionResponses = questions.stream()
                .map(q -> {
                    QuizResponse.QuestionResponse qr = new QuizResponse.QuestionResponse();
                    qr.setId(q.getId());
                    qr.setQuestionText(q.getQuestionText());
                    qr.setOptionA(q.getOptionA());
                    qr.setOptionB(q.getOptionB());
                    qr.setOptionC(q.getOptionC());
                    qr.setOptionD(q.getOptionD());
                    qr.setCorrectAnswer(q.getCorrectAnswer());
                    qr.setQuestionNumber(q.getQuestionNumber());
                    return qr;
                })
                .collect(Collectors.toList());
        
        response.setQuestions(questionResponses);
        return response;
    }
    
    @Transactional
    public QuizResultResponse saveQuizResult(Long userId, SubmitQuizRequest request) {
        QuizResult result = new QuizResult();
        result.setUserId(userId);
        result.setQuizId(request.getQuizId());
        result.setScore(request.getScore());
        result.setCorrectAnswers(request.getCorrectAnswers());
        result.setTotalQuestions(request.getTotalQuestions());
        
        result = quizResultRepository.save(result);
        
        return buildQuizResultResponse(result);
    }
    
    public List<QuizResultResponse> getUserResults(Long userId) {
        List<QuizResult> results = quizResultRepository.findByUserIdOrderByCompletedAtDesc(userId);
        
        return results.stream()
                .map(this::buildQuizResultResponse)
                .collect(Collectors.toList());
    }
    
    private QuizResultResponse buildQuizResultResponse(QuizResult result) {
        QuizResultResponse response = new QuizResultResponse();
        response.setId(result.getId());
        response.setQuizId(result.getQuizId());
        response.setScore(result.getScore());
        response.setCorrectAnswers(result.getCorrectAnswers());
        response.setTotalQuestions(result.getTotalQuestions());
        response.setCompletedAt(result.getCompletedAt());
        
        // Adaugă titlul quiz-ului
        Quiz quiz = quizRepository.findById(result.getQuizId()).orElse(null);
        if (quiz != null) {
            response.setQuizTitle(quiz.getTitle());
        }
        
        return response;
    }
}
