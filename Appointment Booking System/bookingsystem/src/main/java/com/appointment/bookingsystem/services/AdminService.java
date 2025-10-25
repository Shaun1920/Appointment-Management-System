package com.appointment.bookingsystem.services;

import com.appointment.bookingsystem.entity.Admin;
import com.appointment.bookingsystem.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.Optional;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    @PostConstruct
    public void initAdmin() {
        if (adminRepository.findByAdminId("admin123").isEmpty()) {
            Admin admin = new Admin("admin123", "admin@123");
            adminRepository.save(admin);
            System.out.println("✅ Default Admin Created: admin123 / admin@123");
        }
    }

    public boolean login(String adminId, String password) {
        return adminRepository.findByAdminIdAndPassword(adminId, password).isPresent();
    }

    // Fetch admin profile
    public Optional<Admin> getProfile(String adminId) {
        return adminRepository.findByAdminId(adminId);
    }

    // Update admin profile
    public Admin updateProfile(String originalAdminId, String newAdminId, String newPassword) {
        Optional<Admin> adminOpt = adminRepository.findByAdminId(originalAdminId);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            admin.setAdminId(newAdminId);
            admin.setPassword(newPassword);
            return adminRepository.save(admin);
        }
        throw new RuntimeException("Admin not found");
    }
}
