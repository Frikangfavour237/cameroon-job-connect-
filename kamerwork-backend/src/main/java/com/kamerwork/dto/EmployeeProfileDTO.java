package com.kamerwork.dto;

import com.kamerwork.models.EducationEntry;
import com.kamerwork.models.WorkExperienceEntry;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeProfileDTO {
    private String fullName;
    private String email;
    private String phone;
    private String city;
    private String region;
    private String headline;
    private String summary;
    private String yearsExperience;
    private List<String> skills;
    private List<WorkExperienceEntry> workExperience;
    private List<EducationEntry> education;
}
