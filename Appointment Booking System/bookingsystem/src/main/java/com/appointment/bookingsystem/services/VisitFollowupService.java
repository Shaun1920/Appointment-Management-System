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

    // 🧩 Save or update follow-up (Doctor updates this)
    public VisitFollowup saveFollowup(String appointmentId, String patientId, LocalDate followupDate, String notes) {
        VisitFollowup existing = repo.findByAppointmentIdAndPatientId(appointmentId, patientId);

        if (existing != null) {
            existing.setFollowupDate(followupDate);
            existing.setNotes(notes); // e.g. "Visited and follow-up recorded"
            return repo.save(existing);
        } else {
            VisitFollowup v = new VisitFollowup();
            v.setAppointmentId(appointmentId);
            v.setPatientId(patientId);
            v.setFollowupDate(followupDate);
            v.setNotes(notes);
            v.setPaymentStatus("Pending"); // default
            return repo.save(v);
        }
    }

    // 📅 Fetch all follow-ups (for staff dashboard)
    public List<VisitFollowup> getAllFollowups() {
        return repo.findAll();
    }

    // 🧾 Get follow-ups by patient
    public List<VisitFollowup> getFollowupsByPatient(String patientId) {
        return repo.findByPatientId(patientId);
    }

    // 🧾 Get follow-ups by appointment
    public List<VisitFollowup> getFollowupsByAppointment(String appointmentId) {
        return repo.findByAppointmentId(appointmentId);
    }

    // 🩺 Doctor updates notes directly (optional shortcut)
    public VisitFollowup updateNotes(String appointmentId, String patientId, String notes) {
        List<VisitFollowup> followups = repo.findByAppointmentId(appointmentId);
        for (VisitFollowup v : followups) {
            if (v.getPatientId().equals(patientId)) {
                v.setNotes(notes);
                return repo.save(v);
            }
        }
        return null;
    }

    // 💰 Staff marks payment as completed
    public VisitFollowup markPaymentCompleted(Long id) {
        VisitFollowup v = repo.findById(id).orElse(null);
        if (v != null) {
            v.setPaymentStatus("Completed");
            return repo.save(v);
        }
        return null;
    }
}
