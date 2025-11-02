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

    // ✅ Doctor records visit and schedules follow-up
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

        // Default logic for doctor actions
        if (followupDate == null) {
            followupDate = LocalDate.now();
            notes = notes.isEmpty() ? "Visited and follow-up recorded" : notes;
        } else {
            notes = notes.isEmpty() ? "Visited and Follow-up scheduled" : notes;
        }

        return service.saveFollowup(appointmentId, patientId, followupDate, notes);
    }

    // 🧾 Get all follow-ups (for staff dashboard tracker)
    @GetMapping("/all")
    public List<VisitFollowup> getAllFollowups() {
        return service.getAllFollowups();
    }

    // 🧩 Doctor updates notes if required
    @PutMapping("/update-notes/{appointmentId}/{patientId}")
    public VisitFollowup updateNotes(
            @PathVariable String appointmentId,
            @PathVariable String patientId,
            @RequestBody String notes) {
        return service.updateNotes(appointmentId, patientId, notes);
    }

    // 💰 Staff marks payment as completed
    @PutMapping("/complete-payment/{id}")
    public VisitFollowup markPaymentCompleted(@PathVariable Long id) {
        return service.markPaymentCompleted(id);
    }

    // 🔍 Get all follow-ups for a specific patient
    @GetMapping("/patient/{patientId}")
    public List<VisitFollowup> getFollowupsByPatient(@PathVariable String patientId) {
        return service.getFollowupsByPatient(patientId);
    }

    // 🔍 Get all follow-ups for a specific appointment
    @GetMapping("/appointment/{appointmentId}")
    public List<VisitFollowup> getFollowupsByAppointment(@PathVariable String appointmentId) {
        return service.getFollowupsByAppointment(appointmentId);
    }
}
