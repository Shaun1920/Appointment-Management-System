package com.appointment.bookingsystem.controller;

import com.appointment.bookingsystem.entity.Patient;
import com.appointment.bookingsystem.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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
//    @PostMapping("/register")
//    public Patient registerPatient(@RequestBody Patient patient) {
//        return patientService.registerPatient(patient);
//    }
    
    @PostMapping("/register")
    public ResponseEntity<?> registerPatient(@RequestBody Patient patient) {
        try {
            // Pre-check for nicer UX (still keep the catch below for race conditions)
            if (patientService.getPatientByMobile(patient.getMobileNo()).isPresent()) {
                return ResponseEntity.status(409).body("Mobile number already exists. Please use a different number.");
            }
            Patient saved = patientService.registerPatient(patient);
            return ResponseEntity.ok(saved);
        } catch (DataIntegrityViolationException ex) {
            return ResponseEntity.badRequest().body("Mobile number already exists. Please use a different number.");
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().body("An unexpected error occurred.");
        }
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
    
    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(patientService.getAll());
    }
}
