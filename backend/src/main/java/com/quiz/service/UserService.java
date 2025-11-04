package com.quiz.service;

import com.quiz.dto.AuthResponse;
import com.quiz.dto.LoginRequest;
import com.quiz.dto.RegisterRequest;
import com.quiz.model.User;
import com.quiz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public AuthResponse registerUser(RegisterRequest request) {
        // Verifică dacă username-ul există deja
        if (userRepository.existsByUsername(request.getUsername())) {
            return new AuthResponse("Username is already taken!");
        }
        
        // Verifică dacă email-ul există deja
        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse("Email is already registered!");
        }
        
        // Creează noul utilizator
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        // IMPORTANT: În producție, parola trebuie criptată cu BCrypt!
        // Pentru simplitate, o salvăm direct acum
        user.setPassword(request.getPassword());
        
        User savedUser = userRepository.save(user);
        
        return new AuthResponse(
            savedUser.getId(),
            savedUser.getUsername(),
            savedUser.getEmail(),
            "User registered successfully!"
        );
    }
    
    public AuthResponse loginUser(LoginRequest request) {
        // Caută utilizatorul după username sau email
        Optional<User> userOptional = userRepository.findByUsername(request.getUsernameOrEmail());
        
        if (userOptional.isEmpty()) {
            userOptional = userRepository.findByEmail(request.getUsernameOrEmail());
        }
        
        if (userOptional.isEmpty()) {
            return new AuthResponse("User not found!");
        }
        
        User user = userOptional.get();
        
        // Verifică parola
        // IMPORTANT: În producție, folosește BCrypt pentru comparare!
        if (!user.getPassword().equals(request.getPassword())) {
            return new AuthResponse("Invalid password!");
        }
        
        return new AuthResponse(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            "Login successful!"
        );
    }
}
