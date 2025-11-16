package com.quiz.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHasher {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        // Parolele tale actuale (în clar)
        String[] passwords = {
            "password123",  // testuser123
            "kevin123",     // kevin
            "bencea",       // bencea
            "asdsa123"      // adsa
        };
        
        System.out.println("Parole criptate cu BCrypt:");
        System.out.println("------------------------------------");
        
        for (int i = 0; i < passwords.length; i++) {
            String hash = encoder.encode(passwords[i]);
            System.out.println((i+1) + ". " + passwords[i] + " -> ");
            System.out.println("   " + hash);
            System.out.println();
        }
        
        System.out.println("\nRulează aceste UPDATE-uri în MySQL:");
        System.out.println("------------------------------------");
    }
}
