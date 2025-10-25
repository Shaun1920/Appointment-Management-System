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

    // Create default admin on startup
    @PostConstruct
    public void initAdmin() {
        if (adminRepository.findByAdminId("admin123").isEmpty()) {
            Admin admin = new Admin("admin123", "admin@123");
            adminRepository.save(admin);
            System.out.println("✅ Default Admin Created: admin123 / admin@123");
        }
    }

    public boolean login(String adminId, String password) {
        Optional<Admin> admin = adminRepository.findByAdminIdAndPassword(adminId, password);
        return admin.isPresent();
    }
}
