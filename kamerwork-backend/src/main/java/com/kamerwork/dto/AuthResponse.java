package com.kamerwork.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private boolean success;
    private String message;
    private String token;
    private String userId;
    private String email;
    private String role;
    private String fullName;
    private String sessionId;
    private Long loginDurationMs;
}
