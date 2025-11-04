package com.quiz.service;

import com.quiz.dto.AuthResponse;
import com.quiz.dto.LoginRequest;
import com.quiz.dto.RegisterRequest;
import com.quiz.model.User;
import com.quiz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
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
        // Criptează parola cu BCrypt
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        
        User savedUser = userRepository.save(user);
        
        return new AuthResponse("User registered successfully!");
    }
}
