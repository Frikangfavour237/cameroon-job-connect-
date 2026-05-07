package com.kamerwork.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeMessageDTO {
    private Long id;
    private String employer;
    private String contactName;
    private String contactRole;
    private String contactPhone;
    private String companyUrl;
    private String companyName;
    private String note;
    private String employerEmail;
    private String subject;
    private String preview;
    private String receivedAt;
    private boolean read;
    private List<MessageReplyDTO> replies;
}
