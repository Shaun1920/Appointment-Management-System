package com.appointment.bookingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.appointment.bookingsystem.entity.Admin;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByAdminIdAndPassword(String adminId, String password);
    Optional<Admin> findByAdminId(String adminId);

}
