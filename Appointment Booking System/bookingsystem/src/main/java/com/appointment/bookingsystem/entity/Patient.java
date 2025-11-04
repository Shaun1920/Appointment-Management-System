package com.appointment.bookingsystem.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity
//@Table(name = "patients")
@Table(
	    name = "patients",
	    uniqueConstraints = {
//	        @UniqueConstraint(name = "uk_doctor_email", columnNames = "email"),
	        @UniqueConstraint(name = "uk_patients_contact", columnNames = "mobileNo")
	    }
	)
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String patientCode;

    private String name;
    private String dateOfBirth;
    private String gender;
    @NotBlank
    @Pattern(regexp = "^(7|8|9)[0-9]{9}$", message = "Contact number must be 10 digits")
    @Column(nullable = false, unique = true, length = 20)
    private String mobileNo;
    private String email;

    public Patient() {}

    public Patient(String patientCode, String name, String dateOfBirth, String gender, String mobileNo, String email) {
        this.patientCode = patientCode;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.mobileNo = mobileNo;
        this.email = email;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public String getPatientCode() { return patientCode; }
    public void setPatientCode(String patientCode) { this.patientCode = patientCode; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(String dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public String getMobileNo() { return mobileNo; }
    public void setMobileNo(String mobileNo) { this.mobileNo = mobileNo; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
