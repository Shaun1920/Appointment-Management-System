// src/main/java/com/appointment/bookingsystem/entity/DoctorStatus.java
package com.appointment.bookingsystem.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class DoctorStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String doctorCode;          // same as frontend "doctorId"

    private String currentStatus;       // Available | Busy | On Leave
    private String accountStatus;       // Active | Inactive
    private String upcomingLeave;       // e.g., "22 Oct 2025" or "N/A"
    private Integer appointmentsToday;  // optional (0 default)

    private LocalDateTime updatedAt;

    @PrePersist @PreUpdate
    public void touch() {
        if (appointmentsToday == null) appointmentsToday = 0;
        updatedAt = LocalDateTime.now();
    }

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDoctorCode() { return doctorCode; }
    public void setDoctorCode(String doctorCode) { this.doctorCode = doctorCode; }

    public String getCurrentStatus() { return currentStatus; }
    public void setCurrentStatus(String currentStatus) { this.currentStatus = currentStatus; }

    public String getAccountStatus() { return accountStatus; }
    public void setAccountStatus(String accountStatus) { this.accountStatus = accountStatus; }

    public String getUpcomingLeave() { return upcomingLeave; }
    public void setUpcomingLeave(String upcomingLeave) { this.upcomingLeave = upcomingLeave; }

    public Integer getAppointmentsToday() { return appointmentsToday; }
    public void setAppointmentsToday(Integer appointmentsToday) { this.appointmentsToday = appointmentsToday; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}