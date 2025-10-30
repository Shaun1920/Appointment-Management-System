import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StaffProfileService, StaffProfile } from 'src/app/service/Staff Service/staff-profile.service';

@Component({
  selector: 'app-staff-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.css']
})
export class StaffProfileComponent implements OnInit {
  staff: StaffProfile | null = null;
  editingProfile = false;
  editingPassword = false;

  oldPassword = '';
  newPassword = '';
  confirmPassword = '';

  constructor(private staffService: StaffProfileService) {}

  ngOnInit() {
    const session = localStorage.getItem('userSession');

    if (session) {
      const parsedSession = JSON.parse(session);
      if (parsedSession.role === 'staff') {
        const staffCode = parsedSession.staffCode;

        if (staffCode) {
          this.staffService.getStaffByCode(staffCode).subscribe({
            next: (res) => (this.staff = res),
            error: (err) => console.error('Failed to load staff', err)
          });
        }
      }
    }
  }

  toggleEdit() {
    this.editingProfile = !this.editingProfile;
  }

  updateProfile() {
    if (this.staff) {
      this.staffService.updateStaffProfile(this.staff).subscribe({
        next: (res) => {
          this.staff = res;
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

  updatePassword() {
    if (!this.staff) return;
    if (this.oldPassword !== this.staff.password) {
      alert('Old password is incorrect.');
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    this.staff.password = this.newPassword;
    this.updateProfile();
    alert('Password updated successfully! Please re-login.');
    localStorage.removeItem('userSession');
    window.location.href = '/staff-login';
  }
}
