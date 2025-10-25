package com.appointment.bookingsystem.controller;

import com.appointment.bookingsystem.entity.Doctor;
//import com.appointment.bookingsystem.service.DoctorService;
import com.appointment.bookingsystem.services.DoctorService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @PostMapping("/add")
    public Doctor addDoctor(@RequestBody Doctor doctor) {
        return doctorService.addDoctor(doctor);
    }

    @GetMapping("/all")
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @PutMapping("/update-status/{id}")
    public Doctor updateStatus(@PathVariable Long id, @RequestParam String status) {
        return doctorService.updateStatus(id, status);
    }
}
