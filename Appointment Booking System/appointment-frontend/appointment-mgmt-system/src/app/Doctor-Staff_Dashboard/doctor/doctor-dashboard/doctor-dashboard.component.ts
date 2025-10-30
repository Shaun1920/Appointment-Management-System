// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Appointment } from 'src/app/model/Appointment.model';
// import { Router } from '@angular/router';
// import { DoctorProfileService, DoctorProfile } from 'src/app/service/doctor-profile.service';
// import { DoctorProfileComponent } from '../../doctor-profile/doctor-profile.component';
// import { AllocationService } from 'src/app/service/allocation.service';
// import { StatusService } from 'src/app/service/status.service';

// @Component({
//   selector: 'app-doctor-dashboard',
//   standalone: true,
//   imports: [CommonModule, FormsModule, DoctorProfileComponent],
//   templateUrl: './doctor-dashboard.component.html',
//   styleUrls: ['./doctor-dashboard.component.css']
// })
// export class DoctorDashboardComponent implements OnInit {
//   sidebarOpen = false;
//   appointments: Appointment[] = [];
//   showFollowUpFormFor: number | null = null;
//   newFollowUpDate = '';

//   doctorName = 'Loading…';
//   accountStatus: 'Active' | 'Inactive' = 'Inactive';
//   availabilityOptions = ['Available', 'Busy', 'On Leave'];
//   availability: string = '--';

//   latestShift: string | null = null;
//   latestRoom: string | null = null;
//   loadingAllocations = false;

//   constructor(
//     private router: Router,
//     private doctorService: DoctorProfileService,
//     private allocationService: AllocationService,
//     private statusService: StatusService
//   ) {}

//   ngOnInit(): void {
//     // Mock data
//     this.appointments = [
//       {
//         id: 1,
//         patientName: 'Rahul Sharma',
//         dateTime: new Date(Date.now() + 30 * 60000).toISOString(),
//         patientId: 'P1001',
//         description: 'Follow-up',
//         consulted: false,
//         doctorId: 'doc101',
//         consultingFees: 0,
//         specialization: 'Cardiologist',
//         slot: ''
//       },
//       {
//         id: 2,
//         patientName: 'Anita Patel',
//         dateTime: new Date(Date.now() + 90 * 60000).toISOString(),
//         patientId: 'P1002',
//         description: 'New consult',
//         consulted: false,
//         doctorId: 'doc101',
//         consultingFees: 0,
//         specialization: 'Cardiologist',
//         slot: ''
//       }
//     ];
//     this.sortAppointments();

//     const stored = localStorage.getItem('doctorSession');
//     if (stored) {
//       const { doctorCode } = JSON.parse(stored);
//       if (doctorCode) {
//         this.accountStatus = 'Active';
//         this.statusService.setAccount(doctorCode, 'Active').subscribe();

//         this.doctorService.getDoctorByCode(doctorCode).subscribe({
//           next: (res: DoctorProfile) => {
//             this.doctorName = res.doctorName;

//             // fetch backend status
//             this.statusService.getOne(doctorCode).subscribe((ds) => {
//               if (ds?.accountStatus === 'Inactive') {
//                 this.accountStatus = 'Inactive';
//                 this.availability = '--';
//               } else {
//                 this.accountStatus = 'Active';
//                 this.availability = ds?.currentStatus || 'Available';
//               }
//             });

//             this.loadAllocations(doctorCode);
//           },
//           error: () => (this.doctorName = 'Unknown')
//         });
//       } else {
//         this.accountStatus = 'Inactive';
//         this.availability = '--';
//       }
//     } else {
//       this.accountStatus = 'Inactive';
//       this.availability = '--';
//     }
//   }

//   loadAllocations(doctorCode: string) {
//     this.loadingAllocations = true;
//     this.allocationService.getByDoctorCode(doctorCode).subscribe({
//       next: (res) => {
//         if (res && res.length > 0) {
//           const a = res[0];
//           this.latestShift = a.shift || null;
//           this.latestRoom = a.floorRoomNo || null;
//         } else {
//           this.latestShift = null;
//           this.latestRoom = null;
//         }
//       },
//       error: (err) => console.error('Error fetching allocations', err),
//       complete: () => (this.loadingAllocations = false)
//     });
//   }

//   updateAvailability() {
//     if (this.accountStatus !== 'Active') {
//       alert('Account is inactive. You cannot change status.');
//       return;
//     }

