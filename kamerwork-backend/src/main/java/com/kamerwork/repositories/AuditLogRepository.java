package com.kamerwork.repositories;

import com.kamerwork.models.AuditLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AuditLogRepository extends MongoRepository<AuditLog, String> {
    List<AuditLog> findByEmail(String email);
    
    List<AuditLog> findByEmailOrderByTimestampDesc(String email);
    
    List<AuditLog> findByAction(String action);
    
    List<AuditLog> findByTimestampBetween(LocalDateTime startTime, LocalDateTime endTime);
    
    List<AuditLog> findByEmailAndAction(String email, String action);
    
    List<AuditLog> findBySessionId(String sessionId);
}
