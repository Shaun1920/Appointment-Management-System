package com.appointment.bookingsystem.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String adminId;
    private String password;

    public Admin() {}

    public Admin(String adminId, String password) {
        this.adminId = adminId;
        this.password = password;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public String getAdminId() { return adminId; }
    public void setAdminId(String adminId) { this.adminId = adminId; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
