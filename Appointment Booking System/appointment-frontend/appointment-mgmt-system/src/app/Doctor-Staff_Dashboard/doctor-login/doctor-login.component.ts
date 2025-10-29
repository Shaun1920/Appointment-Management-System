// src/app/Doctor-Staff_Dashboard/doctor-login/doctor-login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// import { DoctorAuthService } from '../../services/doctor-auth.service';
import { DoctorAuthService } from 'src/app/service/doctor-auth-service.service';

@Component({
  selector: 'app-doctor-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent {
  doctorId = ''; // actually doctorCode
  password = '';
  errorMessage = '';
  loading = false;

  constructor(private router: Router, private auth: DoctorAuthService) {}

  login() {
    this.errorMessage = '';
    if (!this.doctorId || !this.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }
    this.loading = true;

    this.auth.login(this.doctorId, this.password).subscribe({
      next: (res) => {
        if (res.allowed) {
          this.auth.setSession(res);
          this.router.navigate(['/doctor-dashboard']);
        } else {
          this.errorMessage = res.message || 'Access denied.';
        }
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Invalid Doctor Code or Password.';
      }
    }).add(() => (this.loading = false));
  }
}