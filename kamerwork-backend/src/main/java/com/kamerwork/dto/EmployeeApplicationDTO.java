package com.kamerwork.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeApplicationDTO {
    private Long id;
    private Integer jobId;
    private String appliedAt;
    private String status;
    private String note;
}
