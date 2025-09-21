package com.example.jwt.DTO;


public class JwtResponse {
    private String token;
    private Long userId;

    // No-args constructor
    public JwtResponse() {
    }

    // All-args constructor
    public JwtResponse(String token, Long userId) {
        this.token = token;
        this.userId = userId;
    }

    // Constructor with only token
    public JwtResponse(String token) {
        this.token = token;
    }

    // Getters and setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
