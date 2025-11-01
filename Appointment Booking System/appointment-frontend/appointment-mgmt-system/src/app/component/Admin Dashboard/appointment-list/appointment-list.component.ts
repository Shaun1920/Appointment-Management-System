import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/service/appointment.service';

@Component({
  selector: 'app-appointment-list',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  appointments: any[] = [];
  loading: boolean = true;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments() {
    this.loading = true;
    this.appointmentService.getAllAppointments().subscribe({
      next: (res) => {
        this.appointments = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching appointments', err);
        this.loading = false;
      }
    });
  }

  deleteAppointment(id: number) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.deleteAppointment(id).subscribe({
        next: () => {
          this.appointments = this.appointments.filter(a => a.id !== id);
          alert('Appointment deleted successfully');
        },
        error: (err) => console.error('Error deleting appointment', err)
      });
    }
  }

  editAppointment(id: number) {
    alert(`Edit functionality can be added here for appointment ID: ${id}`);
  }
}