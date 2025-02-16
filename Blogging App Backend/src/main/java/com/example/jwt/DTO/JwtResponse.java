package com.example.jwt.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private Long userId;
    
    public JwtResponse(String token, Long userId) {
        this.token = token;
        this.userId = userId;
    }

	public String getToken() {
		return token;
	}

	public JwtResponse(String token) {
		super();
		this.token = token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	public Long getUserId() {
        return userId;
    }
}