//     const stored = localStorage.getItem('doctorSession');
//     const code = stored ? JSON.parse(stored).doctorCode : null;
//     if (!code) return;

//     this.statusService.setAvailability(code, this.availability).subscribe({
//       next: () => alert(`Availability updated to "${this.availability}"`),
//       error: () => alert('Failed to update availability')
//     });
//   }

//   // other unchanged logic below

//   formatDate(dt: string) {
//     const d = new Date(dt);
//     return d.toLocaleDateString() + ' • ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   }

//   sortAppointments() {
//     this.appointments.sort(
//       (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
//     );
//   }

//   toggleSidebar() { this.sidebarOpen = !this.sidebarOpen; }
//   isPast(dateTime: string) { return new Date(dateTime).getTime() < Date.now(); }

//   openFollowUpForm(id: number) { this.showFollowUpFormFor = id; this.newFollowUpDate = ''; }
//   cancelFollowUp() { this.showFollowUpFormFor = null; this.newFollowUpDate = ''; }

//   addFollowUp(base: Appointment) {
//     if (!this.newFollowUpDate) { alert('Please select a follow-up date and time'); return; }
//     const newFollowUp: Appointment = {
//       id: this.appointments.length + 1,
//       patientName: base.patientName,
//       patientId: base.patientId,
//       dateTime: this.newFollowUpDate,
//       description: 'Follow-up appointment',
//       consulted: false,
//       doctorId: '',
//       consultingFees: 0,
//       specialization: '',
//       slot: ''
//     };
//     this.appointments.push(newFollowUp);
//     this.sortAppointments();
//     this.cancelFollowUp();
//     alert('Follow-up added successfully!');
//   }

//   currentView: 'appointments' | 'history' | 'profile' = 'appointments';
//   viewAppointments() { this.currentView = 'appointments'; this.sidebarOpen = false; }
//   viewHistory() { this.currentView = 'history'; this.sidebarOpen = false; }

//   historyAppointments: Appointment[] = [];
//   markConsulted(a: Appointment) {
//     a.consulted = true;
//     this.historyAppointments.push(a);
//     this.appointments = this.appointments.filter(x => x.id !== a.id);
//     this.sortAppointments();
//   }

//   viewProfile() { this.currentView = 'profile'; this.sidebarOpen = false; }

//   logout() {
//     const stored = localStorage.getItem('doctorSession');
//     const code = stored ? JSON.parse(stored).doctorCode : null;
//     if (code) this.statusService.setAccount(code, 'Inactive').subscribe();

//     localStorage.removeItem('doctorSession');
//     this.accountStatus = 'Inactive';
//     this.availability = '--';
//     alert('Logout Successful!');
//     this.router.navigate(['/doctor-login']).then(() => window.location.reload());
//   }

