import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppointmentService, Appointment } from 'src/app/service/appointment.service';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  showModal = false;
  appointments: Appointment[] = [];
  doctors: any[] = []; // ✅ Store doctor list from backend
  editingId?: number;

  appointment: Appointment = {
    patientId: '',
    doctorId: '',
    doctorName: '',
    description: '',
    time: '',
    slot: '',
    type: 'normal'
  };

  constructor(private svc: AppointmentService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAppointments();
    this.fetchDoctors(); // ✅ Load doctor list
  }

  // ✅ Load all appointments
  loadAppointments(): void {
    this.svc.getAllAppointments().subscribe({
      next: data => (this.appointments = data),
      error: err => console.error('Error loading appointments', err)
    });
  }

  // ✅ Fetch doctor list from backend
  fetchDoctors(): void {
    this.http.get<any[]>('http://localhost:8080/api/status/all').subscribe({
      next: data => {
        this.doctors = data;
        console.log('Doctors fetched:', this.doctors);
      },
      error: err => console.error('Error fetching doctors', err)
    });
  }

  // ✅ Get doctor name by ID
  getDoctorName(code: string): string {
    const doctor = this.doctors.find(d => d.doctorCode === code);
    return doctor ? doctor.doctorCode : ''; // or use doctor.name if available
  }

  // ✅ Open modal
  openModal(): void {
    this.editingId = undefined;
    this.appointment = {
      patientId: '',
      doctorId: '',
      doctorName: '',
      description: '',
      time: '',
      slot: '',
      type: 'normal'
    };
    this.showModal = true;
  }

  // ✅ Edit existing appointment
  editAppointment(index: number): void {
    const a = this.appointments[index];
    this.editingId = a.id;
    this.appointment = { ...a };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  // ✅ Save or Update appointment
  saveAppointment(): void {
    if (!this.appointment.patientId || !this.appointment.doctorId) {
      alert('⚠️ Please fill in both Patient ID and Doctor ID.');
      return;
    }

    // ✅ Limit: 5 appointments per doctor
    const doctorAppointments = this.appointments.filter(
      a => a.doctorId === this.appointment.doctorId
    );

    if (doctorAppointments.length >= 2 && !this.editingId) {
      alert(`🚫 Doctor ${this.appointment.doctorName} already has 2 appointments!`);
      return;
    }

    if (this.editingId) {
      this.svc.updateAppointment(this.editingId, this.appointment).subscribe({
        next: () => {
          alert('✅ Appointment updated successfully.');
          this.loadAppointments();
          this.closeModal();
        },
        error: err => {
          console.error('Error updating appointment:', err);
          alert('❌ Failed to update appointment.');
        }
      });
    } else {
      this.svc.createAppointment(this.appointment).subscribe({
        next: () => {
          alert('✅ Appointment created successfully.');
          this.loadAppointments();
          this.closeModal();
        },
        error: err => {
          console.error('Error creating appointment:', err);
          alert('❌ Failed to create appointment.');
        }
      });
    }
  }

  // ✅ Delete appointment
  deleteAppointment(index: number): void {
    const a = this.appointments[index];
    if (!a.id) return;
    if (!confirm('🗑️ Are you sure you want to delete this appointment?')) return;

    this.svc.deleteAppointment(a.id).subscribe({
      next: () => {
        alert('✅ Appointment deleted successfully.');
        this.loadAppointments();
      },
      error: err => {
        console.error('Error deleting appointment:', err);
        alert('❌ Failed to delete appointment.');
      }
    });
  }
}
