package com.kamerwork.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployerCandidateDTO {
    private Integer id;
    private String name;
    private String job;
    private String date;
    private String status;
    private String skills;
    private String profile;
    private String cvLink;
    private String coverLetter;
}
