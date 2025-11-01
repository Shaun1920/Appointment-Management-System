package com.appointment.bookingsystem.repository;

import com.appointment.bookingsystem.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Map;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
	List<Appointment> findByDoctorId(String doctorId);
    // 🔹 Aggregate doctor-slot count
    @Query("SELECT a.doctorId AS doctorId, a.doctorName AS doctorName, a.slot AS slot, COUNT(a) AS count " +
           "FROM Appointment a GROUP BY a.doctorId, a.doctorName, a.slot")
    List<Map<String, Object>> countAppointmentsByDoctorAndSlot();
    long countByDoctorIdAndSlot(String doctorId, String slot);

}