//   activePage = 'appointments';
//   setActive(p: string) { this.activePage = p; }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Appointment } from 'src/app/model/Appointment.model';
import { Router } from '@angular/router';
import { DoctorProfileService, DoctorProfile } from 'src/app/service/Doctor Service/doctor-profile.service';
import { DoctorProfileComponent } from '../doctor-profile/doctor-profile.component';
import { StatusService } from 'src/app/service/Doctor Service/status.service';
import { DoctorAllocationService, Allocation } from 'src/app/service/Doctor Service/doctor-allocation.service';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, DoctorProfileComponent],
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  sidebarOpen = false;
  appointments: Appointment[] = [];
  showFollowUpFormFor: number | null = null;
  newFollowUpDate = '';

  doctorName = 'Loading…';
  accountStatus: 'Active' | 'Inactive' = 'Inactive';
  availabilityOptions = ['Available', 'Busy', 'On Leave'];
  availability: string = '--';

  // ✅ Allocation fields
  latestShift: string | null = null;
  latestRoom: string | null = null;
  latestTime: string | null = null;
  loadingAllocations = false;

  currentView: 'appointments' | 'history' | 'profile' = 'appointments';
  historyAppointments: Appointment[] = [];

  constructor(
    private router: Router,
    private doctorService: DoctorProfileService,
    private doctorAllocationService: DoctorAllocationService,
    private statusService: StatusService
  ) {}

  ngOnInit(): void {
    // ✅ Get session directly from localStorage
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

    const doctorCode = user.doctorCode;
    this.accountStatus = 'Active';

    // ✅ Load doctor details
    this.loadDoctorDetails(doctorCode);

    // ✅ Load doctor allocations
    this.loadAllocations(doctorCode);

    // ✅ Load appointments (mock/demo)
    this.loadMockAppointments();
  }

  loadDoctorDetails(doctorCode: string): void {
    this.doctorService.getDoctorByCode(doctorCode).subscribe({
      next: (res: DoctorProfile) => {
        this.doctorName = res.doctorName || 'Doctor';

        // Fetch backend status (availability/account)
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

  loadAllocations(doctorCode: string): void {
    this.loadingAllocations = true;
    this.doctorAllocationService.getByDoctorCode(doctorCode).subscribe({
      next: (res: Allocation[]) => {
        if (res && res.length > 0) {
          res.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          const latest = res[0];
          this.latestShift = latest.shift;
          this.latestRoom = latest.floorRoomNo;
          this.latestTime = latest.time;
        } else {
          this.latestShift = null;
          this.latestRoom = null;
          this.latestTime = null;
        }
      },
      error: (err) => console.error('Error fetching allocations', err),
      complete: () => (this.loadingAllocations = false)
    });
  }

  loadMockAppointments(): void {
    this.appointments = [
      {
        id: 1,
        patientName: 'Rahul Sharma',
        dateTime: new Date(Date.now() + 30 * 60000).toISOString(),
        patientId: 'P1001',
        description: 'Follow-up',
        consulted: false,
        doctorId: 'doc101',
        consultingFees: 0,
        specialization: 'Cardiologist',
        slot: ''
      },
      {
        id: 2,
        patientName: 'Anita Patel',
        dateTime: new Date(Date.now() + 90 * 60000).toISOString(),
        patientId: 'P1002',
        description: 'New consult',
        consulted: false,
        doctorId: 'doc101',
        consultingFees: 0,
        specialization: 'Cardiologist',
        slot: ''
      }
    ];
    this.sortAppointments();
  }

  updateAvailability(): void {
    if (this.accountStatus !== 'Active') {
      alert('Account is inactive. You cannot change status.');
      return;
    }

    const session = JSON.parse(localStorage.getItem('userSession') || '{}');
    const code = session?.doctorCode;
    if (!code) return;

    this.statusService.setAvailability(code, this.availability).subscribe({
      next: () => alert(`Availability updated to "${this.availability}"`),
      error: () => alert('Failed to update availability')
    });
  }

  formatDate(dt: string) {
    const d = new Date(dt);
    return d.toLocaleDateString() + ' • ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  sortAppointments() {
    this.appointments.sort(
      (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
    );
  }

  toggleSidebar() { this.sidebarOpen = !this.sidebarOpen; }
  isPast(dateTime: string) { return new Date(dateTime).getTime() < Date.now(); }

  openFollowUpForm(id: number) { this.showFollowUpFormFor = id; this.newFollowUpDate = ''; }
  cancelFollowUp() { this.showFollowUpFormFor = null; this.newFollowUpDate = ''; }

  addFollowUp(base: Appointment) {
    if (!this.newFollowUpDate) { alert('Please select a follow-up date and time'); return; }
    const newFollowUp: Appointment = {
      id: this.appointments.length + 1,
      patientName: base.patientName,
      patientId: base.patientId,
      dateTime: this.newFollowUpDate,
      description: 'Follow-up appointment',
      consulted: false,
      doctorId: '',
      consultingFees: 0,
      specialization: '',
      slot: ''
    };
    this.appointments.push(newFollowUp);
    this.sortAppointments();
    this.cancelFollowUp();
    alert('Follow-up added successfully!');
  }

  markConsulted(a: Appointment) {
    a.consulted = true;
    this.historyAppointments.push(a);
    this.appointments = this.appointments.filter(x => x.id !== a.id);
    this.sortAppointments();
  }

  viewAppointments() { this.currentView = 'appointments'; this.sidebarOpen = false; }
  viewHistory() { this.currentView = 'history'; this.sidebarOpen = false; }
  viewProfile() { this.currentView = 'profile'; this.sidebarOpen = false; }

  logout() {
    const session = JSON.parse(localStorage.getItem('userSession') || '{}');
    const code = session?.doctorCode;
    if (code) this.statusService.setAccount(code, 'Inactive').subscribe();

    localStorage.removeItem('userSession');
    localStorage.removeItem('token');
    this.accountStatus = 'Inactive';
    this.availability = '--';
    alert('Logout Successful!');
    this.router.navigate(['/doctor-login']).then(() => window.location.reload());
  }
}
