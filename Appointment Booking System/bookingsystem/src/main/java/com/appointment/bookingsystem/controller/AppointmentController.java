package com.appointment.bookingsystem.controller;

import com.appointment.bookingsystem.entity.Appointment;
import com.appointment.bookingsystem.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:4200")
public class AppointmentController {

    @Autowired
    private AppointmentService service;

    // 🔹 Create new appointment
    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return service.saveAppointment(appointment);
    }

    // 🔹 Get all appointments
    @GetMapping
    public List<Appointment> getAllAppointments() {
        return service.getAllAppointments();
    }

    // 🔹 Get appointment by ID
    @GetMapping("/{id}")
    public Appointment getAppointment(@PathVariable Long id) {
        return service.getAppointmentById(id).orElse(null);
    }

    // 🔹 Update appointment
    @PutMapping("/{id}")
    public Appointment updateAppointment(@PathVariable Long id, @RequestBody Appointment appointment) {
        return service.updateAppointment(id, appointment);
    }

    // 🔹 Delete appointment
    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        service.deleteAppointment(id);
    }

    // 🔹 New endpoint: doctor slot status summary
    @GetMapping("/status")
    public List<Map<String, Object>> getDoctorSlotStatus() {
        return service.getDoctorSlotStatus();
    }
}
