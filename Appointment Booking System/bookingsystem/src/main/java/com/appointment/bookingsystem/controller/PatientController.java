package com.appointment.bookingsystem.controller;

import com.appointment.bookingsystem.entity.Patient;
import com.appointment.bookingsystem.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    // ✅ Register patient
    @PostMapping("/register")
    public Patient registerPatient(@RequestBody Patient patient) {
        return patientService.registerPatient(patient);
    }

    // ✅ Search patient by mobile number
    @GetMapping("/search")
    public ResponseEntity<?> getPatientByMobile(@RequestParam String mobileNo) {
        Optional<Patient> patient = patientService.getPatientByMobile(mobileNo);
        if (patient.isPresent()) {
            return ResponseEntity.ok(patient.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No patient found with mobile number: " + mobileNo);
        }
    }
}
