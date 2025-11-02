import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { DoctorProfileComponent } from '../doctor-profile/doctor-profile.component';
import { DoctorProfileService, DoctorProfile } from 'src/app/service/Doctor Service/doctor-profile.service';
import { StatusService } from 'src/app/service/Doctor Service/status.service';
import { DoctorAllocationService, Allocation } from 'src/app/service/Doctor Service/doctor-allocation.service';
import { DoctorDashboardService } from 'src/app/service/doctor-dashboard.service';
import { Appointment } from 'src/app/model/Appointment.model';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, DoctorProfileComponent],
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {

  sidebarOpen = false;
  loading = false;
  loadingAllocations = false;

  doctorName: string = 'Loading…';
  doctorId: string = '';
  accountStatus: 'Active' | 'Inactive' = 'Inactive';
  availabilityOptions = ['Available', 'Busy', 'On Leave'];
  availability: string = '--';
  latestShift: string | null = null;
  latestRoom: string | null = null;

  appointments: (Appointment & { visited?: boolean; followupDate?: string })[] = [];
  filteredAppointments: (Appointment & { visited?: boolean; followupDate?: string })[] = [];
  historyAppointments: Appointment[] = [];

  currentView: 'appointments' | 'history' | 'profile' = 'appointments';
  today: string = new Date().toISOString().split('T')[0];

  // ✅ New variables for follow-up calendar
  selectedDate: string = '';
  showCalendarFor: string | null = null;

  constructor(
    private router: Router,
    private doctorService: DoctorProfileService,
    private statusService: StatusService,
    private doctorAllocationService: DoctorAllocationService,
    private dashboardService: DoctorDashboardService
  ) {}

  ngOnInit(): void {
    const session = localStorage.getItem('userSession');
    if (!session) {
      alert('Session expired. Please login again.');
      this.router.navigate(['/doctor-login']);
      return;
    }

    const user = JSON.parse(session);
    if (user.role !== 'doctor') {
      alert('Unauthorized access.');
      this.router.navigate(['/login']);
      return;
    }

    this.doctorId = user.doctorCode;

    // ✅ Set account active on login
    this.statusService.setAccount(this.doctorId, 'Active').subscribe({
      next: () => console.log('Account status set to Active'),
      error: (err) => console.error('Failed to set account active:', err)
    });

    this.accountStatus = 'Active';
    this.loadDoctorDetails(this.doctorId);
    this.loadAllocations(this.doctorId);
    this.loadAppointments();
  }

  // ✅ Fetch doctor profile
  loadDoctorDetails(doctorCode: string): void {
    this.doctorService.getDoctorByCode(doctorCode).subscribe({
      next: (res: DoctorProfile) => {
        this.doctorName = res.doctorName || 'Doctor';
        this.statusService.getOne(doctorCode).subscribe((ds) => {
          if (ds?.accountStatus === 'Inactive') {
            this.accountStatus = 'Inactive';
            this.availability = '--';
          } else {
            this.accountStatus = 'Active';
            this.availability = ds?.currentStatus || 'Available';
          }
        });
      },
      error: (err) => {
        console.error('Error fetching doctor profile', err);
        this.doctorName = 'Unknown';
      }
    });
  }

  // ✅ Load doctor allocations
  loadAllocations(doctorCode: string): void {
    this.loadingAllocations = true;
    this.doctorAllocationService.getByDoctorCode(doctorCode).subscribe({
      next: (res: Allocation[]) => {
        if (res?.length) {
          res.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          const latest = res[0];
          this.latestShift = latest.shift;
          this.latestRoom = latest.floorRoomNo;
        } else {
          this.latestShift = null;
          this.latestRoom = null;
        }
      },
      error: (err) => console.error('Error fetching allocations', err),
      complete: () => (this.loadingAllocations = false)
    });
  }

  // ✅ Load appointments for doctor
  loadAppointments(): void {
    if (!this.doctorId) return;
    this.loading = true;

    this.dashboardService.getAppointments(this.doctorId).subscribe({
      next: (data: Appointment[]) => {
        this.appointments = data.map(a => ({
          ...a,
          visited: false,
          followupDate: ''
        }));
        this.filteredAppointments = [...this.appointments];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading appointments:', err);
        this.loading = false;
      }
    });
  }

  // ✅ Mark appointment as visited
  markVisited(a: any) {
    if (!a.appointmentId || !a.patientId) {
      alert('Missing appointment or patient ID');
      return;
    }

    this.dashboardService.markVisited(a.appointmentId, a.patientId).subscribe({
      next: () => {
        a.visited = true;
        alert('✅ Visit marked successfully!');
      },
      error: (err) => {
        console.error('❌ Error marking visit:', err);
        alert('Error marking visit.');
      }
    });
  }

  // ✅ Open follow-up calendar
  openCalendar(a: any) {
    this.showCalendarFor = a.appointmentId;
    this.selectedDate = ''; // reset previous date
  }

  // ✅ Schedule follow-up
  scheduleFollowup(a: any) {
    if (!this.selectedDate) {
      alert('Please select a date first!');
      return;
    }

    this.dashboardService.scheduleFollowup(a.appointmentId, a.patientId, this.selectedDate)
      .subscribe({
        next: () => {
          a.followupDate = this.selectedDate;
          this.showCalendarFor = null;
          this.selectedDate = '';
          alert('📅 Follow-up scheduled successfully!');
        },
        error: (err) => {
          console.error('❌ Error scheduling follow-up:', err);
          alert('Error scheduling follow-up.');
        }
      });
  }

  // ✅ Filtering and status logic
  filterAppointments(status: string): void {
    if (status === 'All') this.filteredAppointments = [...this.appointments];
    else if (status === 'Visited') this.filteredAppointments = this.appointments.filter(a => a.visited);
    else if (status === 'Pending') this.filteredAppointments = this.appointments.filter(a => !a.visited);
  }

  updateAvailability(): void {
    if (this.accountStatus !== 'Active') {
      alert('Account is inactive. You cannot change status.');
      return;
    }

    this.statusService.setAvailability(this.doctorId, this.availability).subscribe({
      next: () => alert(`Availability updated to "${this.availability}"`),
      error: () => alert('Failed to update availability')
    });
  }

  formatDate(dt: string): string {
    const d = new Date(dt);
    return d.toLocaleDateString() + ' • ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  toggleSidebar() { this.sidebarOpen = !this.sidebarOpen; }
  viewAppointments() { this.currentView = 'appointments'; this.sidebarOpen = false; }
  viewHistory() { this.currentView = 'history'; this.sidebarOpen = false; }
  viewProfile() { this.currentView = 'profile'; this.sidebarOpen = false; }

  logout(): void {
    this.statusService.setAccount(this.doctorId, 'Inactive').subscribe({
      next: () => console.log('Account set to Inactive on logout'),
      error: (err) => console.error('Failed to set account inactive:', err)
    });

    localStorage.removeItem('userSession');
    localStorage.removeItem('token');
    alert('Logout Successful!');
    this.router.navigate(['/doctor-login']).then(() => window.location.reload());
  }
}
