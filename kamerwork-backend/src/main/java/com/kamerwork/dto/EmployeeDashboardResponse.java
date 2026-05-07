package com.kamerwork.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDashboardResponse {
    private EmployeeProfileDTO profile;
    private EmployeeDocumentsDTO documents;
    private List<EmployeeJobDTO> jobs;
    private List<EmployeeApplicationDTO> applications;
    private List<EmployeeMessageDTO> messages;
    private List<Integer> savedJobIds;
}
