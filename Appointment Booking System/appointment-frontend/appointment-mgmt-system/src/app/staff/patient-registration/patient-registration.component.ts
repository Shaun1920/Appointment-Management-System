import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { StaffService } from 'src/app/service/staff.service';
import { PatientService } from '../../service/patient.service';

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent {
  patient = {
    name: '',
    dateOfBirth: '',
    gender: '',
    mobileNo: '',
    email: ''
  };

  successMessage = '';
  errorMessage = '';

 constructor(private patientService: PatientService) {}


  registerPatient() {
    this.patientService.registerPatient(this.patient).subscribe({
      next: (response: any) => {
        this.successMessage = `Patient Registered Successfully! ID: ${response.patientCode}`;
        this.errorMessage = '';
        this.patient = { name: '', dateOfBirth: '', gender: '', mobileNo: '', email: '' };
      },
      error: () => {
        this.errorMessage = 'Error registering patient.';
        this.successMessage = '';
      }
    });
  }
}
