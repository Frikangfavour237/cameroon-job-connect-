package com.kamerwork.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeJobDTO {
    private Integer id;
    private String title;
    private String company;
    private String city;
    private String region;
    private String category;
    private String type;
    private String postedAt;
    private String salary;
    private String description;
}
