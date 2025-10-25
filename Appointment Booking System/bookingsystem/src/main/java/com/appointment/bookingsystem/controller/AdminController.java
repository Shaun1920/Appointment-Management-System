package com.appointment.bookingsystem.controller;
import com.appointment.bookingsystem.entity.Admin;

import com.appointment.bookingsystem.services.AdminService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request, HttpSession session) {
        String adminId = request.get("adminId");
        String password = request.get("password");

        if (adminService.login(adminId, password)) {
            session.setAttribute("admin", adminId);
            return Map.of("message", "Login successful", "adminId", adminId);
        } else {
            return Map.of("message", "Invalid credentials");
        }
    }

    @GetMapping("/check-session")
    public Map<String, Object> checkSession(HttpSession session) {
        Object admin = session.getAttribute("admin");
        if (admin != null) {
            return Map.of("loggedIn", true, "adminId", admin);
        }
        return Map.of("loggedIn", false);
    }

    @PostMapping("/logout")
    public Map<String, String> logout(HttpSession session) {
        session.invalidate();
        return Map.of("message", "Logged out successfully");
    }

    // ✅ Fetch profile by adminId
    @GetMapping("/profile/{adminId}")
    public Admin getProfile(@PathVariable String adminId) {
        return adminService.getProfile(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
    }

    // ✅ Update profile
    @PutMapping("/profile/update/{originalAdminId}")
    public Admin updateProfile(
            @PathVariable String originalAdminId,
            @RequestBody Map<String, String> request
    ) {
        String newAdminId = request.get("adminId");
        String newPassword = request.get("password");
        return adminService.updateProfile(originalAdminId, newAdminId, newPassword);
    }
}
