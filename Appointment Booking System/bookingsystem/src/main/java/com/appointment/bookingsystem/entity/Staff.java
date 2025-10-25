package com.appointment.bookingsystem.entity;

import jakarta.persistence.*;

@Entity
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long staffId; // DB primary key

    private String staffCode; // custom staff_001, staff_002
    private String name;
    private String contactNo;
    private String role;
    private String dateOfBirth;
    private String password;
    private String status;

    // Getters and Setters
    public Long getStaffId() { return staffId; }
    public void setStaffId(Long staffId) { this.staffId = staffId; }

    public String getStaffCode() { return staffCode; }
    public void setStaffCode(String staffCode) { this.staffCode = staffCode; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getContactNo() { return contactNo; }
    public void setContactNo(String contactNo) { this.contactNo = contactNo; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(String dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
