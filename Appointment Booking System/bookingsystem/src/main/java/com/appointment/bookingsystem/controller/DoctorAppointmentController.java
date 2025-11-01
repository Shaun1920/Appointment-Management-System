// DoctorAppointmentController.java
package com.appointment.bookingsystem.controller;

import com.appointment.bookingsystem.entity.Appointment;
import com.appointment.bookingsystem.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/doctor")
@CrossOrigin(origins = "*")
public class DoctorAppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping("/{doctorId}/appointments")
    public List<Appointment> getAppointmentsByDoctor(@PathVariable String doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }
}
