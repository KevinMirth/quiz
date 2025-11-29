package com.quiz.repository;

import com.quiz.model.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    List<QuizResult> findByUserIdOrderByCompletedAtDesc(Long userId);
    List<QuizResult> findByQuizIdOrderByCompletedAtDesc(Long quizId);
}
