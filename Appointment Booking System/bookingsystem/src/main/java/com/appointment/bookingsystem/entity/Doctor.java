package com.appointment.bookingsystem.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(
	    name = "doctor",
	    uniqueConstraints = {
//	        @UniqueConstraint(name = "uk_doctor_email", columnNames = "email"),
	        @UniqueConstraint(name = "uk_doctor_contact", columnNames = "contactNo")
	    }
	)
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doctorId; // DB primary key

    private String doctorCode; // doct_001, doct_002
    private String doctorName;
    private String specialization;
    @NotBlank
    @Pattern(regexp = "^(7|8|9)[0-9]{9}$", message = "Contact number must be 10 digits")
    @Column(nullable = false, unique = true, length = 20)
    private String contactNo;
    private String role;
    private String dateOfBirth;
    private String password;
    private String status;

    // Getters and Setters
    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }

    public String getDoctorCode() { return doctorCode; }
    public void setDoctorCode(String doctorCode) { this.doctorCode = doctorCode; }

    public String getDoctorName() { return doctorName; }
    public void setDoctorName(String doctorName) { this.doctorName = doctorName; }

    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }

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