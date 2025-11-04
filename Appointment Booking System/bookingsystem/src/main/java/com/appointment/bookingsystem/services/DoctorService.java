package com.appointment.bookingsystem.services;

import com.appointment.bookingsystem.entity.Doctor;
import com.appointment.bookingsystem.repository.DoctorRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public Doctor addDoctor(Doctor doctor) {
        doctor.setStatus("Pending");
        doctor.setPassword(doctor.getDoctorName() + "@" + doctor.getDateOfBirth());

        // Save first to generate DB ID
        Doctor savedDoctor = doctorRepository.save(doctor);

        // Generate custom doctorCode: doct_001, doct_002...
        String code = "doct_" + String.format("%03d", savedDoctor.getDoctorId());
        savedDoctor.setDoctorCode(code);

        return doctorRepository.save(savedDoctor);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor updateStatus(Long doctorId, String status) {
        Doctor doctor = doctorRepository.findById(doctorId).orElse(null);
        if (doctor != null) {
            doctor.setStatus(status);
            return doctorRepository.save(doctor);
        }
        return null;
    }
    
 // com.appointment.bookingsystem.services.DoctorService.java
    public Optional<Doctor> getDoctorByCode(String doctorCode) {
        return doctorRepository.findByDoctorCode(doctorCode);
    }
    
    public Doctor updateDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }
}