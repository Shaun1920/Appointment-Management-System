package com.appointment.bookingsystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.appointment.bookingsystem.entity.VisitFollowup;
import com.appointment.bookingsystem.services.VisitFollowupService;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/doctor/visitfollowup")
@CrossOrigin(origins = "http://localhost:4200")
public class VisitFollowupController {

    @Autowired
    private VisitFollowupService service;

    // ✅ Handles both visit and follow-up in one endpoint
    @PostMapping("/{appointmentId}/visit")
    public VisitFollowup addFollowup(
            @PathVariable String appointmentId,
            @RequestParam String patientId,
            @RequestBody(required = false) Map<String, String> body) {

        LocalDate followupDate = null;
        String notes = "";

        if (body != null) {
            String dateStr = body.get("followupDate");
            notes = body.getOrDefault("notes", "");

            if (dateStr != null && !dateStr.isEmpty()) {
                followupDate = LocalDate.parse(dateStr);
            }
        }

        // Default to today's date if none provided
        if (followupDate == null) {
            followupDate = LocalDate.now();
            notes = notes.isEmpty() ? "Visited and follow-up recorded" : notes;
        } else {
            notes = notes.isEmpty() ? "Follow-up scheduled" : notes;
        }

        return service.saveFollowup(appointmentId, patientId, followupDate, notes);
    }

    @GetMapping("/patient/{patientId}")
    public List<VisitFollowup> getFollowupsByPatient(@PathVariable String patientId) {
        return service.getFollowupsByPatient(patientId);
    }

    @GetMapping("/appointment/{appointmentId}")
    public List<VisitFollowup> getFollowupsByAppointment(@PathVariable String appointmentId) {
        return service.getFollowupsByAppointment(appointmentId);
    }
}
