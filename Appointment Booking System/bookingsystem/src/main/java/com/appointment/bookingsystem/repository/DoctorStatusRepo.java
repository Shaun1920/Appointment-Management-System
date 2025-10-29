// src/main/java/com/appointment/bookingsystem/repository/DoctorStatusRepository.java
package com.appointment.bookingsystem.repository;

import com.appointment.bookingsystem.entity.DoctorStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorStatusRepo extends JpaRepository<DoctorStatus, Long> {
    Optional<DoctorStatus> findByDoctorCode(String doctorCode);
}