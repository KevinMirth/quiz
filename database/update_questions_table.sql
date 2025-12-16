USE quiz_db;

-- Șterge tabelul vechi
DROP TABLE IF EXISTS questions;

-- Creează noul tabel cu structura multiple choice
CREATE TABLE questions (
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

-- Șterge rezultatele vechi (nu mai sunt valide)
TRUNCATE TABLE quiz_results;

SELECT 'Migration complete! You can now create quizzes with multiple choice questions.' AS STATUS;
