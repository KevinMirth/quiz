package com.quiz.dto;

import java.util.List;

public class CreateQuizRequest {
    private String title;
    private List<QuestionDTO> questions;
    
    public static class QuestionDTO {
        private String question;
        private String answer;
        
        public String getQuestion() {
            return question;
        }
        
        public void setQuestion(String question) {
            this.question = question;
        }
        
        public String getAnswer() {
            return answer;
        }
        
        public void setAnswer(String answer) {
            this.answer = answer;
        }
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public List<QuestionDTO> getQuestions() {
        return questions;
    }
    
    public void setQuestions(List<QuestionDTO> questions) {
        this.questions = questions;
    }
}
