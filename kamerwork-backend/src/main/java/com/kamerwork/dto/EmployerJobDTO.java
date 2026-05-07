package com.kamerwork.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployerJobDTO {
    private Integer id;
    private String title;
    private String location;
    private String type;
    private String deadline;
    private String status;
    private Integer applicants;
}
