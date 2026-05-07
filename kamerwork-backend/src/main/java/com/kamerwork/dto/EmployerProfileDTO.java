package com.kamerwork.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployerProfileDTO {
    private String fullName;
    private String email;
    private String companyName;
    private String companyLocation;
    private String companyDescription;
    private String companyWebsite;
}
