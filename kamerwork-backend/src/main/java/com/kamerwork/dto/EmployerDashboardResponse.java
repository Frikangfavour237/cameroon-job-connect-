package com.kamerwork.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployerDashboardResponse {
    private EmployerProfileDTO profile;
    private EmployerStatsDTO stats;
    private List<EmployerJobDTO> jobs;
    private List<EmployerCandidateDTO> candidates;
    private List<EmployerMessageDTO> messages;
}
