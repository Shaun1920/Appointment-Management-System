package com.appointment.bookingsystem.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointment_tracker")
public class AppointmentTracker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long appointmentId;
    private Long patientId;
    private String trackerType; // "Visited" or "Followup"

    private LocalDateTime followupDate;

    public AppointmentTracker() {}

    public AppointmentTracker(Long appointmentId, Long patientId, String trackerType, LocalDateTime followupDate) {
        this.appointmentId = appointmentId;
        this.patientId = patientId;
        this.trackerType = trackerType;
        this.followupDate = followupDate;
    }

    // Getters & setters
    public Long getId() { return id; }
    public Long getAppointmentId() { return appointmentId; }
    public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }

    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }

    public String getTrackerType() { return trackerType; }
    public void setTrackerType(String trackerType) { this.trackerType = trackerType; }

    public LocalDateTime getFollowupDate() { return followupDate; }
    public void setFollowupDate(LocalDateTime followupDate) { this.followupDate = followupDate; }
}
