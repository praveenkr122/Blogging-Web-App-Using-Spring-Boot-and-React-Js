package com.example.jwt.service;

import com.example.jwt.DTO.JwtResponse;
import com.example.jwt.DTO.LoginRequest;
import com.example.jwt.DTO.SignUpRequest;
import com.example.jwt.entity.User;
import com.example.jwt.repository.UserRepository;
import com.example.jwt.security.JwtUtil;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
 // Store blacklisted tokens (in-memory, use Redis for production)
    private final Set<String> blacklistedTokens = new HashSet<>();

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public String registerUser(SignUpRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
        return "User registered successfully!";
    }

    public JwtResponse authenticateUser(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return new JwtResponse(token, user.getId()); // Include userId
    }

    
    
    public ArrayList<String> getUser(){
    	return userRepository.findAllEmail();
    }
    
 // Logout method
    public String logout(String token) {
        blacklistedTokens.add(token);
        SecurityContextHolder.clearContext(); // Clear Security Context
        return "Logged out successfully!";
    }

    // Check if token is blacklisted
    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }
}

