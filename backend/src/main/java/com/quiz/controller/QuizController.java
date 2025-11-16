package com.quiz.controller;

import com.quiz.dto.CreateQuizRequest;
import com.quiz.dto.QuizResponse;
import com.quiz.security.services.UserDetailsImpl;
import com.quiz.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "http://localhost:3000")
public class QuizController {
    
    @Autowired
    private QuizService quizService;
    
    @PostMapping("/create")
    public ResponseEntity<?> createQuiz(@RequestBody CreateQuizRequest request, Authentication authentication) {
        try {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long userId = userDetails.getId();
            
            QuizResponse quiz = quizService.createQuiz(userId, request);
            return ResponseEntity.ok(quiz);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating quiz: " + e.getMessage());
        }
    }
    
    @GetMapping("/my-quizzes")
    public ResponseEntity<?> getMyQuizzes(Authentication authentication) {
        try {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long userId = userDetails.getId();
            
            List<QuizResponse> quizzes = quizService.getUserQuizzes(userId);
            return ResponseEntity.ok(quizzes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching quizzes: " + e.getMessage());
        }
    }
    
    @GetMapping("/{quizId}")
    public ResponseEntity<?> getQuiz(@PathVariable Long quizId) {
        try {
            QuizResponse quiz = quizService.getQuizById(quizId);
            return ResponseEntity.ok(quiz);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching quiz: " + e.getMessage());
        }
    }
}
