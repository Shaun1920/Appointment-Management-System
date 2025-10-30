//// com.appointment.bookingsystem.controller.StaffAuthController
//package com.appointment.bookingsystem.controller;
//
//import com.appointment.bookingsystem.entity.Staff;
//import com.appointment.bookingsystem.repository.StaffRepository;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Map;
//
//@CrossOrigin(origins = "*")
//@RestController
//@RequestMapping("/api/auth/staff")
//public class StaffAuthController {
//
//    private final StaffRepository repo;
//    public StaffAuthController(StaffRepository repo) { this.repo = repo; }
//
//    public record LoginRequest(String staffCode, String password) {}
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
//        // Optional bypass similar to doctor, keep or remove:
//        if ("staff".equalsIgnoreCase(req.staffCode())) {
//            return ResponseEntity.ok(Map.of(
//                "allowed", true,
//                "reason", "bypass",
//                "role", "staff",
//                "staffCode", req.staffCode(),
//                "staffName", "Staff"
//            ));
//        }
//
//        return repo.findByStaffCodeAndPassword(req.staffCode(), req.password())
//            .map(s -> {
//                if ("Activated".equalsIgnoreCase(s.getStatus())) {
//                    return ResponseEntity.ok(Map.of(
//                        "allowed", true,
//                        "reason", "activated",
//                        "role", "staff",
//                        "staffId", s.getStaffId(),
//                        "staffCode", s.getStaffCode(),
//                        "staffName", s.getName()
//                    ));
//                } else {
//                    return ResponseEntity.status(403).body(Map.of(
//                        "allowed", false,
//                        "reason", "not_activated",
//                        "message", "Access denied: Your account is not activated."
//                    ));
//                }
//            })
//            .orElseGet(() -> ResponseEntity.status(401).body(Map.of(
//                "allowed", false,
//                "reason", "invalid_credentials",
//                "message", "Invalid Code or Password."
//            )));
//    }
//}

package com.appointment.bookingsystem.controller;

import com.appointment.bookingsystem.entity.Staff;
import com.appointment.bookingsystem.repository.StaffRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth/staff")
public class StaffAuthController {

    private final StaffRepository repo;

    public StaffAuthController(StaffRepository repo) {
        this.repo = repo;
    }

    public record LoginRequest(String staffCode, String password) {}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        // Optional bypass
        if ("staff".equalsIgnoreCase(req.staffCode())) {
            return ResponseEntity.ok(Map.of(
                    "allowed", true,
                    "reason", "bypass",
                    "role", "staff",
                    "staffCode", req.staffCode(),
                    "staffName", "Staff"
            ));
        }

        return repo.findByStaffCodeAndPassword(req.staffCode(), req.password())
                .map(s -> {
                    if ("Activated".equalsIgnoreCase(s.getStatus())) {
                        return ResponseEntity.ok(Map.of(
                                "allowed", true,
                                "reason", "activated",
                                "role", "staff",
                                "staffId", s.getStaffId(),
                                "staffCode", s.getStaffCode(),
                                "staffName", s.getName()
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
                        "message", "Invalid Code or Password."
                )));
    }
}
