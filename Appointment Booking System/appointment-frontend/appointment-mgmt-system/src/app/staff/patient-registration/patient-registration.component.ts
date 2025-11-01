 import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../service/patient.service';

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent {
  // Single patient object (for registration form)
  patient = {
    name: '',
    dateOfBirth: '',
    gender: '',
    mobileNo: '',
    email: ''
  };

  // ✅ NEW: Array to hold all registered patients
  patients: any[] = [];

  // ✅ NEW: Boolean flag to toggle form visibility
  showForm = false;

  successMessage = '';
  errorMessage = '';

  constructor(private patientService: PatientService) {}

  // ✅ NEW: Toggles the registration form
  toggleForm() {
    this.showForm = !this.showForm;
  }

  // Register new patient
  registerPatient() {
    this.patientService.registerPatient(this.patient).subscribe({
      next: (response: any) => {
        this.successMessage = `Patient Registered Successfully! ID: ${response.patientCode}`;
        this.errorMessage = '';

        // ✅ Add new patient to list
        this.patients.push(response);

        // ✅ Reset form
        this.patient = { name: '', dateOfBirth: '', gender: '', mobileNo: '', email: '' };

        // ✅ Hide form after successful registration
        this.showForm = false;
      },
      error: () => {
        this.errorMessage = 'Error registering patient.';
        this.successMessage = '';
      }
    });
  }

  // Edit a patient (load data back into the form)
  editPatient(p: any) {
    this.patient = { ...p };
    this.showForm = true;
  }

  // Delete a patient card
  deletePatient(id: string) {
    this.patients = this.patients.filter(patient => patient.patientCode !== id);
  }
}
