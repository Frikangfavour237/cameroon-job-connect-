package com.kamerwork.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDocumentsDTO {
    private FileSummaryDTO cv;
    private FileSummaryDTO profilePicture;
}
