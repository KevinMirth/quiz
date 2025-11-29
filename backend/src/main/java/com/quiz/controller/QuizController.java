package com.quiz.controller;

import com.quiz.dto.CreateQuizRequest;
import com.quiz.dto.QuizResponse;
import com.quiz.dto.QuizResultResponse;
import com.quiz.dto.SubmitQuizRequest;
import com.quiz.security.services.UserDetailsImpl;
import com.quiz.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createQuiz(@RequestBody CreateQuizRequest request, Authentication authentication) {
        try {
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(401).body("Nu ești autentificat!");
            }
            
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long userId = userDetails.getId();
            
            System.out.println("Creating quiz for user: " + userId);
            System.out.println("Quiz title: " + request.getTitle());
            System.out.println("Number of questions: " + request.getQuestions().size());
            
            QuizResponse quiz = quizService.createQuiz(userId, request);
            return ResponseEntity.ok(quiz);
        } catch (ClassCastException e) {
            System.err.println("Authentication principal is not UserDetailsImpl: " + e.getMessage());
            return ResponseEntity.status(403).body("Token invalid sau expirat!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error creating quiz: " + e.getMessage());
        }
    }
    
    @GetMapping("/my-quizzes")
    @PreAuthorize("hasRole('ADMIN')")
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
    
    @GetMapping("/all")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getAllQuizzes() {
        try {
            List<QuizResponse> quizzes = quizService.getAllQuizzes();
            return ResponseEntity.ok(quizzes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching quizzes: " + e.getMessage());
        }
    }
    
    @PostMapping("/submit")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> submitQuiz(@RequestBody SubmitQuizRequest request, Authentication authentication) {
        try {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long userId = userDetails.getId();
            
            QuizResultResponse result = quizService.saveQuizResult(userId, request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error submitting quiz: " + e.getMessage());
        }
    }
    
    @GetMapping("/results")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getMyResults(Authentication authentication) {
        try {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long userId = userDetails.getId();
            
            List<QuizResultResponse> results = quizService.getUserResults(userId);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching results: " + e.getMessage());
        }
    }
}
