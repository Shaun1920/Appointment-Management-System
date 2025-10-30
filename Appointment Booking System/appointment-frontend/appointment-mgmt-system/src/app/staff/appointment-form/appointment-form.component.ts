import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Appointment {
  appointmentId?: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  description: string;
  time: string;
  slot: string;
  type: string;
  timestamp?: Date;
}

@Component({
   selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent {
  showModal = false;
  editIndex?: number;
  appointments: Appointment[] = [];

  appointment: Appointment = {
    patientId: '',
    doctorId: '',
    doctorName: '',
    description: '',
    time: '',
    slot: '',
    type: ''
  };

  // Open the modal
  openModal(): void {
    console.log('openModal called, editIndex =', this.editIndex);
    this.showModal = true;
    this.editIndex = undefined;
    this.appointment = {
      patientId: '',
      doctorId: '',
      doctorName: '',
      description: '',
      time: '',
      slot: '',
      type: ''
    };
  }

  // Close the modal
  closeModal(): void {
    this.showModal = false;
  }

  // Save or update appointment
  saveAppointment(): void {
    if (!this.appointment.patientId || !this.appointment.doctorId) {
      alert('Please fill in all required fields!');
      return;
    }

    if (this.editIndex !== undefined) {
      // Update existing appointment
      this.appointments[this.editIndex] = {
        ...this.appointment,
        timestamp: new Date()
      };
      this.editIndex = undefined;
    } else {
      // Create new appointment with random ID
      const newAppointment = {
        ...this.appointment,
        appointmentId: this.generateAppointmentId(),
        timestamp: new Date()
      };
      this.appointments.push(newAppointment);
    }

    this.closeModal();
  }

  // Edit an existing appointment
  editAppointment(index: number): void {
    this.editIndex = index;
    this.appointment = { ...this.appointments[index] };
    this.showModal = true;
  }

  // Delete an appointment
  deleteAppointment(index: number): void {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointments.splice(index, 1);
    }
  }

  // Generate random appointment ID
  private generateAppointmentId(): string {
    return 'APT-' + Math.floor(100000 + Math.random() * 900000);
  }
}
