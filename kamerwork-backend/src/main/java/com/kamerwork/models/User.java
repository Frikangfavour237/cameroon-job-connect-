package com.kamerwork.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String id;
    
    private String fullName;
    
    @Indexed(unique = true)
    private String email;
    
    private String password;
    
    private String phoneNumber;
    
    private String role; // "EMPLOYEE" or "EMPLOYER"
    
    private boolean verified;
    
    private String resetToken;
    
    private LocalDateTime resetTokenExpiry;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    private LocalDateTime lastLogin;
}
