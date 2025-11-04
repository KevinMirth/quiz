# Aplicație Quiz - Documentație

## 📋 Descriere
Aplicație quiz cu sistem de autentificare complet (login și înregistrare) folosind:
- **Frontend**: React
- **Backend**: Spring Boot
- **Comunicare**: Axios
- **Bază de date**: MySQL

---

## 🚀 Instalare și Configurare

### 1. Baza de date MySQL

**Pasul 1**: Pornește serverul MySQL

**Pasul 2**: Rulează scriptul SQL pentru crearea bazei de date
```sql
mysql -u root -p < database/schema.sql
```

SAU conectează-te la MySQL și rulează manual comenzile din `database/schema.sql`:
```sql
CREATE DATABASE IF NOT EXISTS quiz_db;
USE quiz_db;
```

**Pasul 3**: Configurează credențialele în `backend/src/main/resources/application.properties`
```properties
spring.datasource.username=root
spring.datasource.password=root
```
*(Modifică username și password cu credențialele tale MySQL)*

---

### 2. Backend (Spring Boot)

**Pasul 1**: Navighează în folderul backend
```bash
cd backend
```

**Pasul 2**: Instalează dependențele și rulează aplicația
```bash
# Cu Maven Wrapper (recomandat)
./mvnw clean install
./mvnw spring-boot:run

# SAU cu Maven instalat global
mvn clean install
mvn spring-boot:run
```

**Backend-ul va rula pe**: `http://localhost:8080`

**Endpoints disponibile**:
- `POST /api/auth/register` - Înregistrare utilizator nou
- `POST /api/auth/login` - Autentificare utilizator
- `GET /api/auth/test` - Test conexiune API

---

### 3. Frontend (React)

**Pasul 1**: Navighează în folderul frontend
```bash
cd frontend
```

**Pasul 2**: Instalează dependențele
```bash
npm install
```

**Pasul 3**: Pornește aplicația React
```bash
npm start
```

**Frontend-ul va rula pe**: `http://localhost:3000`

---

## 📁 Structura Proiectului

```
quiz/
├── backend/                          # Spring Boot Backend
│   ├── src/main/java/com/quiz/
│   │   ├── QuizApplication.java     # Clasa principală
│   │   ├── config/
│   │   │   └── CorsConfig.java      # Configurare CORS
│   │   ├── controller/
│   │   │   └── AuthController.java  # REST endpoints
│   │   ├── dto/
│   │   │   ├── LoginRequest.java
│   │   │   ├── RegisterRequest.java
│   │   │   └── AuthResponse.java
│   │   ├── model/
│   │   │   └── User.java            # Entitate JPA
│   │   ├── repository/
│   │   │   └── UserRepository.java  # Repository JPA
│   │   └── service/
│   │       └── UserService.java     # Logică business
│   ├── src/main/resources/
│   │   └── application.properties   # Configurare aplicație
│   └── pom.xml                      # Dependențe Maven
│
├── frontend/                         # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js            # Componenta Login
│   │   │   ├── Login.css           # Stiluri autentificare
│   │   │   ├── Register.js         # Componenta Register
│   │   │   ├── Dashboard.js        # Pagina după autentificare
│   │   │   └── Dashboard.css       # Stiluri dashboard
│   │   ├── services/
│   │   │   └── authService.js      # Serviciu Axios
│   │   ├── App.js                  # Componenta principală
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json                # Dependențe npm
│
└── database/
    └── schema.sql                   # Script creare bază de date
```

---

## 🔧 Funcționalități Implementate

### ✅ Backend
- ✔️ Configurare Spring Boot cu JPA și MySQL
- ✔️ Entitatea User cu validări
- ✔️ Repository pentru operațiuni CRUD
- ✔️ Service pentru logica de autentificare
- ✔️ Controller REST cu endpoints pentru login și register
- ✔️ Configurare CORS pentru comunicare cu React
- ✔️ Validare date (username, email, parolă)
- ✔️ Verificare duplicare username/email

### ✅ Frontend
- ✔️ Componente React pentru Login și Register
- ✔️ Design responsive și atractiv
- ✔️ Validare formulare client-side
- ✔️ Integrare Axios pentru comunicare cu backend
- ✔️ Gestionare stări și erori
- ✔️ Dashboard după autentificare reușită
- ✔️ Salvare date utilizator în localStorage
- ✔️ Funcționalitate logout

### ✅ Baza de date
- ✔️ Creare automată bază de date și tabele
- ✔️ Tabel users cu toate câmpurile necesare
- ✔️ Indexuri pentru performanță
- ✔️ Validări la nivel de bază de date

---

## 🎯 Testare Aplicație

### 1. Testează Backend-ul separat
Folosește Postman sau cURL:

**Register**:
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@email.com",
    "password": "password123"
  }'
```

**Login**:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "usernameOrEmail": "testuser",
    "password": "password123"
  }'
```

### 2. Testează aplicația completă
1. Pornește MySQL
2. Pornește backend-ul (port 8080)
3. Pornește frontend-ul (port 3000)
4. Deschide browser la `http://localhost:3000`
5. Încearcă să te înregistrezi cu un utilizator nou
6. Verifică în MySQL că utilizatorul a fost salvat
7. Fă login cu credențialele create

---

## 📊 Verificare Date în MySQL

```sql
-- Conectare la MySQL
mysql -u root -p

-- Selectare bază de date
USE quiz_db;

-- Afișare toți utilizatorii
SELECT * FROM users;

-- Afișare număr utilizatori
SELECT COUNT(*) FROM users;

-- Ștergere utilizator (pentru testare)
DELETE FROM users WHERE username = 'testuser';
```

---

## ⚠️ Note Importante

### Securitate
**⚠️ IMPORTANT**: Parola este salvată în plain text pentru simplitate în dezvoltare.
Pentru producție, trebuie implementat:
- **BCrypt** pentru hash-uire parolă
- **JWT** pentru token-uri de autentificare
- **Spring Security** pentru securitate avansată

### Exemplu cu BCrypt (pentru viitor):
```java
// În pom.xml adaugă:
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-crypto</artifactId>
</dependency>

// În UserService.java:
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

// La register:
user.setPassword(passwordEncoder.encode(request.getPassword()));

// La login:
if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
    return new AuthResponse("Invalid password!");
}
```

---

## 🐛 Troubleshooting

### Eroare: "Access denied for user 'root'"
- Verifică username și password în `application.properties`
- Asigură-te că MySQL rulează

### Eroare: "Unknown database 'quiz_db'"
- Rulează scriptul SQL pentru creare bază de date
- SAU modifică în `application.properties`: `createDatabaseIfNotExist=true`

### Eroare CORS în browser
- Verifică că backend-ul rulează pe port 8080
- Verifică configurarea CORS în `CorsConfig.java`

### Frontend nu se conectează la backend
- Verifică că backend-ul rulează
- Verifică URL-ul în `authService.js` (trebuie să fie `http://localhost:8080`)

---

## 🎨 Funcționalități Viitoare

- [ ] Implementare BCrypt pentru securitate parolă
- [ ] JWT pentru autentificare bazată pe token-uri
- [ ] Creare și gestionare quiz-uri
- [ ] Rezolvare quiz-uri și scoruri
- [ ] Profil utilizator
- [ ] Istoric quiz-uri rezolvate
- [ ] Role utilizatori (admin, user)

---

## 📞 Contact și Suport

Pentru întrebări sau probleme, verifică:
- Logs backend în terminal
- Console browser pentru erori frontend
- MySQL logs pentru erori bază de date

**Succes la dezvoltare! 🚀**
