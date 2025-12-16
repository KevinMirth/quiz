package com.quiz.model;

import jakarta.persistence.*;

@Entity
@Table(name = "questions")
public class Question {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "quiz_id", nullable = false)
    private Long quizId;
    
    @Column(name = "question_text", columnDefinition = "TEXT", nullable = false)
    private String questionText;
    
    @Column(name = "option_a", length = 500, nullable = false)
    private String optionA;
    
    @Column(name = "option_b", length = 500, nullable = false)
    private String optionB;
    
    @Column(name = "option_c", length = 500, nullable = false)
    private String optionC;
    
    @Column(name = "option_d", length = 500, nullable = false)
    private String optionD;
    
    @Column(name = "correct_answer", length = 1, nullable = false)
    private String correctAnswer;
    
    @Column(name = "question_number", nullable = false)
    private Integer questionNumber;
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getQuizId() {
        return quizId;
    }
    
    public void setQuizId(Long quizId) {
        this.quizId = quizId;
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
