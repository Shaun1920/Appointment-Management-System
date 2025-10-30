import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { StaffProfileComponent } from "../staff-profile/staff-profile.component";
import { PatientRegistrationComponent } from "../patient-registration/patient-registration.component";
import { AppointmentFormComponent } from "src/app/staff/appointment-form/appointment-form.component";

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  dateTime: string | Date;
  description: string;
  status: 'Pending' | 'Checked In' | 'Completed' | 'Cancelled';
}

interface NewUser {
  fullName: string;
  phone: string;
  email?: string;
  dob?: string;
  gender?: string;
  address?: string;
}

@Component({
  selector: 'app-staff-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, StaffProfileComponent, RouterOutlet, PatientRegistrationComponent, AppointmentFormComponent],
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.css']
})
export class StaffDashboardComponent implements OnInit {

  // Sidebar & Navigation
  sidebarOpen = false;
  currentView: 'appointments' | 'track' | 'registration' | 'profile' = 'appointments';

  // Staff Details
  staffName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // ✅ Fetch logged-in staff details from localStorage
    const sessionData = localStorage.getItem('userSession');
    if (sessionData) {
      const staff = JSON.parse(sessionData);
      this.staffName = staff.staffName || 'Staff';
    } else {
      this.router.navigate(['/staff-login']); // Redirect if no session found
    }
  }

  // Sidebar Toggle
  toggleSidebar() { this.sidebarOpen = !this.sidebarOpen; }

  // Navigation
  viewAppointments() { this.currentView = 'appointments'; this.sidebarOpen = false; }
  viewTrack() { this.currentView = 'track'; this.sidebarOpen = false; }
viewRegistration() {
  this.currentView = 'registration';
  this.sidebarOpen = false;
}


  viewProfile() { this.currentView = 'profile'; this.sidebarOpen = false; }

  // ✅ Logout
  logout() {
    localStorage.clear();
    this.router.navigate(['/doctor-login']);
  }

  // ----------- Appointment Demo Logic -----------
  appointments: Appointment[] = [
    { id: 'APT-1001', patientId: 'P-001', patientName: 'Riya Sen', dateTime: new Date(), description: 'General checkup', status: 'Pending' },
    { id: 'APT-1002', patientId: 'P-002', patientName: 'Arjun Mehta', dateTime: new Date(Date.now() + 3600_000), description: 'Follow-up', status: 'Checked In' },
    { id: 'APT-1003', patientId: 'P-003', patientName: 'Aisha Khan', dateTime: new Date(Date.now() - 86400_000), description: 'Consultation', status: 'Completed' }
  ];

  filters = { query: '', status: '' } as { query: string; status: Appointment['status'] | '' };

  formatDate(d: string | Date): string {
    const dt = new Date(d);
    return dt.toLocaleString();
  }

  isPast(d: string | Date): boolean {
    return new Date(d).getTime() < Date.now();
  }

  filteredAppointments(): Appointment[] {
    const q = this.filters.query.trim().toLowerCase();
    return this.appointments.filter(a => {
      const matchQ = !q || a.patientName.toLowerCase().includes(q) || a.patientId.toLowerCase().includes(q) || a.id.toLowerCase().includes(q);
      const matchS = !this.filters.status || a.status === this.filters.status;
      return matchQ && matchS;
    });
  }

  clearFilters() { this.filters = { query: '', status: '' } as any; }

  updateStatus(a: Appointment, status: Appointment['status']) {
    if (a.status === 'Completed' && status !== 'Completed') return;
    a.status = status;
  }

  cancelAppointment(a: Appointment) {
    if (a.status === 'Completed') return;
    a.status = 'Cancelled';
  }

  statusClass(status: Appointment['status']): string {
    return {
      'Pending': 'badge pending',
      'Checked In': 'badge checkedin',
      'Completed': 'badge completed',
      'Cancelled': 'badge cancelled'
    }[status];
  }

  // ----------- Track Appointment Logic -----------
  trackId = '';
  trackedAppointment: Appointment | null = null;
  trackError = '';

  trackAppointment() {
    this.trackedAppointment = null;
    this.trackError = '';
    const id = this.trackId.trim().toLowerCase();
    if (!id) { this.trackError = 'Please enter an Appointment ID or Patient ID.'; return; }
    const found = this.appointments.find(a => a.id.toLowerCase() === id || a.patientId.toLowerCase() === id);
    if (!found) { this.trackError = 'No matching appointment found.'; return; }
    this.trackedAppointment = found;
  }

  // ----------- User Registration Logic -----------
  newUser: NewUser = { fullName: '', phone: '', email: '', dob: '', gender: '', address: '' };
  registrationMessage = '';

  registerUser() {
    this.registrationMessage = `User “${this.newUser.fullName}” registered successfully.`;
  }

  resetRegistration() {
    this.newUser = { fullName: '', phone: '', email: '', dob: '', gender: '', address: '' };
    this.registrationMessage = '';
  }
}
