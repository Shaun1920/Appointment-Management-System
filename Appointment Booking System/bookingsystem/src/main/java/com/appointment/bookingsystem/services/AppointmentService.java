package com.appointment.bookingsystem.services;

import com.appointment.bookingsystem.entity.Appointment;
import com.appointment.bookingsystem.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository repo;

    // ✅ Save a new appointment (limit: 2 per doctor per slot)
    public Appointment saveAppointment(Appointment appointment) {
        // Count how many appointments already exist for this doctor and slot
        long count = repo.countByDoctorIdAndSlot(appointment.getDoctorId(), appointment.getSlot());
        if (count >= 2) {
            throw new IllegalArgumentException("❌ Doctor already has 2 appointments for this slot.");
        }

        // Generate random appointment ID if missing
        if (appointment.getAppointmentId() == null || appointment.getAppointmentId().isEmpty()) {
            appointment.setAppointmentId("APT-" + (int) (Math.random() * 1000000));
        }

        appointment.setTimestamp(LocalDateTime.now());
        return repo.save(appointment);
    }

    // 🔹 Get all appointments
    public List<Appointment> getAllAppointments() {
        return repo.findAll();
    }

    // 🔹 Get by ID
    public Optional<Appointment> getAppointmentById(Long id) {
        return repo.findById(id);
    }

    // 🔹 Update appointment
    public Appointment updateAppointment(Long id, Appointment updated) {
        return repo.findById(id).map(existing -> {
            existing.setPatientId(updated.getPatientId());
            existing.setDoctorId(updated.getDoctorId());
            existing.setDoctorName(updated.getDoctorName());
            existing.setDescription(updated.getDescription());
            existing.setTime(updated.getTime());
            existing.setSlot(updated.getSlot());
            existing.setType(updated.getType());
            existing.setTimestamp(LocalDateTime.now());
            return repo.save(existing);
        }).orElseThrow(() -> new RuntimeException("Appointment not found"));
    }

    // 🔹 Delete
    public void deleteAppointment(Long id) {
        repo.deleteById(id);
    }

    // 🔹 Doctor slot summary (for dashboard/status)
    public List<Map<String, Object>> getDoctorSlotStatus() {
        return repo.countAppointmentsByDoctorAndSlot();
    }
}
