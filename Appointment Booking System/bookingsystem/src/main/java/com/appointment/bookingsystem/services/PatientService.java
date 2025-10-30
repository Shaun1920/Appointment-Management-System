package com.appointment.bookingsystem.services;

import com.appointment.bookingsystem.entity.Patient;
import com.appointment.bookingsystem.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public Patient registerPatient(Patient patient) {
        long count = patientRepository.countPatients() + 1;
        String patientCode = String.format("pat_%03d", count);
        patient.setPatientCode(patientCode);
        return patientRepository.save(patient);
    }
}
