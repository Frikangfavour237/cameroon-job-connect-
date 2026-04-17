package com.kamerwork.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;

@Document(collection = "audit_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuditLog {
    @Id
    private String id;
    
    @Indexed
    private String email;
    
    @Indexed
    private String userId;
    
    @Indexed
    private String action; // LOGIN, LOGOUT, REGISTER, VIEW_PAGE, UPDATE_PROFILE, etc.
    
    private String details; // Additional details about the action
    
    @Indexed
    private LocalDateTime startTime; // When the action started
    
    private LocalDateTime endTime; // When the action ended
    
    private Long durationMs; // Duration in milliseconds
    
    private String ipAddress;
    
    private String userAgent;
    
    private String status; // SUCCESS, FAILED, ERROR
    
    private String errorMessage;
    
    @Indexed
    private LocalDateTime timestamp;
    
    private String sessionId;
}
