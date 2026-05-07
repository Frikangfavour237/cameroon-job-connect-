package com.kamerwork.controllers;

import com.kamerwork.dto.EmployeeDashboardResponse;
import com.kamerwork.dto.EmployeeProfileDTO;
import com.kamerwork.dto.EmployerDashboardResponse;
import com.kamerwork.dto.EmployerProfileDTO;
import com.kamerwork.models.User;
import com.kamerwork.services.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/employee")
    public ResponseEntity<EmployeeDashboardResponse> getEmployeeDashboard(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(dashboardService.getEmployeeDashboard(user));
    }

    @PutMapping("/employee/profile")
    public ResponseEntity<EmployeeProfileDTO> updateEmployeeProfile(
            Authentication authentication,
            @RequestBody EmployeeProfileDTO profileDTO
    ) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(dashboardService.updateEmployeeProfile(user, profileDTO));
    }

    @GetMapping("/employer")
    public ResponseEntity<EmployerDashboardResponse> getEmployerDashboard(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(dashboardService.getEmployerDashboard(user));
    }

    @PutMapping("/employer/profile")
    public ResponseEntity<EmployerProfileDTO> updateEmployerProfile(
            Authentication authentication,
            @RequestBody EmployerProfileDTO profileDTO
    ) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(dashboardService.updateEmployerProfile(user, profileDTO));
    }
}
