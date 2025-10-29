package com.appointment.bookingsystem.controller;

import com.appointment.bookingsystem.entity.Doctor;
import com.appointment.bookingsystem.repository.DoctorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth/doctor")
public class DoctorAuthController {

    private final DoctorRepository repo;
    public DoctorAuthController(DoctorRepository repo) { this.repo = repo; }

    public record LoginRequest(String doctorCode, String password) {}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        // Bypass rule: doctorCode == "doc"
        if ("doc".equalsIgnoreCase(req.doctorCode())) {
            return ResponseEntity.ok(Map.of(
                "allowed", true,
                "reason", "bypass",
                "doctorCode", req.doctorCode(),
                "doctorName", "Doctor"
            ));
        }

        return repo.findByDoctorCodeAndPassword(req.doctorCode(), req.password())
            .map(d -> {
                if ("Activated".equalsIgnoreCase(d.getStatus())) {
                    return ResponseEntity.ok(Map.of(
                        "allowed", true,
                        "reason", "activated",
                        "doctorId", d.getDoctorId(),
                        "doctorCode", d.getDoctorCode(),
                        "doctorName", d.getDoctorName()
                    ));
                } else {
                    return ResponseEntity.status(403).body(Map.of(
                        "allowed", false,
                        "reason", "not_activated",
                        "message", "Access denied: Your account is not activated."
                    ));
                }
            })
            .orElseGet(() -> ResponseEntity.status(401).body(Map.of(
                "allowed", false,
                "reason", "invalid_credentials",
                "message", "Invalid Doctor Code or Password."
            )));
    }
}