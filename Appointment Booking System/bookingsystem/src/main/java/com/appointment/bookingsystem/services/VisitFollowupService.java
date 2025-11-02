package com.appointment.bookingsystem.services;

import com.appointment.bookingsystem.entity.VisitFollowup;
import com.appointment.bookingsystem.repository.VisitFollowupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class VisitFollowupService {

    @Autowired
    private VisitFollowupRepository repo;

    public VisitFollowup saveFollowup(String appointmentId, String patientId, LocalDate followupDate, String notes) {
        // 🔍 Check if already exists
        VisitFollowup existing = repo.findByAppointmentIdAndPatientId(appointmentId, patientId);

        if (existing != null) {
            // 📝 Update existing record
            existing.setFollowupDate(followupDate);
            existing.setNotes(notes);
            return repo.save(existing);
        } else {
            // ➕ Create a new record for first-time visit
            VisitFollowup v = new VisitFollowup();
            v.setAppointmentId(appointmentId);
            v.setPatientId(patientId);
            v.setFollowupDate(followupDate);
            v.setNotes(notes);
            return repo.save(v);
        }
    }

    public List<VisitFollowup> getFollowupsByPatient(String patientId) {
        return repo.findByPatientId(patientId);
    }

    public List<VisitFollowup> getFollowupsByAppointment(String appointmentId) {
        return repo.findByAppointmentId(appointmentId);
    }
}
