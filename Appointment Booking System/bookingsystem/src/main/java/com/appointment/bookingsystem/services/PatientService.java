package com.appointment.bookingsystem.services;

import com.appointment.bookingsystem.entity.Patient;
import com.appointment.bookingsystem.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    // ✅ Register new patient
    public Patient registerPatient(Patient patient) {
        long count = patientRepository.countPatients() + 1;
        String patientCode = String.format("pat_%03d", count);
        patient.setPatientCode(patientCode);
        return patientRepository.save(patient);
    }

    // ✅ Search patient by mobile number
    public Optional<Patient> getPatientByMobile(String mobileNo) {
        return patientRepository.findByMobileNo(mobileNo);
    }
    
    public List<Patient> getAll() {
        return patientRepository.findAll();
    }
}
