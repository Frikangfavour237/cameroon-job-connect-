package com.kamerwork.services;

import com.kamerwork.models.AuditLog;
import com.kamerwork.repositories.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ActivityLogService {
    private final AuditLogRepository auditLogRepository;
    
    @Value("${audit.log.path:./logs}")
    private String logPath;
    
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
    private static final String LOG_DIR = "./logs";
    
    static {
        File logDirectory = new File(LOG_DIR);
        if (!logDirectory.exists()) {
            logDirectory.mkdirs();
        }
    }
    
    /**
     * Log a simple activity
     */
    public void log(String email, String activity) {
        log(email, null, activity, null, null, null, "SUCCESS", null);
    }
    
    /**
     * Log activity with userId
     */
    public void log(String email, String userId, String activity) {
        log(email, userId, activity, null, null, null, "SUCCESS", null);
    }
    
    /**
     * Log activity with detailed information
     */
    public void logActivity(String email, String userId, String action, String details, 
                            String ipAddress, String userAgent, String status, String errorMessage) {
        log(email, userId, action, details, ipAddress, userAgent, status, errorMessage);
    }
    
    /**
     * Log an action with duration tracking (for login, dashboard access, etc.)
     */
    public String startActionLog(String email, String userId, String action, String ipAddress, String userAgent) {
        AuditLog auditLog = new AuditLog();
        auditLog.setId(UUID.randomUUID().toString());
        auditLog.setEmail(email);
        auditLog.setUserId(userId);
        auditLog.setAction(action);
        auditLog.setStartTime(LocalDateTime.now());
        auditLog.setIpAddress(ipAddress);
        auditLog.setUserAgent(userAgent);
        auditLog.setSessionId(UUID.randomUUID().toString());
        auditLog.setTimestamp(LocalDateTime.now());
        
        AuditLog savedLog = auditLogRepository.save(auditLog);
        
        // Write to file
        writeToFile(String.format("[%s] ACTION_START - Email: %s, UserId: %s, Action: %s, SessionId: %s, IPAddress: %s",
                formatter.format(LocalDateTime.now()), email, userId, action, savedLog.getSessionId(), ipAddress));
        
        return savedLog.getId();
    }
    
    /**
     * Complete an action log with duration and status
     */
    public void endActionLog(String logId, String status, String details, Long durationMs, String errorMessage) {
        AuditLog auditLog = auditLogRepository.findById(logId).orElse(null);
        if (auditLog != null) {
            auditLog.setEndTime(LocalDateTime.now());
            auditLog.setStatus(status);
            auditLog.setDetails(details);
            auditLog.setDurationMs(durationMs);
            auditLog.setErrorMessage(errorMessage);
            auditLog.setTimestamp(LocalDateTime.now());
            
            auditLogRepository.save(auditLog);
            
            String message = String.format("[%s] ACTION_END - Email: %s, Action: %s, Status: %s, Duration: %dms, SessionId: %s",
                    formatter.format(LocalDateTime.now()), 
                    auditLog.getEmail(), 
                    auditLog.getAction(), 
                    status, 
                    durationMs, 
                    auditLog.getSessionId());
            
            if (errorMessage != null) {
                message += ", Error: " + errorMessage;
            }
            
            writeToFile(message);
        }
    }
    
    /**
     * Internal method to log all activities
     */
    private void log(String email, String userId, String action, String details, 
                     String ipAddress, String userAgent, String status, String errorMessage) {
        try {
            AuditLog auditLog = new AuditLog();
            auditLog.setId(UUID.randomUUID().toString());
            auditLog.setEmail(email);
            auditLog.setUserId(userId);
            auditLog.setAction(action);
            auditLog.setDetails(details);
            auditLog.setIpAddress(ipAddress);
            auditLog.setUserAgent(userAgent);
            auditLog.setStatus(status);
            auditLog.setErrorMessage(errorMessage);
            auditLog.setTimestamp(LocalDateTime.now());
            auditLog.setStartTime(LocalDateTime.now());
            
            auditLogRepository.save(auditLog);
            
            // Console logging (for development)
            System.out.println("Activity Log - Email: " + email + ", Action: " + action + ", Status: " + status);
            
            // File logging
            String logMessage = buildLogMessage(email, userId, action, details, ipAddress, status, errorMessage);
            writeToFile(logMessage);
        } catch (Exception e) {
            System.err.println("Failed to log activity: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    /**
     * Build formatted log message
     */
    private String buildLogMessage(String email, String userId, String action, String details, 
                                   String ipAddress, String status, String errorMessage) {
        StringBuilder message = new StringBuilder();
        message.append("[").append(formatter.format(LocalDateTime.now())).append("] ");
        message.append("EMAIL='").append(email).append("' ");
        message.append("USER_ID='").append(userId != null ? userId : "N/A").append("' ");
        message.append("ACTION='").append(action).append("' ");
        message.append("STATUS='").append(status).append("' ");
        
        if (details != null && !details.isEmpty()) {
            message.append("DETAILS='").append(details).append("' ");
        }
        
        if (ipAddress != null && !ipAddress.isEmpty()) {
            message.append("IP_ADDRESS='").append(ipAddress).append("' ");
        }
        
        if (errorMessage != null && !errorMessage.isEmpty()) {
            message.append("ERROR='").append(errorMessage).append("' ");
        }
        
        return message.toString();
    }
    
    /**
     * Write message to log file
     */
    private void writeToFile(String message) {
        try {
            String fileName = LOG_DIR + "/audit_" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) + ".log";
            File logFile = new File(fileName);
            
            // Create file if it doesn't exist
            if (!logFile.exists()) {
                logFile.createNewFile();
                // Write header
                try (BufferedWriter writer = new BufferedWriter(new FileWriter(fileName, true))) {
                    writer.write("=".repeat(100));
                    writer.newLine();
                    writer.write("AUDIT LOG FILE - " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                    writer.newLine();
                    writer.write("=".repeat(100));
                    writer.newLine();
                }
            }
            
            // Append log message
            try (BufferedWriter writer = new BufferedWriter(new FileWriter(fileName, true))) {
                writer.write(message);
                writer.newLine();
            }
        } catch (IOException e) {
            System.err.println("Failed to write to log file: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    /**
     * Get audit logs for a specific user
     */
    public List<AuditLog> getUserAuditLogs(String email) {
        return auditLogRepository.findByEmailOrderByTimestampDesc(email);
    }
    
    /**
     * Get all audit logs (limited to prevent memory issues)
     */
    public List<AuditLog> getAllLogs() {
        return auditLogRepository.findAll(org.springframework.data.domain.Sort.by(
                org.springframework.data.domain.Sort.Direction.DESC, "timestamp"
        )).stream().limit(1000).collect(java.util.stream.Collectors.toList());
    }
    
    /**
     * Get audit logs for a specific action
     */
    public List<AuditLog> getActionLogs(String action) {
        return auditLogRepository.findByAction(action);
    }
    
    /**
     * Get audit logs for a specific session
     */
    public List<AuditLog> getSessionLogs(String sessionId) {
        return auditLogRepository.findBySessionId(sessionId);
    }
    
    /**
     * Get logs within a time range
     */
    public List<AuditLog> getLogsInTimeRange(LocalDateTime startTime, LocalDateTime endTime) {
        return auditLogRepository.findByTimestampBetween(startTime, endTime);
    }
}