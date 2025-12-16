-- Scriptul de migrare pentru a transforma întrebările existente în format multiple choice
-- ATENȚIE: Acest script va șterge datele existente din tabelul questions
-- Asigură-te că ai făcut backup înainte de a rula acest script!

USE quiz_db;

-- Șterge tabelul vechi de questions
DROP TABLE IF EXISTS questions;

-- Recrează tabelul cu noua structură
CREATE TABLE IF NOT EXISTS questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quiz_id BIGINT NOT NULL,
    question_text TEXT NOT NULL,
    option_a VARCHAR(500) NOT NULL,
    option_b VARCHAR(500) NOT NULL,
    option_c VARCHAR(500) NOT NULL,
    option_d VARCHAR(500) NOT NULL,
    correct_answer CHAR(1) NOT NULL,
    question_number INT NOT NULL,
    INDEX idx_quiz_id (quiz_id),
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
    CHECK (correct_answer IN ('A', 'B', 'C', 'D'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Șterge rezultatele existente pentru că nu mai sunt valide
TRUNCATE TABLE quiz_results;

SELECT 'Migrare completă! Tabelul questions a fost recreat cu noua structură multiple choice.' as STATUS;
