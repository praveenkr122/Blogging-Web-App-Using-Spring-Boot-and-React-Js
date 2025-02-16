package com.example.jwt.entity;

import jakarta.persistence.Table;

@Table(name = "role")
public class Role {
	public Role(String role) {
		super();
		this.role = role;
	}

	private String role;

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
}
