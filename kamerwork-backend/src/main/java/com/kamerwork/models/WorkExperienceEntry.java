package com.kamerwork.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkExperienceEntry {
    private String role;
    private String company;
    private String period;
    private String highlight;
}
