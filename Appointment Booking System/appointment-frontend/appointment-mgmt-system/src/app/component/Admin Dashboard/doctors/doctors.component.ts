import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Add this

interface Doctor {
  doctorId: string;
  doctorName: string;
  specialization: string;
  contactNo: string;
  role: string;
  status: string;
}

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Include FormsModule here
 templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent {
  doctors: Doctor[] = [];
  showForm = false;

  newDoctor = {
    doctorName: '',
    specialization: '',
    contactNo: '',
    role: ''
  };

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.newDoctor = { doctorName: '', specialization: '', contactNo: '', role: '' };
  }

  addDoctor() {
    const id = 'doc' + String(this.doctors.length + 1).padStart(3, '0');
    this.doctors.push({
      doctorId: id,
      doctorName: this.newDoctor.doctorName,
      specialization: this.newDoctor.specialization,
      contactNo: this.newDoctor.contactNo,
      role: this.newDoctor.role,
      status: 'Pending'
    });
    this.closeForm();
  }

  approveDoctor(doc: Doctor) {
    doc.status = 'Activated';
  }

  rejectDoctor(doc: Doctor) {
    doc.status = 'Deactivated';
  }
}