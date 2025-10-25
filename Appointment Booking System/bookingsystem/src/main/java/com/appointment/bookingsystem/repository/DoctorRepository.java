package com.appointment.bookingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.appointment.bookingsystem.entity.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}
