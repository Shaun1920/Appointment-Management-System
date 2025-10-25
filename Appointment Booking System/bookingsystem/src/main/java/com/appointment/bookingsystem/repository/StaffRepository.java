package com.appointment.bookingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.appointment.bookingsystem.entity.Staff;

public interface StaffRepository extends JpaRepository<Staff, Long> {
}
