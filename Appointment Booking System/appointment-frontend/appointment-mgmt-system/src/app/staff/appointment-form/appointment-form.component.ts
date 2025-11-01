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

  message = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(private svc: AppointmentService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAppointments();
    this.fetchDoctors(); // ✅ Load doctor list
  }

  // Load all appointments
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

  // Get doctor name by ID
  getDoctorName(code: string): string {
    const doctor = this.doctors.find(d => d.doctorCode === code);
    return doctor ? doctor.doctorCode : ''; // or use doctor.name if exists
  }

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
    this.message = '';
    this.showModal = true;
  }

  editAppointment(index: number): void {
    const a = this.appointments[index];
    this.editingId = a.id;
    this.appointment = { ...a };
    this.message = '';
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveAppointment(): void {
    if (!this.appointment.patientId || !this.appointment.doctorId) {
      this.showMessage('Patient ID and Doctor ID are required.', 'error');
      return;
    }

    // ✅ Check if doctor has already 5 appointments
    const doctorAppointments = this.appointments.filter(
      a => a.doctorId === this.appointment.doctorId
    );

    if (doctorAppointments.length >= 5 && !this.editingId) {
      this.showMessage(
        `All 5 slots for Doctor ${this.appointment.doctorName} are full!`,
        'error'
      );
      return;
    }

    if (this.editingId) {
      this.svc.updateAppointment(this.editingId, this.appointment).subscribe({
        next: () => {
          this.showMessage('Appointment updated successfully.', 'success');
          this.loadAppointments();
          this.closeModal();
        },
        error: err => this.showMessage('Error updating appointment.', 'error')
      });
    } else {
      this.svc.createAppointment(this.appointment).subscribe({
        next: () => {
          this.showMessage('Appointment created successfully.', 'success');
          this.loadAppointments();
          this.closeModal();
        },
        error: err => this.showMessage('Error creating appointment.', 'error')
      });
    }
  }

  deleteAppointment(index: number): void {
    const a = this.appointments[index];
    if (!a.id) return;
    if (!confirm('Delete appointment?')) return;
    this.svc.deleteAppointment(a.id).subscribe({
      next: () => {
        this.showMessage('Appointment deleted successfully.', 'success');
        this.loadAppointments();
      },
      error: err => this.showMessage('Error deleting appointment.', 'error')
    });
  }

  private showMessage(msg: string, type: 'success' | 'error'): void {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 4000);
  }
}
