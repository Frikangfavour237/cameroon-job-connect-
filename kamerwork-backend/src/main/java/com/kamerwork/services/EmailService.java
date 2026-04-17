package com.kamerwork.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    @Value("${mail.enabled:false}")
    private boolean emailEnabled;

    public void sendPasswordResetEmail(String email, String resetToken) {
        if (!emailEnabled) {
            System.out.println("Email sending disabled: skipping password reset email.");
            return;
        }

        String resetUrl = "http://localhost:5173/reset-password?token=" + resetToken;
        
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset Request - Cameroon Connect Job Platform");
        message.setText("Click the link below to reset your password:\n\n" + resetUrl + 
                       "\n\nThis link will expire in 1 hour.\n\n" +
                       "If you did not request a password reset, please ignore this email.");
        
        mailSender.send(message);
    }

    public void sendRegistrationConfirmation(String email, String fullName) {
        if (!emailEnabled) {
            System.out.println("Email sending disabled: skipping registration confirmation email.");
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Welcome to Cameroon Connect Job Platform");
        message.setText("Hello " + fullName + ",\n\n" +
                       "Welcome to Cameroon Connect Job Platform!\n\n" +
                       "Your account has been successfully created. You can now login and start using the platform.\n\n" +
                       "Best regards,\nCameroon Connect Team");
        
        mailSender.send(message);
    }
}
