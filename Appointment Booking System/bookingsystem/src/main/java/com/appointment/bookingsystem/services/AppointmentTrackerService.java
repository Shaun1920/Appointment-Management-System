package com.appointment.bookingsystem.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.appointment.bookingsystem.entity.AppointmentTracker;
import com.appointment.bookingsystem.repository.AppointmentTrackerRepository;

@Service
public class AppointmentTrackerService {

    @Autowired
    private AppointmentTrackerRepository trackerRepo;

    public AppointmentTracker saveVisited(Long appointmentId, Long patientId) {
        AppointmentTracker tracker = new AppointmentTracker(appointmentId, patientId, "Visited", null);
        return trackerRepo.save(tracker);
    }

    public AppointmentTracker saveFollowUp(Long appointmentId, Long patientId, String dateTime) {
        AppointmentTracker tracker = new AppointmentTracker(appointmentId, patientId, "Followup", java.time.LocalDateTime.parse(dateTime));
        return trackerRepo.save(tracker);
    }
}
