package com.kamerwork.controllers;

import com.kamerwork.dto.AuditLogDTO;
import com.kamerwork.models.AuditLog;
import com.kamerwork.services.ActivityLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/audit-logs")
@RequiredArgsConstructor
public class AuditLogController {
    private final ActivityLogService activityLogService;
    
    /**
     * Get all audit logs (for superadmin only)
     * Limited to last 1000 records, sorted by timestamp descending
     */
    @GetMapping("/all")
    public ResponseEntity<List<AuditLogDTO>> getAllLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        try {
            List<AuditLog> logs = activityLogService.getAllLogs();
            List<AuditLogDTO> dtos = convertToDTOs(logs);
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Get audit logs for the current user
     */
    @GetMapping("/user/{email}")
    public ResponseEntity<List<AuditLogDTO>> getUserAuditLogs(@PathVariable String email) {
        try {
            List<AuditLog> logs = activityLogService.getUserAuditLogs(email);
            List<AuditLogDTO> dtos = convertToDTOs(logs);
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Get audit logs for a specific action (e.g., LOGIN, LOGOUT)
     */
    @GetMapping("/action/{action}")
    public ResponseEntity<List<AuditLogDTO>> getActionLogs(@PathVariable String action) {
        try {
            List<AuditLog> logs = activityLogService.getActionLogs(action);
            List<AuditLogDTO> dtos = convertToDTOs(logs);
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Get audit logs for a specific session
     */
    @GetMapping("/session/{sessionId}")
    public ResponseEntity<List<AuditLogDTO>> getSessionLogs(@PathVariable String sessionId) {
        try {
            List<AuditLog> logs = activityLogService.getSessionLogs(sessionId);
            List<AuditLogDTO> dtos = convertToDTOs(logs);
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Get audit logs within a time range
     */
    @GetMapping("/range")
    public ResponseEntity<List<AuditLogDTO>> getLogsInRange(@RequestParam String startTime, @RequestParam String endTime) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
            LocalDateTime start = LocalDateTime.parse(startTime, formatter);
            LocalDateTime end = LocalDateTime.parse(endTime, formatter);
            
            List<AuditLog> logs = activityLogService.getLogsInTimeRange(start, end);
            List<AuditLogDTO> dtos = convertToDTOs(logs);
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    /**
     * Get statistics about login performance
     */
    @GetMapping("/stats/login-performance")
    public ResponseEntity<?> getLoginPerformanceStats() {
        try {
            List<AuditLog> loginLogs = activityLogService.getActionLogs("LOGIN");
            
            if (loginLogs.isEmpty()) {
                return ResponseEntity.ok(new Object() {
                    public String message = "No login data available";
                });
            }
            
            long total = loginLogs.size();
            long successful = loginLogs.stream().filter(log -> "SUCCESS".equals(log.getStatus())).count();
            long failed = total - successful;
            
            long totalDuration = loginLogs.stream()
                    .filter(log -> log.getDurationMs() != null)
                    .mapToLong(AuditLog::getDurationMs)
                    .sum();
            
            double avgDuration = totalDuration > 0 ? (double) totalDuration / successful : 0;
            
            long maxDuration = loginLogs.stream()
                    .filter(log -> log.getDurationMs() != null)
                    .mapToLong(AuditLog::getDurationMs)
                    .max()
                    .orElse(0);
            
            return ResponseEntity.ok(new Object() {
                public long total_logins = total;
                public long successful_logins = successful;
                public long failed_logins = failed;
                public double success_rate = total > 0 ? (double) successful / total * 100 : 0;
                public double avg_login_duration_ms = avgDuration;
                public long max_login_duration_ms = maxDuration;
            });
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Convert AuditLog to DTO
     */
    private List<AuditLogDTO> convertToDTOs(List<AuditLog> logs) {
        return logs.stream().map(log -> new AuditLogDTO(
            log.getId(),
            log.getEmail(),
            log.getUserId(),
            log.getAction(),
            log.getDetails(),
            log.getStartTime(),
            log.getEndTime(),
            log.getDurationMs(),
            log.getIpAddress(),
            log.getUserAgent(),
            log.getStatus(),
            log.getErrorMessage(),
            log.getTimestamp(),
            log.getSessionId()
        )).collect(Collectors.toList());
    }
}
