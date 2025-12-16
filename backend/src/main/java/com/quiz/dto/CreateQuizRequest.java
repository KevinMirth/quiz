package com.quiz.dto;

import java.util.List;

public class CreateQuizRequest {
    private String title;
    private List<QuestionDTO> questions;
    
    public static class QuestionDTO {
        private String question;
        private String optionA;
        private String optionB;
        private String optionC;
        private String optionD;
        private String correctAnswer;
        
        public String getQuestion() {
            return question;
        }
        
        public void setQuestion(String question) {
            this.question = question;
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
