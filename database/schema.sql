-- Creare bază de date
CREATE DATABASE IF NOT EXISTS quiz_db;
USE quiz_db;

-- Creare tabelă users
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Verificare tabel
DESC users;

-- Afișare utilizatori (pentru testare)
-- SELECT * FROM users;
