// src/app/Doctor-Staff_Dashboard/doctor-login/doctor-login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorAuthService, LoginResponse } from 'src/app/service/Doctor Service/doctor-auth-service.service';
import { StaffAuthService } from 'src/app/service/staff-auth-service.service';

@Component({
  selector: 'app-doctor-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent {
  doctorId = ''; // input field used for doctorCode or staffCode
  password = '';
  errorMessage = '';
  loading = false;

  constructor(
    private router: Router,
    private doctorAuth: DoctorAuthService,
    private staffAuth: StaffAuthService
  ) {}

  private handleSuccessForDoctor(res: LoginResponse) {
    this.doctorAuth.setSession({ ...res, role: 'doctor' });
    this.router.navigate(['/doctor-dashboard']);
  }

  private handleSuccessForStaff(res: any) {
    this.doctorAuth.setSession({ ...res, role: 'staff' });
    this.router.navigate(['/staff-dashboard']);
  }

  // doctor-login.component.ts
login() {
  this.errorMessage = '';
  if (!this.doctorId || !this.password) {
    this.errorMessage = 'Please fill in all fields.';
    return;
  }
  this.loading = true;

  this.doctorAuth.login(this.doctorId, this.password).subscribe({
    next: (res) => {
      // In case backend ever returns 200 with allowed=false
      if (res.allowed) {
        this.doctorAuth.setSession({ ...res, role: 'doctor' });
        this.router.navigate(['/doctor-dashboard']);
      } else {
        // Don’t fallback if the server says not activated
        if (res.reason === 'not_activated') {
          this.errorMessage = res.message || 'Access denied: Your account is not activated.';
          this.loading = false;
        } else {
          // Try staff only if effectively “invalid credentials”
          this.tryStaff();
        }
      }
    },
    error: (err) => {
      const reason = err?.error?.reason;
      const message = err?.error?.message;

      // 🚩 Important: show not_activated and STOP
      if (err.status === 403 && reason === 'not_activated') {
        this.errorMessage = message || 'Access denied: Your account is not activated.';
        this.loading = false;
        return;
      }

      // Only fallback to staff for 401 invalid creds
      if (err.status === 401) {
        this.tryStaff();
        return;
      }

      // Other errors
      this.errorMessage = message || 'Something went wrong. Please try again.';
      this.loading = false;
    }
  });
}

private tryStaff() {
  this.staffAuth.login(this.doctorId, this.password).subscribe({
    next: (res) => {
      if (res.allowed) {
        this.doctorAuth.setSession({ ...res, role: 'staff' });
        this.router.navigate(['/staff-dashboard']);
      } else {
        this.errorMessage = res.message || 'Invalid credentials.';
      }
    },
    error: (err) => {
      this.errorMessage = err?.error?.message || 'Invalid credentials.';
    }
  }).add(() => (this.loading = false));
}
}