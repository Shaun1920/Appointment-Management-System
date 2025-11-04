import { Component, OnInit } from '@angular/core';
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
export class PatientRegistrationComponent implements OnInit {
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

  // Controls form modal visibility
  showForm = false;

  successMessage = '';
  errorMessage = '';

  // ✅ For search
  searchMobileNo: string = '';

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.loadAllPatients();
  }

  // ✅ Toggle form visibility
  toggleForm() {
    this.showForm = !this.showForm;
    this.successMessage = '';
    this.errorMessage = '';
  }

  // ✅ Load all registered patients
  loadAllPatients() {
    this.patientService.getAllPatients().subscribe({
      next: (data) => {
        this.patients = data || [];
      },
      error: () => {
        console.warn('Could not load patients.');
      }
    });
  }

  // ✅ Register a new patient
  registerPatient(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      this.successMessage = '';
      return;
    }

    const phonePattern = /^(7|8|9)[0-9]{9}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/;

    if (!phonePattern.test(this.patient.mobileNo)) {
      this.errorMessage = 'Mobile number must start with 7, 8, or 9 and contain 10 digits.';
      this.successMessage = '';
      return;
    }

    if (!emailPattern.test(this.patient.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      this.successMessage = '';
      return;
    }

    // this.patientService.registerPatient(this.patient).subscribe({
    //   next: (response: any) => {
    //     this.successMessage = `Patient Registered Successfully! ID: ${response.patientCode}`;
    //     this.errorMessage = '';
    //     this.patients.push(response);
    //     form.resetForm();
    //     this.showForm = false;
    //   },
    //   error: () => {
    //     this.errorMessage = 'Error registering patient.';
    //     this.successMessage = '';
    //   }
    // });
    this.patientService.registerPatient(this.patient).subscribe({
      next: (response: any) => {
        this.successMessage = `Patient Registered Successfully! ID: ${response.patientCode}`;
        this.errorMessage = '';
        this.patients.push(response);
        form.resetForm();
        this.showForm = false;
      },
      error: (err: Error) => {
        this.errorMessage = err.message; // e.g., "Mobile number already exists..."
        this.successMessage = '';
      }
    });
  }

  // ✅ Edit patient details (prefills form)
  editPatient(p: any) {
    this.patient = { ...p };
    this.showForm = true;
  }

  // ✅ Delete a patient (frontend only)
  deletePatient(id: string) {
    this.patients = this.patients.filter(patient => patient.patientCode !== id);
  }

  // ✅ Search patient by mobile number
  searchPatientByMobile() {
    if (!this.searchMobileNo) {
      this.loadAllPatients();
      return;
    }

    this.patientService.getPatientByMobile(this.searchMobileNo).subscribe({
      next: (data) => {
        this.patients = [data];
        this.successMessage = `Patient found for mobile number: ${this.searchMobileNo}`;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = `No patient found with mobile number: ${this.searchMobileNo}`;
        this.successMessage = '';
        this.patients = [];
      }
    });
  }
}
