import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileadminService } from '../../../service/Admin Service/Admin-Profile Service/profileadmin.service';
import { Profileadmin } from '../../../model/Admin Model/Admin-Profile Model/profileadmin.model';

@Component({
  selector: 'app-profileadmin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profileadmin.component.html',
  styleUrls: ['./profileadmin.component.css']
})
export class ProfileadminComponent implements OnInit {
  adminId: string = '';
  password: string = '';
  confirmPassword: string = '';
  oldPassword: string = '';
  originalAdminId: string = '';

  constructor(private profileService: ProfileadminService) {}

  ngOnInit(): void {
    const storedId = sessionStorage.getItem('adminId');
    if (storedId) {
      this.originalAdminId = storedId;
      this.fetchProfile(storedId);
    }
  }

  fetchProfile(adminId: string) {
    this.profileService.getProfile(adminId).subscribe({
      next: (data: Profileadmin) => {
        this.adminId = data.adminId;
        this.oldPassword = data.password; // store original password for comparison
      },
      error: () => alert('⚠️ Failed to fetch profile. Please try again later.')
    });
  }

  updateProfile() {
    // 🧠 Validation for empty fields
    if (!this.password || !this.confirmPassword) {
      alert('⚠️ Please enter and confirm your new password.');
      return;
    }

    // 🧠 Prevent reusing old password
    if (this.password === this.oldPassword) {
      alert('⚠️ New password must not be the same as your old password.');
      return;
    }

    // 🧠 Password strength check
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(this.password)) {
      alert(
        '⚠️ Password must be at least 8 characters long and include:\n' +
        '• One uppercase letter\n' +
        '• One lowercase letter\n' +
        '• One number\n' +
        '• One special character'
      );
      return;
    }

    // 🧠 Confirm password match
    if (this.password !== this.confirmPassword) {
      alert('⚠️ Passwords do not match.');
      return;
    }

    // ✅ Prepare updated object
    const updatedProfile: Profileadmin = {
      adminId: this.adminId,
      password: this.password
    };

    // ✅ Send update request
    this.profileService.updateProfile(this.originalAdminId, updatedProfile).subscribe({
      next: () => {
        alert('✅ Profile updated successfully!');
        sessionStorage.setItem('adminId', this.adminId);
        this.originalAdminId = this.adminId;
        this.oldPassword = this.password;
        this.confirmPassword = '';
      },
      error: () => alert('❌ Failed to update profile. Please try again.')
    });
  }
}