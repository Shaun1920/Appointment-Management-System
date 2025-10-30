package com.appointment.bookingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.appointment.bookingsystem.entity.Staff;

import java.util.Optional;

public interface StaffRepository extends JpaRepository<Staff, Long> {
    Optional<Staff> findByStaffCodeAndPassword(String staffCode, String password);
    Optional<Staff> findByStaffCode(String staffCode);
}
