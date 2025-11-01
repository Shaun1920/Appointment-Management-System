package com.appointment.bookingsystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.appointment.bookingsystem.entity.AppointmentTracker;
import com.appointment.bookingsystem.services.AppointmentTrackerService;

@RestController
@RequestMapping("/api/tracker")
@CrossOrigin(origins = "http://localhost:4200")
public class AppointmentTrackerController {

    @Autowired
    private AppointmentTrackerService trackerService;

    @PostMapping("/visited")
    public AppointmentTracker markVisited(@RequestParam Long appointmentId, @RequestParam Long patientId) {
        return trackerService.saveVisited(appointmentId, patientId);
    }

    @PostMapping("/followup")
    public AppointmentTracker scheduleFollowUp(@RequestParam Long appointmentId, @RequestParam Long patientId, @RequestParam String followupDate) {
        return trackerService.saveFollowUp(appointmentId, patientId, followupDate);
    }
}
