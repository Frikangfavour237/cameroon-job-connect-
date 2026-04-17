package com.kamerwork.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuditLogDTO {
    private String id;
    private String email;
    private String userId;
    private String action;
    private String details;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Long durationMs;
    private String ipAddress;
    private String userAgent;
    private String status;
    private String errorMessage;
    private LocalDateTime timestamp;
    private String sessionId;
}
