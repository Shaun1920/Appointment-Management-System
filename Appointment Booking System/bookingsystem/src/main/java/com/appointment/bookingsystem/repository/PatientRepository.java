package com.appointment.bookingsystem.repository;

import com.appointment.bookingsystem.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    @Query("SELECT COUNT(p) FROM Patient p")
    long countPatients();
}
