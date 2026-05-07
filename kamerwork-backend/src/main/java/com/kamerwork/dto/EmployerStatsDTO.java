package com.kamerwork.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployerStatsDTO {
    private Integer activeJobs;
    private Integer totalApplicants;
    private Integer totalViews;
    private String conversionRate;
}
