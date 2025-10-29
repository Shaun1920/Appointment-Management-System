// src/main/java/com/appointment/bookingsystem/controller/DoctorStatusController.java
package com.appointment.bookingsystem.controller;

import com.appointment.bookingsystem.entity.DoctorStatus;
import com.appointment.bookingsystem.services.DoctorStatusService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/status")
public class DoctorStatusController {

    private final DoctorStatusService service;

    public DoctorStatusController(DoctorStatusService service) { this.service = service; }

    // Upsert any fields
    @PostMapping("/upsert")
    public DoctorStatus upsert(@RequestBody DoctorStatus payload) {
        return service.upsert(payload);
    }

    // Doctor sets availability (Available | Busy | On Leave)
    @PutMapping("/availability")
    public ResponseEntity<?> setAvailability(@RequestBody Map<String, String> body) {
        String code = body.get("doctorCode");
        String currentStatus = body.get("currentStatus");
        if (code == null || currentStatus == null) return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(service.setAvailability(code, currentStatus));
    }

    // Doctor login/logout -> account status (Active | Inactive)
    @PutMapping("/account")
    public ResponseEntity<?> setAccount(@RequestBody Map<String, String> body) {
        String code = body.get("doctorCode");
        String accountStatus = body.get("accountStatus");
        if (code == null || accountStatus == null) return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(service.setAccount(code, accountStatus));
    }

    @GetMapping("/all")
    public List<DoctorStatus> all() { return service.all(); }

    @GetMapping("/{doctorCode}")
    public ResponseEntity<?> one(@PathVariable String doctorCode) {
        DoctorStatus ds = service.get(doctorCode);
        return ds == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(ds);
    }
}