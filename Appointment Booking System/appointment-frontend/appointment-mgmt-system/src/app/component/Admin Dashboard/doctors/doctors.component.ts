import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { Doctor, DoctorService } from '../services/doctor.service';
import { DoctorService,Doctor } from 'src/app/service/Admin Service/Admin-Doctor Service/doctor.service';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[] = [];
  showForm = false;
  newDoctor: Doctor = { doctorName: '', specialization: '', contactNo: '', role: '', dateOfBirth: '' };

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe(data => this.doctors = data);
  }

  openForm() { this.showForm = true; }
  closeForm() {
    this.showForm = false;
    this.newDoctor = { doctorName: '', specialization: '', contactNo: '', role: '', dateOfBirth: '' };
  }

  addDoctor() {
    const contactPattern = /^[789]\d{9}$/;
    if (!contactPattern.test(this.newDoctor.contactNo)) {
      alert('Contact number must be 10 digits and start with 7, 8, or 9.');
      return;
    }

    this.doctorService.addDoctor(this.newDoctor).subscribe(() => {
      this.loadDoctors();
      this.closeForm();
    });
  }

  approveDoctor(doctor: Doctor) {
    this.doctorService.updateStatus(doctor.doctorId!, 'Activated').subscribe(() => this.loadDoctors());
  }

  rejectDoctor(doctor: Doctor) {
    this.doctorService.updateStatus(doctor.doctorId!, 'Deactivated').subscribe(() => this.loadDoctors());
  }
}
