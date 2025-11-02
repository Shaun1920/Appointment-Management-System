package com.appointment.bookingsystem.repository;

import com.appointment.bookingsystem.entity.VisitFollowup;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VisitFollowupRepository extends JpaRepository<VisitFollowup, Long> {
    List<VisitFollowup> findByAppointmentId(String appointmentId);
    List<VisitFollowup> findByPatientId(String patientId);
    VisitFollowup findByAppointmentIdAndPatientId(String appointmentId, String patientId);
}
