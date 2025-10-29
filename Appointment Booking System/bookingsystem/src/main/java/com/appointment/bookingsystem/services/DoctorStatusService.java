// src/main/java/com/appointment/bookingsystem/services/DoctorStatusService.java
package com.appointment.bookingsystem.services;

import com.appointment.bookingsystem.entity.DoctorStatus;
import com.appointment.bookingsystem.repository.DoctorStatusRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorStatusService {
    private final DoctorStatusRepo repo;

    public DoctorStatusService(DoctorStatusRepo repo) { this.repo = repo; }

    public DoctorStatus upsert(DoctorStatus payload) {
        DoctorStatus ds = repo.findByDoctorCode(payload.getDoctorCode())
                .orElseGet(DoctorStatus::new);
        ds.setDoctorCode(payload.getDoctorCode());
        if (payload.getCurrentStatus() != null)   ds.setCurrentStatus(payload.getCurrentStatus());
        if (payload.getAccountStatus() != null)   ds.setAccountStatus(payload.getAccountStatus());
        if (payload.getUpcomingLeave() != null)   ds.setUpcomingLeave(payload.getUpcomingLeave());
        if (payload.getAppointmentsToday() != null) ds.setAppointmentsToday(payload.getAppointmentsToday());
        return repo.save(ds);
    }

    public DoctorStatus setAvailability(String code, String availability) {
        DoctorStatus ds = repo.findByDoctorCode(code).orElseGet(() -> {
            DoctorStatus n = new DoctorStatus();
            n.setDoctorCode(code);
            n.setAccountStatus("Active"); // sane default if doctor is online
            return n;
        });
        ds.setCurrentStatus(availability);
        return repo.save(ds);
    }

    public DoctorStatus setAccount(String code, String accountStatus) {
        DoctorStatus ds = repo.findByDoctorCode(code).orElseGet(() -> {
            DoctorStatus n = new DoctorStatus();
            n.setDoctorCode(code);
            return n;
        });
        ds.setAccountStatus(accountStatus);
        return repo.save(ds);
    }

    public List<DoctorStatus> all() { return repo.findAll(); }

    public DoctorStatus get(String code) { return repo.findByDoctorCode(code).orElse(null); }
}