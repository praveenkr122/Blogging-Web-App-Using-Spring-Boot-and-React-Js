package com.example.jwt.controller;


import com.example.jwt.DTO.JwtResponse;
import com.example.jwt.DTO.LoginRequest;
import com.example.jwt.DTO.SignUpRequest;
import com.example.jwt.service.AuthService;

import java.util.ArrayList;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody SignUpRequest request) {
        return authService.registerUser(request);
    }

    @PostMapping("/login")
    public JwtResponse login(@RequestBody LoginRequest request) {
        return authService.authenticateUser(request);
    }
    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }
    
    @PostMapping("/logout")
    public String logout(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid token");
        }

        String token = authHeader.substring(7);
        return authService.logout(token);
    }
    
    @GetMapping("/user")
    public ArrayList<String> getAlluser(){
    	return authService.getUser();
    }
    

}
