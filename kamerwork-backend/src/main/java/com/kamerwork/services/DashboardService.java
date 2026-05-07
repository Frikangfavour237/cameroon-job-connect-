package com.kamerwork.services;

import com.kamerwork.dto.*;
import com.kamerwork.models.EducationEntry;
import com.kamerwork.models.User;
import com.kamerwork.models.WorkExperienceEntry;
import com.kamerwork.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final UserRepository userRepository;

    public EmployeeDashboardResponse getEmployeeDashboard(User user) {
        return new EmployeeDashboardResponse(
                buildEmployeeProfile(user),
                new EmployeeDocumentsDTO(
                        user.getCvFileName() == null ? null : new FileSummaryDTO(user.getCvFileName(), stringify(user.getCvUpdatedAt())),
                        user.getProfilePictureName() == null ? null : new FileSummaryDTO(user.getProfilePictureName(), stringify(user.getProfilePictureUpdatedAt()))
                ),
                buildEmployeeJobs(),
                buildEmployeeApplications(),
                buildEmployeeMessages(),
                Arrays.asList(1, 4, 6)
        );
    }

    public EmployeeProfileDTO updateEmployeeProfile(User user, EmployeeProfileDTO profileDTO) {
        user.setFullName(profileDTO.getFullName());
        user.setEmail(profileDTO.getEmail());
        user.setPhoneNumber(profileDTO.getPhone());
        user.setCity(profileDTO.getCity());
        user.setRegion(profileDTO.getRegion());
        user.setHeadline(profileDTO.getHeadline());
        user.setSummary(profileDTO.getSummary());
        user.setYearsExperience(profileDTO.getYearsExperience());
        user.setSkills(profileDTO.getSkills());
        user.setWorkExperience(profileDTO.getWorkExperience());
        user.setEducation(profileDTO.getEducation());
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
        return buildEmployeeProfile(user);
    }

    public EmployerDashboardResponse getEmployerDashboard(User user) {
        List<EmployerJobDTO> jobs = buildEmployerJobs();
        List<EmployerCandidateDTO> candidates = buildEmployerCandidates();
        return new EmployerDashboardResponse(
                buildEmployerProfile(user),
                new EmployerStatsDTO(
                        (int) jobs.stream().filter(job -> "Active".equals(job.getStatus())).count(),
                        candidates.size(),
                        1830 + candidates.size() * 24,
                        "24%"
                ),
                jobs,
                candidates,
                buildEmployerMessages()
        );
    }

    public EmployerProfileDTO updateEmployerProfile(User user, EmployerProfileDTO profileDTO) {
        user.setFullName(profileDTO.getFullName());
        user.setEmail(profileDTO.getEmail());
        user.setCompanyName(profileDTO.getCompanyName());
        user.setCompanyLocation(profileDTO.getCompanyLocation());
        user.setCompanyDescription(profileDTO.getCompanyDescription());
        user.setCompanyWebsite(profileDTO.getCompanyWebsite());
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
        return buildEmployerProfile(user);
    }

    private EmployeeProfileDTO buildEmployeeProfile(User user) {
        List<String> skills = user.getSkills() == null || user.getSkills().isEmpty()
                ? Arrays.asList("Customer Support", "CRM", "Microsoft Excel", "Recruitment Coordination", "Communication")
                : user.getSkills();
        List<WorkExperienceEntry> experience = user.getWorkExperience() == null || user.getWorkExperience().isEmpty()
                ? Arrays.asList(
                        new WorkExperienceEntry("Customer Experience Officer", "CityLink Logistics", "2023 - Present", "Improved response times by 26 percent through better ticket triage and follow-up."),
                        new WorkExperienceEntry("Operations Assistant", "AfriConnect", "2021 - 2023", "Supported dispatch, reporting, and customer issue resolution across two regional teams.")
                )
                : user.getWorkExperience();
        List<EducationEntry> education = user.getEducation() == null || user.getEducation().isEmpty()
                ? Collections.singletonList(new EducationEntry("University of Yaounde II", "BSc in Management", "2017 - 2020"))
                : user.getEducation();

        return new EmployeeProfileDTO(
                user.getFullName(),
                user.getEmail(),
                user.getPhoneNumber() == null ? "+237 677 123 456" : user.getPhoneNumber(),
                user.getCity() == null ? "Yaounde" : user.getCity(),
                user.getRegion() == null ? "Centre" : user.getRegion(),
                user.getHeadline() == null ? "Customer service and operations specialist" : user.getHeadline(),
                user.getSummary() == null ? "Results-driven job seeker with 4 years of experience supporting customers, coordinating teams, and improving service delivery." : user.getSummary(),
                user.getYearsExperience() == null ? "4 years" : user.getYearsExperience(),
                skills,
                experience,
                education
        );
    }

    private EmployerProfileDTO buildEmployerProfile(User user) {
        return new EmployerProfileDTO(
                user.getFullName(),
                user.getEmail(),
                user.getCompanyName() == null ? "KamerWork Hiring" : user.getCompanyName(),
                user.getCompanyLocation() == null ? "Yaounde, Cameroon" : user.getCompanyLocation(),
                user.getCompanyDescription() == null ? "KamerWork Hiring is focused on matching local talent with high-impact jobs across Cameroon." : user.getCompanyDescription(),
                user.getCompanyWebsite() == null ? "www.kamerwork.cm" : user.getCompanyWebsite()
        );
    }

    private List<EmployeeJobDTO> buildEmployeeJobs() {
        return Arrays.asList(
                new EmployeeJobDTO(1, "Frontend Engineer", "MboaPay", "Douala", "Littoral", "Technology", "Full-time", "2026-04-22", "900,000 - 1,300,000 FCFA", "Build product interfaces for a fast-growing fintech platform serving customers across Cameroon."),
                new EmployeeJobDTO(2, "Customer Success Associate", "KamerTel", "Yaounde", "Centre", "Customer Support", "Full-time", "2026-04-20", "350,000 - 520,000 FCFA", "Support subscribers, resolve service issues, and improve customer retention with the operations team."),
                new EmployeeJobDTO(3, "HR Officer", "LionTech Services", "Bafoussam", "West", "Human Resources", "Contract", "2026-04-18", "450,000 - 650,000 FCFA", "Coordinate recruitment logistics, onboarding, and employee records for a regional services group."),
                new EmployeeJobDTO(4, "Digital Marketing Specialist", "Camer Media House", "Yaounde", "Centre", "Marketing", "Part-time", "2026-04-16", "400,000 - 700,000 FCFA", "Plan campaigns, manage analytics, and create content for national brand visibility."),
                new EmployeeJobDTO(5, "Network Support Technician", "Rural Connect", "Bamenda", "North West", "Technology", "Contract", "2026-04-13", "500,000 - 760,000 FCFA", "Monitor network installations and respond to support tickets for enterprise connectivity projects."),
                new EmployeeJobDTO(6, "Finance Analyst", "Bantu Capital", "Douala", "Littoral", "Finance", "Full-time", "2026-04-10", "850,000 - 1,200,000 FCFA", "Prepare financial reports, cash flow analysis, and decision support for investment operations.")
        );
    }

    private List<EmployeeApplicationDTO> buildEmployeeApplications() {
        return Arrays.asList(
                new EmployeeApplicationDTO(501L, 2, "2026-04-21", "Viewed by Employer", "The hiring team opened your CV yesterday afternoon."),
                new EmployeeApplicationDTO(502L, 3, "2026-04-17", "Employer Contacted", "Employer requested your availability for a first interview call."),
                new EmployeeApplicationDTO(503L, 5, "2026-04-12", "Rejected", "The employer moved forward with candidates who have deeper network rollout experience.")
        );
    }

    private List<EmployeeMessageDTO> buildEmployeeMessages() {
        return Arrays.asList(
                new EmployeeMessageDTO(701L, "LionTech Services", "Marceline Tabe", "Talent Partner", "+237 677 441 188", "liontech.cm", "LionTech Services", "Interview scheduling is pending your preferred time slots.", "talent@liontech.cm", "Interview availability for HR Officer role", "Thanks for applying. Could you share your availability for a 20-minute introduction call?", "2026-04-22 09:15", false, Collections.emptyList()),
                new EmployeeMessageDTO(702L, "KamerTel", "Solange Ndzi", "Recruitment Specialist", "+237 681 003 225", "kamertel.cm/careers", "KamerTel", "Your application is in shortlist review for the support team.", "recruitment@kamertel.cm", "Application viewed for Customer Success Associate", "Your profile has been shortlisted for the next review stage. We will update you soon.", "2026-04-21 15:20", true, Collections.singletonList(new MessageReplyDTO(1L, "2026-04-21 18:10", "Thank you for the update. I remain available for the next step."))),
                new EmployeeMessageDTO(703L, "Bantu Capital", "Arnaud Mbe", "Finance Hiring Lead", "+237 690 220 918", "bantucapital.cm", "Bantu Capital", "The team wants clarification on your reporting tools before the next review step.", "careers@bantucapital.cm", "Question about your finance reporting experience", "We would like a quick clarification on the reporting tools you have used in your last role.", "2026-04-20 10:05", false, Collections.emptyList())
        );
    }

    private List<EmployerJobDTO> buildEmployerJobs() {
        return Arrays.asList(
                new EmployerJobDTO(1, "Product Designer", "Yaounde", "Full-time", "2026-05-15", "Active", 12),
                new EmployerJobDTO(2, "Frontend Engineer", "Douala", "Remote", "2026-04-30", "Active", 8),
                new EmployerJobDTO(3, "HR Business Partner", "Bafoussam", "Contract", "2026-03-22", "Expired", 4)
        );
    }

    private List<EmployerCandidateDTO> buildEmployerCandidates() {
        return Arrays.asList(
                new EmployerCandidateDTO(101, "Fiona Etape", "Product Designer", "2026-04-08", "New", "Figma, UX Research, Prototyping", "Senior Designer with 6 years experience building product flows for fintech and e-commerce.", "#", "I am excited to bring my design leadership to KamerWork."),
                new EmployerCandidateDTO(102, "Jean Claude", "Frontend Engineer", "2026-04-07", "Viewed", "React, TypeScript, TailwindCSS", "Full-stack frontend engineer with experience in modern React apps and API-driven dashboards.", "#", "I’m eager to help your team deliver beautiful hiring experiences."),
                new EmployerCandidateDTO(103, "Hanna Mba", "HR Business Partner", "2026-04-05", "Contacted", "Talent Acquisition, Employer Branding, Interviewing", "HR specialist who has supported hiring for engineering and marketing teams across Africa.", "#", "I bring strong employer branding and candidate management practices.")
        );
    }

    private List<EmployerMessageDTO> buildEmployerMessages() {
        return Arrays.asList(
                new EmployerMessageDTO(1, "Fiona Etape", "Application for Product Designer", "Apr 12"),
                new EmployerMessageDTO(2, "Jean Claude", "Question about Frontend Engineer role", "Apr 10"),
                new EmployerMessageDTO(3, "Hanna Mba", "Availability for HR Business Partner interview", "Apr 08")
        );
    }

    private String stringify(LocalDateTime dateTime) {
        return dateTime == null ? null : dateTime.toString();
    }
}
