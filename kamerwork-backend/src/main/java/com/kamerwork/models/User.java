package com.kamerwork.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;
import java.util.List;

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

    private String city;

    private String region;

    private String headline;

    private String summary;

    private String yearsExperience;

    private List<String> skills;

    private List<WorkExperienceEntry> workExperience;

    private List<EducationEntry> education;

    private String cvFileName;

    private LocalDateTime cvUpdatedAt;

    private String profilePictureName;

    private LocalDateTime profilePictureUpdatedAt;

    private String companyName;

    private String companyLocation;

    private String companyDescription;

    private String companyWebsite;
}
