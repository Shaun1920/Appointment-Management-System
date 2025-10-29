package com.appointment.bookingsystem.controller;

import com.appointment.bookingsystem.entity.Doctor;
//import com.appointment.bookingsystem.service.DoctorService;
import com.appointment.bookingsystem.services.DoctorService;

import org.springframework.http.ResponseEntity;
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
    
 // com.appointment.bookingsystem.controller.DoctorController.java
    @GetMapping("/by-code/{doctorCode}")
    public ResponseEntity<?> getDoctorByCode(@PathVariable String doctorCode) {
        return doctorService.getDoctorByCode(doctorCode)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update-status/{id}")
    public Doctor updateStatus(@PathVariable Long id, @RequestParam String status) {
        return doctorService.updateStatus(id, status);
    }
    
    @PutMapping("/update")
    public Doctor updateDoctor(@RequestBody Doctor doctor) {
        return doctorService.updateDoctor(doctor);
    }
}
