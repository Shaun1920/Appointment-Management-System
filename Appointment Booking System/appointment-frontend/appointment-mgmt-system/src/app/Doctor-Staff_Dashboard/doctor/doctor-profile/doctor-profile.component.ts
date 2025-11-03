import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorProfileService, DoctorProfile } from 'src/app/service/Doctor Service/doctor-profile.service';
import { DoctorAllocationService, Allocation } from 'src/app/service/Doctor Service/doctor-allocation.service';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {
  doctor: DoctorProfile | null = null;
  editingProfile = false;
  editingPassword = false;

  oldPassword = '';
  newPassword = '';
  confirmPassword = '';

  // 🔹 Account & availability section
  accountStatus: 'Active' | 'Inactive' = 'Inactive';
  availabilityOptions = ['Available', 'Busy', 'On Leave'];
  availability = 'Available';
  allocations: Allocation[] = [];
  latestShift: string | null = null;
  latestRoom: string | null = null;
  loadingAllocations = false;

  constructor(
    private doctorService: DoctorProfileService,
    private doctorAllocationService: DoctorAllocationService
  ) {}

  ngOnInit() {
    // ✅ Use the correct key now
    const session = localStorage.getItem('userSession');

    if (session) {
      const parsedSession = JSON.parse(session);
      this.accountStatus = parsedSession.allowed ? 'Active' : 'Inactive';

      // ✅ Check if it's a doctor or staff
      if (parsedSession.role === 'doctor') {
        const doctorCode = parsedSession.doctorCode;

        if (doctorCode) {
          this.doctorService.getDoctorByCode(doctorCode).subscribe({
            next: (res) => {
              this.doctor = res;
              const saved = localStorage.getItem(`doctorAvailability_${res.doctorCode}`);
              this.availability = saved || 'Available';
              this.loadAllocations(res.doctorCode);
            },
            error: (err) => console.error('Failed to load doctor', err)
          });
        }
      } else {
        console.warn('⚠️ Logged in user is not a doctor. Profile view may differ.');
      }

    } else {
      this.accountStatus = 'Inactive';
    }
  }

  loadAllocations(doctorCode: string) {
    this.loadingAllocations = true;
    this.doctorAllocationService.getByDoctorCode(doctorCode).subscribe({
      next: (res) => {
        this.allocations = res || [];
        if (this.allocations.length > 0) {
          const a = this.allocations[0];
          this.latestShift = a.shift || null;
          this.latestRoom = a.floorRoomNo || null;
        }
      },
      error: (err) => console.error('Error fetching allocations', err),
      complete: () => (this.loadingAllocations = false)
    });
  }

  updateAvailability() {
    if (!this.doctor) return;
    localStorage.setItem(`doctorAvailability_${this.doctor.doctorCode}`, this.availability);
    alert(`Status updated to "${this.availability}"`);
  }

  toggleEdit() {
    this.editingProfile = !this.editingProfile;
  }

  updateProfile() {
    if (this.doctor) {
      this.doctorService.updateDoctorProfile(this.doctor).subscribe({
        next: (res) => {
          this.doctor = res;
          this.editingProfile = false;
          alert('Profile updated successfully!');
        },
        error: () => alert('Error updating profile')
      });
    }
  }

  togglePasswordChange() {
    this.editingPassword = !this.editingPassword;
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  // updatePassword() {
  //   if (!this.doctor) return;
  //   if (this.oldPassword !== this.doctor.password) {
  //     alert('Old password is incorrect.');
  //     return;
  //   }
  //   if (this.newPassword !== this.confirmPassword) {
  //     alert('New password and confirm password do not match.');
  //     return;
  //   }

  //   this.doctor.password = this.newPassword;
  //   this.updateProfile();
  //   alert('Password changed successfully! Please re-login.');
  //   localStorage.removeItem('userSession');
  //   window.location.href = '/doctor-login';
  // }

  updatePassword() {
  if (!this.doctor) return;

  // 1️⃣ Old password check
  if (this.oldPassword !== this.doctor.password) {
    alert('Old password is incorrect.');
    return;
  }

   // 2️⃣ New password must not be same as old password
  if (this.oldPassword === this.newPassword) {
    alert('New password cannot be the same as the old password.');
    return;
  }

  // 2️⃣ Confirm password check
  if (this.newPassword !== this.confirmPassword) {
    alert('New password and confirm password do not match.');
    return;
  }

  // 3️⃣ Password strength validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordRegex.test(this.newPassword)) {
    alert(
      'Password must be at least 8 characters long and contain:\n' +
      '• one uppercase letter\n' +
      '• one lowercase letter\n' +
      '• one number\n' +
      '• one special character'
    );
    return;
  }

  // 4️⃣ Save password
  this.doctor.password = this.newPassword;
  this.updateProfile();

  alert('Password changed successfully! Please re-login.');
  localStorage.removeItem('userSession');
  window.location.href = '/doctor-login';
}
}
