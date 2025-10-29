package com.appointment.bookingsystem.repository;

import com.appointment.bookingsystem.entity.Allocation;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AllocationRepository extends JpaRepository<Allocation, Long> {
	List<Allocation> findByDoctorCode(String doctorCode);
}
