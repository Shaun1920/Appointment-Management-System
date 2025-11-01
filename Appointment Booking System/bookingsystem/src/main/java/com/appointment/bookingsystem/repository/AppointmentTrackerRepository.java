package com.appointment.bookingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.appointment.bookingsystem.entity.AppointmentTracker;

@Repository
public interface AppointmentTrackerRepository extends JpaRepository<AppointmentTracker, Long> {}
