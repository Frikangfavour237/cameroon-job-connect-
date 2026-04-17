package com.kamerwork.services;

import com.kamerwork.dto.LoginRequest;
import com.kamerwork.dto.RegisterRequest;
import com.kamerwork.dto.ForgotPasswordRequest;
import com.kamerwork.dto.ResetPasswordRequest;
import com.kamerwork.dto.AuthResponse;
import com.kamerwork.models.User;
import com.kamerwork.repositories.UserRepository;
import com.kamerwork.services.ActivityLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final EmailService emailService;
    private final CaptchaService captchaService;
    private final ActivityLogService activityLogService;

    public AuthResponse register(RegisterRequest request, String ipAddress, String userAgent) {
        AuthResponse response = new AuthResponse();
        String sessionId = UUID.randomUUID().toString();
        response.setSessionId(sessionId);
        
        try {
            if (!captchaService.verifyCaptcha(request.getCaptchaToken())) {
                response.setSuccess(false);
                response.setMessage("Captcha verification failed");
                activityLogService.logActivity(request.getEmail(), null, "REGISTER", "Captcha verification failed", 
                        ipAddress, userAgent, "FAILED", "Captcha verification failed");
                return response;
            }

            // Validate role
            if (!"EMPLOYEE".equals(request.getRole()) && !"EMPLOYER".equals(request.getRole())) {
                response.setSuccess(false);
                response.setMessage("Invalid role. Must be EMPLOYEE or EMPLOYER");
                activityLogService.logActivity(request.getEmail(), null, "REGISTER", "Invalid role: " + request.getRole(), 
                        ipAddress, userAgent, "FAILED", "Invalid role");
                return response;
            }

            // Check if user already exists
            if (userRepository.existsByEmail(request.getEmail())) {
                response.setSuccess(false);
                response.setMessage("Email already registered");
                activityLogService.logActivity(request.getEmail(), null, "REGISTER", "Email already exists", 
                        ipAddress, userAgent, "FAILED", "Email already registered");
                return response;
            }

            // Create new user
            User user = new User();
            user.setFullName(request.getFullName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setPhoneNumber(request.getPhoneNumber());
            user.setRole(request.getRole());
            user.setVerified(false);
            user.setCreatedAt(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());

            User savedUser = userRepository.save(user);

            // Generate JWT token
            String token = jwtTokenProvider.generateToken(savedUser.getId());

            // Send welcome email
            try {
                emailService.sendRegistrationConfirmation(savedUser.getEmail(), savedUser.getFullName());
            } catch (Exception e) {
                // Log but don't fail registration if email fails
                System.err.println("Failed to send registration email: " + e.getMessage());
            }

            response.setSuccess(true);
            response.setMessage("Registration successful");
            response.setToken(token);
            response.setUserId(savedUser.getId());
            response.setEmail(savedUser.getEmail());
            response.setRole(savedUser.getRole());
            response.setFullName(savedUser.getFullName());
            
            activityLogService.logActivity(savedUser.getEmail(), savedUser.getId(), "REGISTER", 
                    "User registered with role: " + savedUser.getRole(), ipAddress, userAgent, "SUCCESS", null);

        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Registration failed: " + e.getMessage());
            activityLogService.logActivity(request.getEmail(), null, "REGISTER", "Registration failed", 
                    ipAddress, userAgent, "ERROR", e.getMessage());
        }

        return response;
    }

    public AuthResponse login(LoginRequest request, String ipAddress, String userAgent) {
        AuthResponse response = new AuthResponse();
        long startTime = System.currentTimeMillis();
        String sessionId = UUID.randomUUID().toString();
        response.setSessionId(sessionId);
        String logId = null;
        
        try {
            // Start logging the login action with duration tracking
            logId = activityLogService.startActionLog(request.getEmail(), null, "LOGIN", ipAddress, userAgent);
            
            if (!captchaService.verifyCaptcha(request.getCaptchaToken())) {
                response.setSuccess(false);
                response.setMessage("Captcha verification failed");
                long duration = System.currentTimeMillis() - startTime;
                response.setLoginDurationMs(duration);
                activityLogService.endActionLog(logId, "FAILED", "Captcha verification failed", duration, "Captcha verification failed");
                return response;
            }

            Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
            
            if (userOptional.isEmpty()) {
                response.setSuccess(false);
                response.setMessage("User not found");
                long duration = System.currentTimeMillis() - startTime;
                response.setLoginDurationMs(duration);
                activityLogService.endActionLog(logId, "FAILED", "User not found", duration, "User not found");
                return response;
            }

            User user = userOptional.get();

            // Check password
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                response.setSuccess(false);
                response.setMessage("Invalid credentials");
                long duration = System.currentTimeMillis() - startTime;
                response.setLoginDurationMs(duration);
                activityLogService.endActionLog(logId, "FAILED", "Invalid credentials", duration, "Invalid credentials");
                return response;
            }

            // Update last login
            user.setLastLogin(LocalDateTime.now());
            userRepository.save(user);

            // Generate JWT token
            String token = jwtTokenProvider.generateToken(user.getId());

            response.setSuccess(true);
            response.setMessage("Login successful");
            response.setToken(token);
            response.setUserId(user.getId());
            response.setEmail(user.getEmail());
            response.setRole(user.getRole());
            response.setFullName(user.getFullName());
            
            long duration = System.currentTimeMillis() - startTime;
            response.setLoginDurationMs(duration);
            
            activityLogService.endActionLog(logId, "SUCCESS", 
                    "User logged in successfully, role: " + user.getRole(), duration, null);

        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Login failed: " + e.getMessage());
            long duration = System.currentTimeMillis() - startTime;
            response.setLoginDurationMs(duration);
            if (logId != null) {
                activityLogService.endActionLog(logId, "ERROR", "Login failed", duration, e.getMessage());
            }
        }

        return response;
    }

    public AuthResponse forgotPassword(ForgotPasswordRequest request, String ipAddress, String userAgent) {
        AuthResponse response = new AuthResponse();
        
        try {
            Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
            
            if (userOptional.isEmpty()) {
                // Don't reveal if user exists for security
                response.setSuccess(true);
                response.setMessage("If the email exists, a reset link has been sent");
                activityLogService.logActivity(request.getEmail(), null, "FORGOT_PASSWORD", 
                        "Password reset requested for unknown user", ipAddress, userAgent, "ATTEMPTED", null);
                return response;
            }

            User user = userOptional.get();
            
            // Generate reset token
            String resetToken = UUID.randomUUID().toString();
            user.setResetToken(resetToken);
            user.setResetTokenExpiry(LocalDateTime.now().plusHours(1));
            userRepository.save(user);

            // Send reset email
            try {
                emailService.sendPasswordResetEmail(user.getEmail(), resetToken);
            } catch (Exception e) {
                response.setSuccess(false);
                response.setMessage("Failed to send reset email: " + e.getMessage());
                activityLogService.logActivity(user.getEmail(), user.getId(), "FORGOT_PASSWORD", 
                        "Password reset email failed", ipAddress, userAgent, "ERROR", e.getMessage());
                return response;
            }

            response.setSuccess(true);
            response.setMessage("If the email exists, a reset link has been sent");
            activityLogService.logActivity(user.getEmail(), user.getId(), "FORGOT_PASSWORD", 
                    "Password reset email sent successfully", ipAddress, userAgent, "SUCCESS", null);

        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Error processing request: " + e.getMessage());
            activityLogService.logActivity(request.getEmail(), null, "FORGOT_PASSWORD", 
                    "Password reset request failed", ipAddress, userAgent, "ERROR", e.getMessage());
        }

        return response;
    }

    public AuthResponse resetPassword(ResetPasswordRequest request, String ipAddress, String userAgent) {
        AuthResponse response = new AuthResponse();
        
        try {
            Optional<User> userOptional = userRepository.findByResetToken(request.getToken());
            
            if (userOptional.isEmpty()) {
                response.setSuccess(false);
                response.setMessage("Invalid or expired reset token");
                activityLogService.logActivity("UNKNOWN", null, "RESET_PASSWORD", 
                        "Invalid reset token", ipAddress, userAgent, "FAILED", "Invalid token");
                return response;
            }

            User user = userOptional.get();

            // Check if token has expired
            if (user.getResetTokenExpiry() == null || LocalDateTime.now().isAfter(user.getResetTokenExpiry())) {
                response.setSuccess(false);
                response.setMessage("Reset token has expired");
                activityLogService.logActivity(user.getEmail(), user.getId(), "RESET_PASSWORD", 
                        "Reset token expired", ipAddress, userAgent, "FAILED", "Token expired");
                return response;
            }

            // Update password
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            user.setResetToken(null);
            user.setResetTokenExpiry(null);
            user.setUpdatedAt(LocalDateTime.now());
            userRepository.save(user);

            response.setSuccess(true);
            response.setMessage("Password reset successful");
            activityLogService.logActivity(user.getEmail(), user.getId(), "RESET_PASSWORD", 
                    "Password reset successful", ipAddress, userAgent, "SUCCESS", null);

        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Error resetting password: " + e.getMessage());
            activityLogService.logActivity(request.getEmail(), null, "RESET_PASSWORD", 
                    "Password reset failed", ipAddress, userAgent, "ERROR", e.getMessage());
        }

        return response;
    }
}
