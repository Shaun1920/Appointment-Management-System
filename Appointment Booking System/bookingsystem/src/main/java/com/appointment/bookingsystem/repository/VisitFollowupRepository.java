package com.appointment.bookingsystem.repository;

import com.appointment.bookingsystem.entity.VisitFollowup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VisitFollowupRepository extends JpaRepository<VisitFollowup, Long> {

    VisitFollowup findByAppointmentIdAndPatientId(String appointmentId, String patientId);

    List<VisitFollowup> findByPatientId(String patientId);

    List<VisitFollowup> findByAppointmentId(String appointmentId);
}
