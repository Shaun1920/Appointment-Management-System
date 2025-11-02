package com.appointment.bookingsystem.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.appointment.bookingsystem.entity.VisitFollowup;
import com.appointment.bookingsystem.repository.VisitFollowupRepository;

@RestController
@RequestMapping("/api/doctor")
@CrossOrigin(origins = "http://localhost:4200")
public class DoctorDashboardController {

    @Autowired
    private VisitFollowupRepository visitFollowupRepository;

    // Endpoint to get all followups for calendar
    @GetMapping("/followups")
    public List<VisitFollowup> getAllFollowups() {
        return visitFollowupRepository.findAll();
    }
}
