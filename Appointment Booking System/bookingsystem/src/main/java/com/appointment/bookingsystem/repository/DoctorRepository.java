//package com.appointment.bookingsystem.repository;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import com.appointment.bookingsystem.entity.Doctor;
//
//public interface DoctorRepository extends JpaRepository<Doctor, Long> {
//}


package com.appointment.bookingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.appointment.bookingsystem.entity.Doctor;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByDoctorCode(String doctorCode);
    Optional<Doctor> findByDoctorCodeAndPassword(String doctorCode, String password);
}