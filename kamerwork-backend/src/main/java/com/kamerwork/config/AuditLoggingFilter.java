package com.kamerwork.config;

import com.kamerwork.services.ActivityLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class AuditLoggingFilter extends OncePerRequestFilter {
    private final ActivityLogService activityLogService;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        long startTime = System.currentTimeMillis();
        String requestURI = request.getRequestURI();
        String method = request.getMethod();
        String ipAddress = getClientIpAddress(request);
        String userAgent = request.getHeader("User-Agent");
        
        try {
            filterChain.doFilter(request, response);
        } finally {
            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            
            // Log API request
            if (requestURI.startsWith("/api")) {
                System.out.println(String.format("[AUDIT] %s %s - Duration: %dms - IP: %s - Status: %d", 
                    method, requestURI, duration, ipAddress, response.getStatus()));
            }
        }
    }
    
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0];
        }
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }
        return request.getRemoteAddr();
    }
}
