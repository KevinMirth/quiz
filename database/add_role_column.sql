-- Script pentru adăugarea coloanei role în tabela users
USE quiz_db;

-- Verifică dacă coloana role există deja
SELECT COUNT(*) as column_exists 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'quiz_db' 
AND TABLE_NAME = 'users' 
AND COLUMN_NAME = 'role';

-- Adaugă coloana role dacă nu există
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'USER';

-- Actualizează toți utilizatorii existenți să aibă rolul USER (dacă e nevoie)
UPDATE users 
SET role = 'USER' 
WHERE role IS NULL OR role = '';

-- Verifică rezultatul
SELECT id, username, email, role, created_at 
FROM users;
