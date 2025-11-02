package com.appointment.bookingsystem.controller;

import com.appointment.bookingsystem.entity.VisitFollowup;
import com.appointment.bookingsystem.repository.VisitFollowupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/staff/tracker")
@CrossOrigin(origins = "http://localhost:4200")
public class StaffTrackerController {

    @Autowired
    private VisitFollowupRepository visitFollowupRepository;

    // ✅ Fetch all follow-up entries
    @GetMapping("/all")
    public ResponseEntity<List<VisitFollowup>> getAllFollowups() {
        return ResponseEntity.ok(visitFollowupRepository.findAll());
    }

    // ✅ Update payment status for an appointment
    @PutMapping("/updatePaymentStatus/{appointmentId}")
    public ResponseEntity<Map<String, String>> updatePaymentStatus(@PathVariable String appointmentId) {
        Map<String, String> response = new HashMap<>();

        List<VisitFollowup> records = visitFollowupRepository.findByAppointmentId(appointmentId);
        if (records.isEmpty()) {
            response.put("message", "No records found for appointment ID: " + appointmentId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        VisitFollowup followup = records.get(0);
        followup.setNotes("Payment completed and appointment marked as done");
        followup.setPaymentStatus("Completed");
        visitFollowupRepository.save(followup);

        response.put("message", "Payment status updated successfully");
        return ResponseEntity.ok(response);
    }
}
