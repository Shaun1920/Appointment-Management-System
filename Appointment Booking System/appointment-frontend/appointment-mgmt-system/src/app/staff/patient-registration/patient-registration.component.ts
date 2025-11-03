import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PatientService } from '../../service/patient.service';

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent {
  // Patient form model
  patient = {
    name: '',
    dateOfBirth: '',
    gender: '',
    mobileNo: '',
    email: ''
  };

  // List of all registered patients
  patients: any[] = [];

  // Controls visibility of registration form
  showForm = false;

  successMessage = '';
  errorMessage = '';

  constructor(private patientService: PatientService) {}

  // ✅ Toggle form visibility
  toggleForm() {
    this.showForm = !this.showForm;
  }

  // ✅ Register a new patient with basic validation
  registerPatient(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      this.successMessage = '';
      return;
    }

    // Phone number validation (must start with 98 and be 10 digits)
    const phonePattern = /^(7|8|9)[0-9]{9}$/;
    if (!phonePattern.test(this.patient.mobileNo)) {
      this.errorMessage = 'Mobile number must start with 7,8 or 9 and contain 10 digits.';
      this.successMessage = '';
      return;
    }

    // Email validation pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(this.patient.email)) {
      this.errorMessage = 'Please enter a valid email address (example@domain.com).';
      this.successMessage = '';
      return;
    }

    // Call API if validation passes
    this.patientService.registerPatient(this.patient).subscribe({
      next: (response: any) => {
        this.successMessage = `Patient Registered Successfully! ID: ${response.patientCode}`;
        this.errorMessage = '';

        // Add patient to list
        this.patients.push(response);

        // Reset form and hide
        form.resetForm();
        this.showForm = false;
      },
      error: () => {
        this.errorMessage = 'Error registering patient.';
        this.successMessage = '';
      }
    });
  }

  // ✅ Load selected patient data into the form
  editPatient(p: any) {
    this.patient = { ...p };
    this.showForm = true;
  }

  // ✅ Delete a patient card from UI
  deletePatient(id: string) {
    this.patients = this.patients.filter(patient => patient.patientCode !== id);
  }
}