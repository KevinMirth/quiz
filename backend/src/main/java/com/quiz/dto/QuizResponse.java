package com.quiz.dto;

import java.time.LocalDateTime;
import java.util.List;

public class QuizResponse {
    private Long id;
    private String title;
    private LocalDateTime createdAt;
    private String creatorUsername;
    private List<QuestionResponse> questions;
    
    public static class QuestionResponse {
        private Long id;
        private String questionText;
        private String optionA;
        private String optionB;
        private String optionC;
        private String optionD;
        private String correctAnswer;
        private Integer questionNumber;
        
        public Long getId() {
            return id;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public String getQuestionText() {
            return questionText;
        }
        
        public void setQuestionText(String questionText) {
            this.questionText = questionText;
        }
        
        public String getOptionA() {
            return optionA;
        }
        
        public void setOptionA(String optionA) {
            this.optionA = optionA;
        }
        
        public String getOptionB() {
            return optionB;
        }
        
        public void setOptionB(String optionB) {
            this.optionB = optionB;
        }
        
        public String getOptionC() {
            return optionC;
        }
        
        public void setOptionC(String optionC) {
            this.optionC = optionC;
        }
        
        public String getOptionD() {
            return optionD;
        }
        
        public void setOptionD(String optionD) {
            this.optionD = optionD;
        }
        
        public String getCorrectAnswer() {
            return correctAnswer;
        }
        
        public void setCorrectAnswer(String correctAnswer) {
            this.correctAnswer = correctAnswer;
        }
        
        public Integer getQuestionNumber() {
            return questionNumber;
        }
        
        public void setQuestionNumber(Integer questionNumber) {
            this.questionNumber = questionNumber;
        }
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public String getCreatorUsername() {
        return creatorUsername;
    }
    
    public void setCreatorUsername(String creatorUsername) {
        this.creatorUsername = creatorUsername;
    }
    
    public List<QuestionResponse> getQuestions() {
        return questions;
    }
    
    public void setQuestions(List<QuestionResponse> questions) {
        this.questions = questions;
    }
}
